const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  const hashedPassword1 = await bcrypt.hash('password123', 10);
  const hashedPassword2 = await bcrypt.hash('password456', 10);
  const hashedPassword3 = await bcrypt.hash('password789', 10);

  await knex('users').del(); // Deletes all existing entries

  await knex('users').insert([
    { username: 'admin', password: hashedPassword1, role: 'admin' },
    { username: 'user1', password: hashedPassword2, role: 'user' },
    { username: 'user2', password: hashedPassword3, role: 'user' }
  ]);
};
