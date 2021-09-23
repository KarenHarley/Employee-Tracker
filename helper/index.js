const db = require("../db/connection");
const cTable = require("console.table");
//adds employee

class DB {
  addEmployeeToDb(firstName, lastName, roleId, managerId) {
    const query =
      "INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?)";
    let values = [firstName, lastName, roleId, managerId];
    return db
      .promise()
      .query(query, [values])
      .catch((error) => {
        console.log(error);
      });
  }

  //update role

  updateEmployeeToDb(roleId, nameId) {
    return db
      .promise()
      .query("UPDATE employee SET role_id = ? WHERE id = ?", [roleId, nameId])
      .catch((error) => {
        console.log(error);
      });
  }

  //update manager

  updateManagerToDb(managerId, employeeId) {
    return db
      .promise()
      .query("UPDATE employee SET manager_id = ? WHERE id = ?", [
        managerId,
        employeeId,
      ])
      .catch((error) => {
        console.log(error);
      });
  }
  //create department in database
  createDeptInDb(department) {
    return db
      .promise()
      .query("INSERT INTO department (name) VALUES (?)", department)
      .catch((error) => {
        console.log(error);
      });
  }

  //AddNewRole

  createRoleInDb(name, salary, deptId) {
    let values = [name, salary, deptId];
    return db
      .promise()
      .query("INSERT INTO role (title,salary,department_id) VALUES (?)", [
        values,
      ])
      .catch((error) => {
        console.log(error);
      });
  }

  //function that returns the names of the Employee's in an array for use as a choice prompt
  getNames = (incNone) => {
    return db
      .promise()
      .query("SELECT id,first_name,last_name FROM employee")
      .then(([results]) => {
        let employeeList = [];
        results.map((employee) => {
          employeeList.push({
            name: [employee.first_name, employee.last_name].join(" "),
            value: employee.id,
          });
        });
        if (incNone) {
          employeeList.push({ name: "None", value: null });
        }
        return employeeList;
      });
  };
  //function that returns the roles in an array for use as a choice prompt
  getRole = () => {
    return db
      .promise()
      .query("SELECT title,id FROM role")
      .then(([results]) => {
        let roleList = [];
        results.map((role) => {
          roleList.push({ name: role.title, value: role.id }); //the name is what shows
        });
        return roleList;
      });
  };
  //function the returns the departments as an array for use as a choice prompt
  getDepartment = () => {
    return db
      .promise()
      .query("SELECT name,id FROM department")
      .then(([results]) => {
        let deptList = [];
        results.map((dept) => {
          deptList.push({ name: dept.name, value: dept.id });
        });
        return deptList;
      });
  };
  //function to see all of the employees
  viewAllEmployees = () => {
    return db
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
      )
      .then(([results]) => {
        const table = cTable.getTable(results);

        return table;
      });
  };
  //see all of the roles
  viewAllRolesFromDb = () => {
    return db
      .promise()
      .query(
        "SELECT role.id,role.title,role.salary,department.name AS department FROM role JOIN department ON department.id = role.department_id "
      )
      .then(([results]) => {
        const table = cTable.getTable(results);

        return table;
      });
  };
  //see all of the departments
  viewAllDepartmentsFromDb = () => {
    return db
      .promise()
      .query("SELECT * FROM department")
      .then(([results]) => {
        const table = cTable.getTable(results);

        return table;
      });
  };
}

module.exports = new DB();
