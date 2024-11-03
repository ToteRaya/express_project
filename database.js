const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'',
    database:'nodejs'
});

pool.query = util.promisify(pool.query);
module.exports = pool;

//to import use: ------------------------------------>
//const db = require('../database');