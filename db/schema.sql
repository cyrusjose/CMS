-- Drops the cms_db if it already exists --
DROP DATABASE IF EXISTS cms_db;

-- Create the database cms_db and specified it for use.
CREATE DATABASE cms_db;

USE cms_db;

-- Create the table for department.
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- Create table for role
CREATE TABLE staffRole (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(40) NOT NULL,
    salary DECIMAL(6,0) NOT NULL,
    department_id INT NOT NULL,
    -- Take a colum of a table and cache it so that we can refernce it frequently.
    --  ON DELETE CASCADE will delete the reference to the other table once the code is done running. 
    INDEX dep_id (department_id), 
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES 
    department (id) ON DELETE CASCADE, 
    PRIMARY KEY(id)
);

-- Create table for employee
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    INDEX ro_id (role_id), 
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES 
    staffRole (id) ON DELETE CASCADE,
    manager_id INT NOT NULL,
    PRIMARY KEY(id)
);