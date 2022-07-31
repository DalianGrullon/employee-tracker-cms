const inquirer = require('inquirer');
const { will } = require('./helpers/queryHandler');
const { numVerify, noSpace } = require('./helpers/inputValidate');

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
          `Exit`
        ]
      }
    ])
    .then(wants => {
      switch (wants.to) {
        case `View all Departments`:
          will.viewAllDepartments().then( ([rows]) => {
            console.log('\n');
            console.table(rows);
            console.log('\n');
            init();
          });
          break;

        case `View all Roles`:
          will.viewAllRoles().then( ([rows]) => {
            console.log('\n');
            console.table(rows);
            console.log('\n');
            init();
          });
          break;

        case `View all Employees`:
          will.viewAllEmployees().then( ([rows]) => {
            console.log('\n');
            console.table(rows);
            console.log('\n');
            init();
          })
          break;

        case `Add a Department`:
          getNameOfDepartment().then(({ departmentName }) => {
            will.addADepartment(departmentName).then( () => {
              console.log('\n');
              console.log(`The ${departmentName} department has been added to the company database`);
              console.log('\n');
              init();
            })
          });
          break;

        case `Add a Role`:
          getRoleInfo().then(({ role, salary, department }) => {
            will.addARole(role, salary, department).then( () => {
              console.log('\n');
              console.log(`${role} with a salary of ${salary} has been added to the ${department} department.`);
              console.log('\n');
              init();
            })
          })
          break;

        case `Add an Employee`:
          getEmployeeInfo().then(({ employeeFirstName, employeeLastName, employeeRole, isManager, managerFirstName, managerLastName }) => {
            if (isManager) {
              will.addAnEmployeeAsManager(employeeFirstName, employeeLastName, employeeRole).then( () => {
                console.log('\n');
                console.log(`Successfully added ${employeeFirstName} ${employeeLastName} to company database with the role of ${employeeRole}`);
                console.log('\n');
              })
            } else {
              will.addAnEmployee(employeeFirstName, employeeLastName, employeeRole, isManager, managerFirstName, managerLastName).then( () => {
                console.log('\n');
                console.log(`Successfully added ${employeeFirstName} ${employeeLastName} to company database with the role of ${employeeRole} under ${managerFirstName} ${managerLastName}`);
                console.log('\n');
              })
            }
          })
          break;

        case `Update an Employee Role`:
          will.getEmployees()
          .then(([[ { employees: asString } ]]) => asString.split(','))
          .then(employeesArray => pickEmployee(employeesArray));
          break;
        
        default:
          console.log(
            `Thanks for using Employee Tracker!
            Goodbye...`
          );
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
          message: 'What do you want the name of this role to be?'
        },
        {
          name: 'salary',
          type: 'input',
          message: 'What do you want the salary for this role to be?',
          validate: numVerify
        },
        {
          name: 'department',
          type: 'input',
          message: 'Which department will this role belong to?'
        }
      ])
    }

    function getEmployeeInfo() {
      return inquirer.prompt([
        {
          name: 'employeeFirstName',
          type: 'input',
          message: 'What is the first name of this employee?',
          validate: noSpace
        },
        {
          name: 'employeeLastName',
          type: 'input',
          message: 'What is the last name of this employee?',
          validate: noSpace
        },
        {
          name: 'employeeRole',
          type: 'input',
          message: `What is this employee's role?`
        },
        {
          name: 'isManager',
          type: 'confirm',
          message: 'Is this employee a manager?'
        },
        {
          name: 'managerFirstName',
          type: 'input',
          message: `What is the first name of the employee's manager?`,
          when(answer) {
            return !answer.isManager;
          },
          validate: noSpace
        },
        {
          name: 'managerLastName',
          type: 'input',
          message: `What is the last name of the employee's manager?`,
          when(answer) {
            return !answer.isManager;
          },
          validate: noSpace
        }
      ]);
    }

    function pickEmployee(employees) {
      return inquirer.prompt([
        {
          name: 'employee',
          type: 'list',
          message: 'Which employee would you like to update?',
          choices: employees
        },
        {
          name: 'newRole',
          type: 'input',
          message: 'Which role would you like to give this employee?'
        }
      ])
      .then(({ employee, newRole }) => {
        will.updateEmployee(employee, newRole).then( () => {
          console.log('\n');
          console.log(`${employee} has been updated to the role of ${newRole}`);
          console.log('\n');
          init();
        });
      })
    }
}

init();