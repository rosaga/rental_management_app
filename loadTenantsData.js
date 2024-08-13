const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql2/promise');

const loadCSVData = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tedaringo',
    database: 'Rental'
  });

  try {
    const results = [];
    const housesInDB = await getAllHouses(connection);

    fs.createReadStream('/Users/tedaringo/Downloads/new-rental.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        for (const row of results) {
          const tenantName = row['TENANT  NAMES'] && row['TENANT  NAMES'].trim().toLowerCase() !== 'vacant' ? row['TENANT  NAMES'] : null;
          const houseName = row['Hse No'];

          // Check if the house exists in the database
          if (tenantName && housesInDB.includes(houseName)) {
            const houseID = await getHouseID(connection, houseName);
            if (houseID) {
              const tenantSQL = `
                INSERT INTO tenants (tenant_name, email, ID_number, profession, phone_number, houseNumber, dateAdmitted, negotiatedRent, status)
                VALUES (?, '', ?, '', ?, ?, NULL, ?, 1)
                ON DUPLICATE KEY UPDATE houseNumber = VALUES(houseNumber), negotiatedRent = VALUES(negotiatedRent), status = 1;
              `;

              const rentAmount = parseInt(row['RENT PAYABLE'].replace(/,/g, ''));
              const phoneNumber = row['TELEPHONE NUMBER'];
              const IDNumber = 0; 

              await connection.query(tenantSQL, [tenantName, IDNumber, phoneNumber, houseID, rentAmount]);

              // Update the house status to 'Occupied'
              await updateHouseStatus(connection, houseID, 'Occupied');
            }
          } else if (!tenantName) {
            console.log(`Skipping vacant house: ${houseName}`);
          } else {
            console.log(`Skipping house not found in DB: ${houseName}`);
          }
        }
        console.log('Tenant data loaded successfully');
        await connection.end();
      });
  } catch (error) {
    console.error('Error loading tenant data:', error);
    await connection.end();
  }
};

const getHouseID = async (connection, houseName) => {
  const [rows] = await connection.query('SELECT houseID FROM houses WHERE house_name = ?', [houseName]);
  return rows.length > 0 ? rows[0].houseID : null;
};

const getAllHouses = async (connection) => {
  const [rows] = await connection.query('SELECT house_name FROM houses');
  return rows.map(row => row.house_name);
};

const updateHouseStatus = async (connection, houseID, status) => {
  await connection.query('UPDATE houses SET house_status = ? WHERE houseID = ?', [status, houseID]);
};


loadCSVData();
