INSERT INTO department (name)
VALUES ("Sales"),
       ("Marketing"),
       ("Accounting and Finance"),
       ("Human Resource Management"),
       ("Purchasing"),
       ("Research and Development"),
       ("Production"),
       ("Customer Service"),
       ("Delete this"),
       ("Legal"),
       ("Engineering");
       
INSERT INTO role (title,salary,department_id)
VALUES ("Sales Lead",3000,1),
       ("Lead Engineer",2000,11),
       ("Salesperson",1400,1),
       ("Accountant",4500,3),
       ("Lawyer",3300,10),
       ("Production Manager",1400,7),
       ("Software Engineer",37300,11),
       ("Account Manager",1600,3);
      


INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("John","Doe",1,NULL),
       ("Peter","Brown",2,NULL),      
       ("Sara","Johnson",7,2),      
       ("Tom","Chan",3, 1),      
       ("Maria","Sanchez",6, NULL), 
       ("Sandra","Peterson",7,2),      
       ("Mike","Beckwith",5,NULL),      
       ("Pamela","Wessiman",4,NULL);      
     
      
            