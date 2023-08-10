const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  endpoint: process.env.DB_URL,
  Port: 3000
};