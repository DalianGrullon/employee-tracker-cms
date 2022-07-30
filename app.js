const inquirer = require('inquirer');
const { will } = require('./helpers/queryHandler');

function init() {
  inquirer
    .prompt([
      {
        name: 'to',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          `View all Departments`, 
          `View all Roles`, 
          `View all Employees`,
          `Add a Department`,
          `Add a Role`,
          `Add an Employee`,
          `Update an Employee Role`,
          `Update an Employee's Manager`,
          `View Employees by Manager`,
          `View Employees by Department`,
          `Delete Departments, Roles, and Employees`,
          `View Total Budget of a Department`,
          `Exit`
        ]
      }
    ])
    .then(wants => {
      switch (wants.to) {
        case `View all Departments`:
          will.viewAllDepartments().then( ([rows, fields]) => {
            console.table(rows);
            init();
          });
          break;
        case `View all Roles`:
          will.viewAllRoles().then( ([rows, fields]) => {
            console.table(rows);
            init();
          });
          break;
        case `View all Employees`:
          will.viewAllEmployees().then( ([rows, fields]) => {
            console.table(rows);
            init();
          })
          break;
        case `Add a Department`:
          getNameOfDepartment().then(({ departmentName }) => {
            will.addADepartment(departmentName).then( () => {
              console.log(`A ${departmentName} department has been added to the company database`);
              init();
            })
          });
          break;
        case `Add a Role`:
          getRoleInfo().then(({ role, salary, department }) => {
            will.addARole(role, salary, department).then( () => {
              console.log(`${role} with a salary of ${salary} has been added to the ${department} department.`);
              init();
            })
          })
          break;
        case `Add an Employee`:
          console.log(`You added an employee`);
          init();
          break;
        case `Update an Employee Role`:
          console.log(`You updated an employee role`);
          init();
          break;
        case `Update an Employee's Manager`:
          console.log(`Updated employee by manager`);
          init();
          break;
        case `View Employees by Manager`:
          console.log(`Every employee by their manager`);
          init();
          break;
        case `View Employees by Department`:
          console.log(`Every employee by department`);
          init();
          break;
        case `Delete Departments, Roles, and Employees`:
          console.log(`Which would you like to delete?`);
          init();
          break;
        case `View Total Budget of a Department`:
          console.log(`1 dollar!`);
          init();
          break;
        
        default:
          console.log('Goodbye');
          break;
      }
    });

    function getNameOfDepartment() {
      return inquirer.prompt([
        {
          name: 'departmentName',
          type: 'input',
          message: 'What do you want the name of the department to be?'
        }
      ])
    }

    function getRoleInfo() {
      return inquirer.prompt([
        {
          name: 'role',
          type: 'input',
          message: 'What do you want the name of the role to be?'
        },
        {
          // be sure to parseFloat()
          name: 'salary',
          type: 'input',
          message: 'What do you want the salary for this role to be?'
        },
        {
          name: 'department',
          type: 'input',
          message: 'Which department will this role belong to?'
        },
      ])
    }
}

init();