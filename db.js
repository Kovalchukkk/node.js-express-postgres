const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
});

module.exports = pool;
