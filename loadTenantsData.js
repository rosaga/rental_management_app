const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql2/promise');

const loadTenantsData = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tedaringo',
    database: 'Rental'
  });

  try {
    const results = [];
    fs.createReadStream('/Users/tedaringo/Downloads/rental-details.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        for (const row of results) {
          const houseName = row['Hse No'];
          const tenantName = row['TENANT NAMES'];
          const phoneNumber = row['TELEPHONE NUMBER'];
          const rentAmount = parseInt(row['RENT PAYABLE'].replace(/,/g, ''));

          if (tenantName !== 'vacant') {
            // Get the houseID for the corresponding house name
            const [house] = await connection.query('SELECT houseID FROM houses WHERE house_name = ?', [houseName]);
            const houseID = house.length > 0 ? house[0].houseID : null;

            if (houseID) {
              // Insert tenant data into the tenants table
              const tenantSQL = `
                INSERT INTO tenants (tenant_name, email, ID_number, profession, phone_number, houseNumber, dateAdmitted, negotiatedRent, status)
                VALUES (?, '', '', '', ?, ?, NULL, ?, 1)
                ON DUPLICATE KEY UPDATE houseNumber = VALUES(houseNumber), negotiatedRent = VALUES(negotiatedRent), status = 1;
              `;
              await connection.query(tenantSQL, [tenantName, phoneNumber, houseID, rentAmount]);

              // Update the house status to 'Occupied'
              const updateHouseStatusSQL = `
                UPDATE houses SET house_status = 'Occupied' WHERE houseID = ?;
              `;
              await connection.query(updateHouseStatusSQL, [houseID]);
            }
          }
        }
        console.log('Tenants loaded successfully');
        await connection.end();
      });
  } catch (error) {
    console.error('Error loading tenants:', error);
    await connection.end();
  }
};

// Call the function
loadTenantsData();
