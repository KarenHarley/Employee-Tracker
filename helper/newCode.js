const getRole = () => {
    return db
      .promise()
      .query("SELECT title,id FROM role")
      .then(([results]) => {
        let roleList = [];
        results.map((role) => {
          roleList.push({name: role.title, value: role.id});//the name is what shows
        });
        return roleList;
      });
  };
  getRole()


  const getNames = (incNone) => {
    return db
      .promise()
      .query("SELECT id,first_name,last_name FROM employee")
      .then(([results]) => {
        let employeeList = [];
        results.map((employee) => {
          employeeList.push({name: [employee.first_name, employee.last_name].join(" "), value: employee.id});
        });
        if(incNone){
          employeeList.push("None")
        }
        return employeeList;
      });
  };

  //class

  class EmployeeAdd {
    constructor(firstName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
     
    }
    addEmployeeToDb(roleId,managerId) {
      const query =
        "INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?)";
      let values = [this.firstName, this.lastName, roleId, managerId];
      return db.promise().query(query, [values]).catch((error) => {
        console.log(error);
      });
    }
  }