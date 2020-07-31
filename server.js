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
            default:
                'Please choose and option';
                break;
        };
    });
}
let depArr = [];
let addDepartment = ()=>{
    inquirer
    .prompt ([
        {
            name: 'addDepartment',
            type: 'input',
            message: 'What\'s the name of the department'
        }
    ]).then(answer => {
        connection.query(
            'INSERT INTO department SET ?', 
            {
                name: answer.addDepartment
            },
            (err)=>{
                if (err) throw err;
                console.log('You\'ve successfully added a department')
                start();
            },
            depArr.push(answer.addDepartment)
        )
    });
};

let addRole = () => {
    
};

let addEmployee = () =>{
    inquirer
    .prompt([
        {
            name: 'empTitle',
            type: 'input',
            message: 'What is the title of the employee'
        },
        {
            name: 'empSalary',
            type: 'input',
            message: 'What is the salary'
        },
        // {Add to staff role}
            name: 'departments',
            type: 'list',
            message: 'Choose a department',
            choices: depArr
        }
    ]).then(answer => {
        connection.query(
            'SELECT * FROM cms_db',
            {

            }
        )
    })
};

let viewDepartment = () =>{

};
let viewEmployee = () =>{

}
let viewRole = () => {

};

let upadateEmployeeRole = () =>{

};
