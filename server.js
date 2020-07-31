var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user:'root',
    password: 'Pse2udograph2#$',
    database: 'cms_db'
});

connection.connect(function(err){
    if(err) throw err;
    
    start();
});

// There are a total of 7 items in the array currently. Since index starts at 0 the frist item is 0 and the last item is 6.
const questions = ['Add a department', 'Add an employee', 'Add a role', 'View and employee', 'View a department', 'View a role', 'Update employee role']

function start() {
    inquirer
    .prompt({
        name: 'prelimQuestion',
        type: 'list',
        message: 'What would you like to do?',
        choices: questions
    })
    .then(function(answer){
        switch(answer.prelimQuestion){
            case answer.choices === questions[0]:
                addDepartment();
                start();
                break;
            case answer.choices === questions[1]:
                addEmployee();
                start();
                break;
            case answer.choices === questions[2]:
                addRole();
                start();
                break;
            case answer.choices === questions[3]:
                viewEmmployee();
                start();
                break;
            case answer.choices === questions[4]:
                viewDepartment();
                start();
                break;
            case answer.choices === questions[5]:
                viewRole();
                start();
                break;
            case answer.choices === questions[6]:
                upadateEmployeeRole();
                start();
                break;
            default:
                'Please choose and option';
                start();
                break
        };
    });
}