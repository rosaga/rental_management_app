const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./server/routes');
const cors = require('cors');
require('./cronJobs');

require('dotenv').config();
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);



const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use('/api', routes); 

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Middleware to log errors
app.use((err, req, res, next) => {
  console.error('Something went wrong:', err);
  res.status(500).send('Something went wrong!');
});
