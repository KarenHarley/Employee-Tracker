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

const getRole = () => {
  return db
    .promise()
    .query("SELECT title FROM role")
    .then(([results]) => {
      let roleList = [];
      results.map((role) => {
        roleList.push([role.title]);
      });
      return roleList;
    });
};

//getNames();
//getRole();
getNames().then((response) => console.log(response));
console.log(getRole());

module.exports = { getNames };
