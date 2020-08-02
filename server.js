var inquirer = require("inquirer");
var connection = require("./config/connection");

// There are a total of 7 items in the array currently. Since index starts at 0 the frist item is 0 and the last item is 6.
const questions = [
  "Add a department",
  "Add an employee",
  "Add a role",
  "View and employee",
  "View a department",
  "View a role",
  "Update employee role",
  'Exit'
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
        // Case does not evaluate anything.
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
        // case questions[7]:
        //     return;
        //   break;
        default:
          "Please choose and option";
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
        message: "What's the name of the department",
      },
    ])
    .then((answer) => {
      connection.query(
        addDeptQuery,
        {
          name: answer.addDepartment,
        },
        (err) => {
          if (err) throw err;
          console.log("You've successfully added a department");
          start();
        }
      );
    });
};

let addRole = () => {
  let addRoleQuery = "INSERT INTO staffRole SET ?";
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Please enter the title of the role",
      },
      {
        name: "salary",
        type: "input",
        message: "Please enter the salary of the employee",
      },
    ])
    .then((answer) => {
      connection.query(
        addRoleQuery,
        {
          title: answer.title,
          salary: answer.salary,
        },
        (err) => {
          if (err) throw err;
          console.log("You have successfully added a role!");
          start();
        }
      );
    });
};

let addEmployee = () => {
  let addEmpQuery = "INSERT INTO employee SET ?";
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "Please enter the first name of the employee.",
      },
      {
        name: "lastName",
        type: "input",
        message: "Please enter the last name of the employee.",
      },
    ])
    .then((answer) => {
      connection.query(
        addEmpQuery,
        {
          first_name: answer.firstName,
          last_name: answer.lastName
        },
        (err) => {
          if (err) throw err;
          console.log("You have successfully added an employee!");
          start();
        }
      );
    });
};

let viewDepartment = () => {};
let viewEmployee = () => {};
let viewRole = () => {};

let upadateEmployeeRole = () => {};

start();
