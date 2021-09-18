let roleId;
let managerId;
const db = require("../db/connection");
//ask about the chaining in the functions
const cTable = require("console.table");
class Employee {
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
      "SELECT employee.id,employee.first_name,employee.last_name,role.title,role.salary,department.name AS department,employee.manager_id AS manager FROM role JOIN employee ON role.id = employee.role_id JOIN department ON department_id = department.id;"
    )
    .then(([results]) => {
      //onsole.log(results)
      const table = cTable.getTable(results);
     // console.log(table);
       return table;
    });
};

//employee = new Employee("Jack", "Ryan", "Software Engineer", "None").getRole(); //.addEmployeeToDb()
//employee2 = new Employee("Daniel", "Spencer", "Account Manager", "Karen Villagomez").getRole(); //.addEmployeeToDb()
//getNames();
//getRole();
//getNames().then((response) => console.log(response));
//getRole().then((response) => console.log(response));
//console.log(roleId);

//viewAllEmployees();
module.exports = { getNames, getRole, Employee ,viewAllEmployees};
