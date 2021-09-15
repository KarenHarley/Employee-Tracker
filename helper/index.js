/*
//template for the classes
class myClass {
  
    constructor() {
      //stuff you need here
    }
  
    
    searchAllEmployees(someParam) {
     //query you need here   }
  }
  */

const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware for body parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

function getNames() {
  let together;
  db.query(
    "SELECT first_name,last_name FROM employee",
    function (err, results) {
      //console.log(results); //will come back as json

      results.map(getFullName);

      function getFullName(item) {
       together = [item.first_name,item.last_name].join(" ");
        //console.log([item.first_name,item.last_name].join(" "))
       // return [item.first_name,item.last_name].join(" ");
      }
    }
  );
  return together
}
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

getNames()
console.log(getNames())
// module.exports = { readFromFile, writeToFile, readAndAppend };//modiftiy
