var inquirer = require("inquirer");
var connection = require("./config/connection");
var consTable = require("console.table");


const questions = [
  "Add a department",
  "Add an employee",
  "Add a role",
  "View employees",
  "View departments",
  "View roles",
  "Update employee role",
  "Exit"
];

function start() {
  inquirer
    .prompt({
      name: "prelimQuestion",
      type: "list",
      message: "What would you like to do?",
      choices: questions,
    })
    .then(function (answer) {
      switch (answer.prelimQuestion) {
        case questions[0]:
          addDepartment();
          break;
        case questions[1]:
          addEmployee();
          break;
        case questions[2]:
          addRole();
          break;
        case questions[3]:
          viewEmployee();
          break;
        case questions[4]:
          viewDepartment();
          break;
        case questions[5]:
          viewRole();
          break;
        case questions[6]:
          upadateEmployeeRole();
          break;
        case questions[7]:
            connection.end();
          break;
        default:
          connection.end();
          break;
      }
    });
}

let addDepartment = () => {
  let addDeptQuery = "INSERT INTO department SET ?";
  inquirer
    .prompt([
      {
        name: "addDepartment",
        type: "input",
        message: "What's the name of the department?",
      }
    ])
    .then((answer) => {
      connection.query(
        addDeptQuery,
        {
          name: answer.addDepartment
        },
        (err, res) => {
          if (err) throw err;
          console.log("You've successfully added a department");
          start();
        }
      );
    });
};

let addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What's the name of the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this role?",
      },
      {
        type: "input",
        name: "deptID",
        message: "What is the department id number?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO staffRole (title, salary, department_id) VALUES (?, ?, ?)",
        [answer.role, answer.salary, answer.deptID],
        function (err, res) {
          if (err) throw err;
          console.log("Successfully Added Role!");
          start();
        }
      );
    });
};

let addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstname",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastname",
        message: "What is the employee's last name?",
      },
      {
        type: "input",
        name: "roleId",
        message: "What is the employee's role ID?",
      },
      {
        type: "input",
        message: "What is the manager id number? (Leave empty if not applicable)",
        name: "managerID"
      }
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [answer.firstname, answer.lastname, answer.roleId, answer.manager],
        function (err, res) {
          if (err) throw err;
          console.log("Successfully added employee!");
          start();
        }
      );
    });
};

let viewDepartment = () => {
  let queryString = "SELECT * FROM department";
  connection.query(queryString, function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
};
let viewEmployee = () => {
  let queryString = "SELECT * FROM employee";
  connection.query(queryString, function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
};
let viewRole = () => {
  let queryString = "SELECT * FROM staffRole";
  connection.query(queryString, function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
};

let upadateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "updateEmp",
        message: "Which employee would you like to update?",
      },
      {
        type: "input",
        name: "updateRole",
        message: "What is their new role ID?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "UPDATE employee SET role_id= ? WHERE first_name= ?",
        [answer.updateRole, answer.updateEmp],
        function (err, res) {
          if (err) throw err;
          console.log("Successfully updated role!");
          start();
        }
      );
    });
};

start();
