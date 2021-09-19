var inquirer = require("inquirer");
const {
  getNames,
  getRole,
  EmployeeAdd,
  viewAllEmployees,
  EmployeeRoleUpdate,
  viewAllRolesFromDb,
  viewAllDepartmentsFromDb,
} = require("./helper"); 

/*
Things to do:
1. Make ALL functions in ES6 (arrow)
*/
const appMenu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((userChoice) => {
      switch (userChoice.memberChoice) {
        case "View All Employees":
          viewAllEmployeesTable();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        default:
        //Quit somehow (look at how to do it)
        //process.exit
      }
    });

  const viewAllEmployeesTable = async () => {
    /*table shows department names, salary etc using several join*/
    const viewAllEm = await viewAllEmployees();
    //logging info (table)
    console.log(viewAllEm);
    appMenu();
  };
  const addEmployee = async () => {
    const employeeInfo = await getNames();
    const roleInfo = await getRole();

    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is your employee's first name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter at least one character.";
          },
        },
        {
          type: "input",
          name: "lastName",
          message: "What is your employee's last name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter at least one character.";
          },
        },
        {
          type: "list",
          name: "role",
          message: "What is your employee's role?",
          choices: roleInfo,
        },
        {
          type: "list",
          name: "manager",
          message: "What is your employee's manager?",
          choices: employeeInfo,
        },
      ])
      .then((answers) => {
        const employee = new EmployeeAdd(
          answers.firstName,
          answers.lastName,
          answers.role,
          answers.manager
        );
        employee.getRole(); //call function
        console.log(
          `Added ${answers.firstName} ${answers.lastName} to the database!`
        );
        appMenu(); //call the first questions
      });
  };

  const updateEmployeeRole = async () => {
    const employeeInfo = await getNames();
    const roleInfo = await getRole();
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedEmployee",
          message: "Select an employee who's role you want to update",
          choices: employeeInfo,
        },
        {
          type: "list",
          name: "selectedRole",
          message: "Which role do you want to assign the selected employee?",
          choices: roleInfo,
        },
      ])
      .then((answers) => {
        const employeeRoleUpdate = new EmployeeRoleUpdate(
          answers.selectedEmployee,
          answers.selectedRole
        );
        //call the function in the class
        employeeRoleUpdate.getId();
        console.log(
          `Updated ${answers.selectedEmployee}'s role in the database!`
        );
        appMenu(); //call the first questions
      });
  };

  const viewAllRoles = async () => {
  
    const viewAllRoles = await viewAllRolesFromDb();
    //logging info (table)
    console.log(viewAllRoles);
    appMenu();
  };
  const addRole = () => {};
  const viewAllDepartments = async () => {
    const viewAllDepartments = await viewAllDepartmentsFromDb();
    console.log(viewAllDepartments);
    appMenu();
  };
  const addDepartment = () => {};
};

appMenu();


