let roleId;
let managerId;
let nameId;
const db = require("../db/connection");
//ask about the chaining in the functions
const cTable = require("console.table");



class EmployeeAdd {
  constructor(firstName, lastName, role, manager) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.manager = manager;
  }
  getRole() {
    //this function gets the id for the selected role
    return db
      .promise()
      .query("SELECT id,title FROM role")
      .then(([results]) => {
        //gets matching role (title) to the selected role
        let output = results.filter((role) => role.title == this.role);
        //extracts just the id
        roleId = output[0].id;

        this.getManager(); //calls next function
      });
  }
  getManager() {
    if (this.manager === "None") {
      this.manager = null;
      this.addEmployeeToDb();
    } else {
      return db
        .promise()
        .query(
          "SELECT id,CONCAT(first_name, ' ', last_name) AS complete_name FROM `employee`"
        )
        .then(([results]) => {
          let output = results.filter(
            (people) => people.complete_name == this.manager
          );

          managerId = output[0].id;

          this.addEmployeeToDb();
        });
    }
  }
  addEmployeeToDb() {
    const query =
      "INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?)";
    let values = [this.firstName, this.lastName, roleId, managerId];
    return db.promise().query(query, [values]);
  }
}


class EmployeeRoleUpdate {

  constructor(fullName,selectedRole) {
    this.fullName = fullName;
    this.selectedRole =selectedRole;
  }
  getId() {
    if (this.fullName === "None") {
      //appMenu() //if the select none quit an call the other function app or something
    } else {
      return db
        .promise()
        .query(
          "SELECT id,CONCAT(first_name, ' ', last_name) AS complete_name FROM `employee`"
        )
        .then(([results]) => {
          console.log(results)
          let output = results.filter(
     
            (people) => people.complete_name == this.fullName
          );
            console.log(output)
          nameId = output[0].id;
            console.log(nameId)
          this.getRole();
        });
    }
  }
  getRole() {
    //this function gets the id for the selected role
    return db
      .promise()
      .query("SELECT id,title FROM role")
      .then(([results]) => {
        //gets matching role (title) to the selected role
        let output = results.filter((role) => role.title == this.selectedRole);
        //extracts just the id
        roleId = output[0].id;
        

        this.updateEmployeeToDb(); //calls next function
      });
  }
  updateEmployeeToDb() {
    const query =
      "UPDATE employee SET role_id = ? WHERE id = ?";
    let values = [roleId,nameId];
    return db.promise().query(query, [values]);
  }
}









//function that returns the names of the Employee's in an array for use as a choice prompt
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
//function that returns the roles in an array for use as a choice prompt
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

//function to see all of the employees
const viewAllEmployees = () => {
  return db
    .promise()
    .query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    )
    .then(([results]) => {
      //console.log(results)
      const table = cTable.getTable(results);
     // console.log(table);
       return table;
    });
};

//employee = new Employee("Jack", "Ryan", "Software Engineer", "None").getRole(); //.addEmployeeToDb()
employee2 = new EmployeeRoleUpdate("Daniel Spencer","Sales Lead").getId(); //.addEmployeeToDb()
//getNames();
//getRole();
//getNames().then((response) => console.log(response));
//getRole().then((response) => console.log(response));
//console.log(roleId);

//viewAllEmployees();
module.exports = { getNames, getRole, EmployeeAdd ,viewAllEmployees,EmployeeRoleUpdate};
