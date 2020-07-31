
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
    salary DECIMAL(6, 0) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id)
);

-- Create table for employee
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY(id)
);

