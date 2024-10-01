const db = require('./server/db');

const populatePeriods = async () => {
  const periods = [];
  const startYear = 2020;
  const endYear = 2050;

  for (let year = startYear; year <= endYear; year++) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    for (const month of months) {
      periods.push({ month, year });
    }
  }

  try {
    await db('periods').insert(periods);
    console.log('Periods populated successfully.');
  } catch (error) {
    console.error('Error populating periods:', error);
  }
};

populatePeriods();
