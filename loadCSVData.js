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
    fs.createReadStream('/Users/tedaringo/Downloads/rental-details.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        // Process the data and insert into the database
        for (const row of results) {
          // Insert house data into the database
          const houseData = {
            house_name: row['Hse No'],
            number_of_rooms: 1,  //
            rent_amount: parseInt(row['RENT PAYABLE'].replace(/,/g, '')),
            house_status: 'Vacant', 
            apartmentID: 1 
          };

          const [houseResult] = await connection.query('INSERT INTO houses SET ?', houseData);
          const houseID = houseResult.insertId;

          // Insert tenant data into the database
          // const tenantData = {
          //   tenant_name: row['TENANT NAMES'],
          //   email: '',  // No email provided in the CSV, leave blank or set default value
          //   ID_number: '',  // No ID provided in the CSV, leave blank or set default value
          //   profession: '',  // No profession provided in the CSV, leave blank or set default value
          //   phone_number: row['TELEPHONE NUMBER'],
          //   houseNumber: houseID,
          //   dateAdmitted: null,  // No admission date provided in the CSV, leave blank or set default value
          //   negotiatedRent: parseInt(row['RENT PAYABLE'].replace(/,/g, ''))
          // };

          // await connection.query('INSERT INTO tenants SET ?', tenantData);
        }
        console.log('Data loaded successfully');
        await connection.end();
      });
  } catch (error) {
    console.error('Error loading data:', error);
    await connection.end();
  }
};

// Call the function
loadCSVData();
