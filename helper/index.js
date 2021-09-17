let roleId;
let managerId;
const db = require("../db/connection");
//const { employee } = require("../helper");

class Employee {
  constructor(firstName, lastName, role, manager) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.manager = manager;
  }
  getRole() {
    return db
      .promise()
      .query("SELECT id,title FROM role")
      .then(([results]) => {
        //console.log(results);
        let output = results.filter((role) => role.title == this.role);
        //console.log(output);
        roleId = output[0].id;
        //console.log(roleId)
        this.getManager();
      });
  }
  getManager() {
    if (this.manager === "None") {
      this.manager = null;
    } else {
      return db
        .promise()
        .query(
          "SELECT id,CONCAT(first_name, ' ', last_name) AS complete_name FROM `employee`"
        ) //CONCAT(first_name, ',', last_name) AS complete_name FROM `employee`;
        .then(([results]) => {
          // console.log(results);
          let output = results.filter(
            (people) => people.complete_name == this.manager
          );
          // console.log(output);
          managerId = output[0].id;
          // console.log(managerId)
        });
    }
    this.addEmployeeToDb();
  }
  addEmployeeToDb() {
    const query =
      "INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?)";
    let values = [this.firstName, this.lastName, roleId, managerId]; //"this.first_name,this.lastName"; //(?)
    return db
      .promise()
      .query(query, [values])
      .then(([results]) => {
        // console.log("worked");
      });
  }
}

const getNames = () => {
  return db
    .promise()
    .query("SELECT first_name,last_name FROM employee")
    .then(([results]) => {
      let employeeList = ["None"];
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
        roleList.push([role.title].join(" "));
      });
      return roleList;
    });
};
//employee = new Employee("Jack", "Ryan", "Software Engineer", "None").getRole(); //.addEmployeeToDb()
//employee2 = new Employee("Daniel", "Spencer", "Account Manager", "Karen Villagomez").getRole(); //.addEmployeeToDb()
//getNames();
//getRole();
//getNames().then((response) => console.log(response));
//getRole().then((response) => console.log(response));
//console.log(roleId);
module.exports = { getNames, getRole, Employee };
