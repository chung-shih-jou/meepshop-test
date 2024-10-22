const { Pool } = require("pg");
const pool = new Pool({
  host: "db",
  port: 5432,
  user: "Rose",
  password: "password",
  database: "test",
});
module.exports = pool;
