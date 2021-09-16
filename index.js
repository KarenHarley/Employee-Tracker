var inquirer = require("inquirer");
const { getNames } = require("./helper");
/*
Things to do:
1. Make ALL functions in ES6 (arrow)
*/
function appMenu() {
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
          viewAllEmployees();
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
          //Quit somehow
         
      }
    });

  const viewAllEmployees =() => {
    /*
      THEN I am presented
       with a formatted table showing 
       department names and department ids
      */
  }
  const addEmployee = async () => {
    const employeeInfo = await getNames

  //  if(!employeeInfo.ok){
  //    throw new Error("something is wrong")
  //  }
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
          choices: [
            "Sales",
            "Marketing",
            "Accounting and Finance",
            "Human Resource Management",
            "Purchasing",
            "Research and Development",
            "Production",
            "Customer Service",
            "Delete this",
            "Legal",
            "Engineering",
          ],
        },
        {
          type: "list",
          name: "manager",
          message: "What is your employee's manager?",
          choices: employeeInfo,//to something like push("None")
        },
      ])
      .then((answers) => {
        //const employee = new Employee(
        //  answers.engineerName
        //create things for the object (properties)
        //);

        console.log(
          `Added ${answers.firstName} ${answers.lastName} to the database!`
        );
        appMenu(); //call the first questions
      });
      
  }
  function updateEmployeeRole() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedEmployee",
          message: "Select an employee who's role you want to update",
          choices: [
            "None",
            "John Doe",
            "Peter Brown",
            "Sara Johnson",
            "Tom Chan",
            "Maria Sanchez",
            "Sandra Peterson",
            "Mike Beckwith",
            "Pamela Wessiman",
          ],
        },
      ])
      .then((answers) => {
        //const employee = new Employee(
        //  answers.engineerName
        //create things for the object (properties)
        //);

        console.log(
          `Updated ${answers.selectedEmployee}'s role in the database!`
        );
        appMenu(); //call the first questions
      });
  }
  function viewAllRoles() {
    /*
   THEN I am presented with the job title, role id,
   the department that role belongs to,
   and the salary for that role
    */
  }
  function addRole() {}
  function viewAllDepartments() {
    /*
   THEN I am presented with a formatted table 
   showing department names and department ids
    */
  }
  function addDepartment() {}
  
}

appMenu();

/*
  .then((answers) => {
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    console.log(error)
  });
  */
