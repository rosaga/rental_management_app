const mysql = require('mysql2/promise');

const loadingData = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tedaringo628!', 
    database: 'rental' 
  });

  try {
    // Insert Apartments
    const apartments = [
      { name: 'A', location: 'Location A', num_houses: 9 },
      { name: 'B', location: 'Location B', num_houses: 6 },
      { name: 'C', location: 'Location C', num_houses: 8 },
      { name: 'D', location: 'Location D', num_houses: 6 },
      { name: 'E', location: 'Location E', num_houses: 12 },
      { name: 'Hotel', location: 'Location Hotel', num_houses: 1 }
    ];

    const apartmentIDs = {};

    for (const apartment of apartments) {
      const [result] = await connection.query('INSERT INTO apartments (name, location, num_houses) VALUES (?, ?, ?)', [apartment.name, apartment.location, apartment.num_houses]);
      apartmentIDs[apartment.name] = result.insertId;
    }

    // Insert Houses
    const houses = [
      { house_name: 'A1', rent_amount: 6500, apartmentID: apartmentIDs['A'] },
      { house_name: 'A2', rent_amount: 8000, apartmentID: apartmentIDs['A'] },
      { house_name: 'A3', rent_amount: 8000, apartmentID: apartmentIDs['A'] },
      { house_name: 'A4', rent_amount: 8000, apartmentID: apartmentIDs['A'] },
      { house_name: 'A5', rent_amount: 8000, apartmentID: apartmentIDs['A'] },
      { house_name: 'A6', rent_amount: 6500, apartmentID: apartmentIDs['A'] },
      { house_name: 'A7', rent_amount: 7500, apartmentID: apartmentIDs['A'] },
      { house_name: 'A8', rent_amount: 7500, apartmentID: apartmentIDs['A'] },
      { house_name: 'A9', rent_amount: 18000, apartmentID: apartmentIDs['A'] },
      { house_name: 'B1', rent_amount: 11500, apartmentID: apartmentIDs['B'] },
      { house_name: 'B2', rent_amount: 12000, apartmentID: apartmentIDs['B'] },
      { house_name: 'B3', rent_amount: 0, apartmentID: apartmentIDs['B'] }, // vacant
      { house_name: 'B4', rent_amount: 0, apartmentID: apartmentIDs['B'] }, // vacant
      { house_name: 'B5', rent_amount: 0, apartmentID: apartmentIDs['B'] }, // vacant
      { house_name: 'B6', rent_amount: 36000, apartmentID: apartmentIDs['B'] },
      { house_name: 'C1', rent_amount: 15000, apartmentID: apartmentIDs['C'] },
      { house_name: 'C2', rent_amount: 32500, apartmentID: apartmentIDs['C'] },
      { house_name: 'C4', rent_amount: 22000, apartmentID: apartmentIDs['C'] },
      { house_name: 'C5', rent_amount: 13000, apartmentID: apartmentIDs['C'] },
      { house_name: 'C6', rent_amount: 15000, apartmentID: apartmentIDs['C'] },
      { house_name: 'C7', rent_amount: 15000, apartmentID: apartmentIDs['C'] },
      { house_name: 'C8', rent_amount: 15000, apartmentID: apartmentIDs['C'] },
      { house_name: 'C9', rent_amount: 16000, apartmentID: apartmentIDs['C'] },
      { house_name: 'D1', rent_amount: 16000, apartmentID: apartmentIDs['D'] },
      { house_name: 'D2', rent_amount: 16000, apartmentID: apartmentIDs['D'] },
      { house_name: 'D3', rent_amount: 7500, apartmentID: apartmentIDs['D'] },
      { house_name: 'D4', rent_amount: 7500, apartmentID: apartmentIDs['D'] },
      { house_name: 'D5', rent_amount: 0, apartmentID: apartmentIDs['D'] },
      { house_name: 'D10', rent_amount: 0, apartmentID: apartmentIDs['D'] },
      { house_name: 'HOTEL', rent_amount: 40000, apartmentID: apartmentIDs['Hotel'] },
      { house_name: 'E1', rent_amount: 15000, apartmentID: apartmentIDs['E'] },
      { house_name: 'E2', rent_amount: 0, apartmentID: apartmentIDs['E'] }, // vacant
      { house_name: 'E3', rent_amount: 0, apartmentID: apartmentIDs['E'] }, // vacant
      { house_name: 'E4', rent_amount: 15000, apartmentID: apartmentIDs['E'] }, // vacant
      { house_name: 'E5', rent_amount: 15000, apartmentID: apartmentIDs['E'] },
      { house_name: 'E6', rent_amount: 32500, apartmentID: apartmentIDs['E'] }, // vacant
      { house_name: 'E7', rent_amount: 15000, apartmentID: apartmentIDs['E'] },
      { house_name: 'E8', rent_amount: 15000, apartmentID: apartmentIDs['E'] },
      { house_name: 'E9', rent_amount: 0, apartmentID: apartmentIDs['E'] }, // vacant
      { house_name: 'E10', rent_amount: 0, apartmentID: apartmentIDs['E'] }, // vacant
      { house_name: 'E11', rent_amount: 0, apartmentID: apartmentIDs['E'] }, // vacant
      { house_name: 'E12', rent_amount: 15000, apartmentID: apartmentIDs['E'] }
    ];

    const houseIDs = {};

    for (const house of houses) {
      const [result] = await connection.query('INSERT INTO houses (house_name, number_of_rooms, rent_amount, house_status, apartmentID) VALUES (?, ?, ?, ?, ?)', [house.house_name, 1, house.rent_amount, house.rent_amount > 0 ? 'Occupied' : 'Vacant', house.apartmentID]);
      houseIDs[house.house_name] = result.insertId;
    }

    // Insert Tenants
    const tenants = [
      { tenant_name: 'RESI KASAI', phone_number: '713889094', rent: 6500, houseName: 'A1' },
      { tenant_name: 'PETER SIMIYU SANGURA', phone_number: '707187037', rent: 8000, houseName: 'A2' },
      { tenant_name: 'FARAJI ZCHARIA', phone_number: '714761958', rent: 8000, houseName: 'A3' },
      { tenant_name: 'EVANS MULONGO KHISA', phone_number: '726549521', rent: 8000, houseName: 'A4' },
      { tenant_name: 'HASANS YUSUF', phone_number: '0II2546525', rent: 8000, houseName: 'A5' },
      { tenant_name: 'ALPHOSE TOLE', phone_number: '724781084', rent: 6500, houseName: 'A6' },
      { tenant_name: 'STEPHEN MBAYI OMONDI', phone_number: '702113500', rent: 7500, houseName: 'A7' },
      { tenant_name: 'PHOBE MAKANGA', phone_number: '725449434', rent: 7500, houseName: 'A8' },
      { tenant_name: 'ISMAEL JUMA', phone_number: '722533149', rent: 18000, houseName: 'A9' },
      { tenant_name: 'ENG KALOMBA CHARLES', phone_number: '721769030', rent: 11500, houseName: 'B1' },
      { tenant_name: 'ERIKO NYAJA', phone_number: '712674236', rent: 12000, houseName: 'B2' },
      { tenant_name: 'OMONDI EDWIN ODERO', phone_number: '721166735', rent: 36000, houseName: 'B6' },
      { tenant_name: 'ISACK MAINA', phone_number: '724226382', rent: 15000, houseName: 'C1' },
      { tenant_name: 'SHARIFA OLIMA', phone_number: '720696069', rent: 32500, houseName: 'C2' },
      { tenant_name: 'EVASON KAIRU NGANGA', phone_number: '725433022', rent: 22000, houseName: 'C4' },
      { tenant_name: 'MARCY KIPCHUTO', phone_number: '702691260', rent: 13000, houseName: 'C5' },
      { tenant_name: 'STEPHEN ODUOR OCHIENG', phone_number: '721967947/0700374627', rent: 15000, houseName: 'C6' },
      { tenant_name: 'BRIAN MACHOTE KHABATIKHE', phone_number: '701378992', rent: 15000, houseName: 'C7' },
      { tenant_name: 'DAISY LAGAT RUTO', phone_number: '707946284', rent: 15000, houseName: 'C8' },
      { tenant_name: 'LINET KARIUKI', phone_number: '723822222', rent: 16000, houseName: 'C9' },
      { tenant_name: 'MONICAH GUMBA', phone_number: '708416563', rent: 16000, houseName: 'D1' },
      { tenant_name: 'KEPHER OMBURU/PHINA AKOTH', phone_number: '724925502/0795624102', rent: 16000, houseName: 'D2' },
      { tenant_name: 'EVANCE OCHIENG', phone_number: '728570059', rent: 7500, houseName: 'D3' },
      { tenant_name: 'GEORGE KWEMBA / ODHIAMBO EVANE OTIENO', phone_number: '748115771', rent: 7500, houseName: 'D4' },
      { tenant_name: 'KANYAMEDHA MAIN HOUSE', phone_number: '722601575', rent: 0, houseName: 'D5' },
      { tenant_name: 'FREDRICK ADIEL FAMILY', phone_number: '722601575', rent: 0, houseName: 'D10' },
      { tenant_name: 'Agree Owino Otieno', phone_number: '723689738', rent: 40000, houseName: 'HOTEL' },
      { tenant_name: 'TEVIN ONDIASO AYUGI', phone_number: '717420763', rent: 15000, houseName: 'E1' },
      { tenant_name: 'WILSON OTIENO OYWER', phone_number: '723981211', rent: 15000, houseName: 'E5' },
      { tenant_name: 'REHEMA RASHID', phone_number: '703906024', rent: 15000, houseName: 'E7' },
      { tenant_name: 'YVONE NYABUTO', phone_number: '114831657', rent: 15000, houseName: 'E8' },
      { tenant_name: 'BEATRICE KOCHIA', phone_number: '778130690', rent: 0, houseName: 'E11' },
      { tenant_name: 'JUDITH MTENGA', phone_number: '721499876', rent: 15000, houseName: 'E12' }
    ];

    for (const tenant of tenants) {
      if (houseIDs[tenant.houseName]) {
        await connection.query(
          `INSERT INTO tenants (tenant_name, email, ID_number, profession, phone_number, houseNumber, dateAdmitted, negotiatedRent, status)
           VALUES (?, '', 0, '', ?, ?, NULL, ?, 1)
           ON DUPLICATE KEY UPDATE houseNumber = VALUES(houseNumber), negotiatedRent = VALUES(negotiatedRent), status = 1`,
          [tenant.tenant_name, tenant.phone_number, houseIDs[tenant.houseName], tenant.rent]
        );

        // houses are changed to occupied after a tenant is admitted
        await connection.query('UPDATE houses SET house_status = "Occupied" WHERE houseID = ?', [houseIDs[tenant.houseName]]);
      }
    }

    console.log('Apartments, houses, and tenants have been inserted successfully.');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    await connection.end();
  }
};

loadingData();
