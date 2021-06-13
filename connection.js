const mysql = require("mysql");
const util = require("util");

let connection = mysql.createConnection({
    host: "localhost",
    
    port: 3306,
 
    user: "root",
   
    password: "abc123",
    database: "employees_db"
});

connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;