const mysql = require("mysql2");
const util = require("util");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "170304",
  database: "nodejs",
});

pool.query = util.promisify(pool.query);
module.exports = pool;

//to import use: ------------------------------------>
//const db = require('../database');
