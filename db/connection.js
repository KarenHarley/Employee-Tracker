const mysql = require("mysql2");


// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "harleyHorse",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);
module.exports = db;