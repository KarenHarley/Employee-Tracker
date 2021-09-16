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


//const { createPromptModule } = require("inquirer");
const db = require("../db/connection");


const getNames = () => {
  return db
    .promise()
    .query("SELECT first_name,last_name FROM employee")
    .then(([results]) => {
      let employeeList = [];
      results.map((employee) => {
        employeeList.push([employee.first_name, employee.last_name].join(" "));
      });
      return employeeList;
    });
};

function getRole() {
  let row;
  db.query("SELECT title FROM role", function (err, results) {
    //console.log(results); //will come back as json

    //console.log(row)
    function getRow(item) {
      return [item.title];
      // console.log([item.title])
    }
    row = results.map(getRow);
  });
  return row;
}

//getNames();
//getRole();
getNames().then((response) => console.log(response));
console.log(getNames());

module.exports = { getNames };
