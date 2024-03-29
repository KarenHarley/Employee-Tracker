DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30), 
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS role;
CREATE TABLE role (
 id INT AUTO_INCREMENT,
 title VARCHAR(30), 
 salary DECIMAL, 
 department_id INT, 
 PRIMARY KEY (id),
 FOREIGN KEY (department_id)
 REFERENCES department(id)
 ON DELETE SET NULL
);

DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
 id INT AUTO_INCREMENT,
 first_name VARCHAR(30),
 last_name VARCHAR(30),
 role_id INT,
 manager_id INT,
 PRIMARY KEY (id),
 FOREIGN KEY (role_id)
 REFERENCES role(id),
 FOREIGN KEY (manager_id)
 REFERENCES employee(id)
 ON DELETE SET NULL
);

