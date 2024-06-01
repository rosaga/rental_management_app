const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./server/routes');
const cors = require('cors');
require('./src/components/cronJobs');



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
