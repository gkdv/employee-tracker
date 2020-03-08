DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department
(	id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(30) NOT NULL,
     PRIMARY KEY (id)
);

CREATE TABLE role
(	id INT NOT NULL AUTO_INCREMENT,
     title VARCHAR(30) NOT NULL,
     salary DECIMAL(8, 2),
     department_id INT,
     PRIMARY KEY (id)
);

CREATE TABLE employee
(	id INT NOT NULL AUTO_INCREMENT,
     first_name VARCHAR(30),
     last_name VARCHAR(30),
     role_id INT,
     manager_id INT DEFAULT NULL,
     PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Operations"), ("Sales"), ("Finance"), ("Legal"), ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("President", 450000, 1), ("VP", 500000, 2) , ("COO", 560000, 4) , ("Sales Manager", 20000, 3) , ("Salesman", 45000, 2),
("Consultant", 90000, 6), ("Accountant", 120000, 3), ("Legal Manager", 78000, 2) , ("Attorney", 400000, 6),
("Engineer", 200000, 3), ("Software Engineer", 999000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Sara", "Kurtz", 1, NULL), ("Peter", "Juan", 2, 3), ("Timmy", "Tom", 3, 1), ("Patrick", "Peterson", 4, 7),
("Tom", "Brady", 5, NULL), ("Sean", "Kingston", 6, NULL), ("Brian", "Thompson", 7, 4), ("Cassy", "Stienback", 8, NULL),
("Ashley", "Garrett", 9, 3), ("Victoria", "Walters", 10, 5), ("Loria", "Manie", 11, 2)