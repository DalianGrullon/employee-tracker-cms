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
          `Exit`
        ]
      }
    ])
    .then(wants => {
      switch (wants.to) {
        case `View all Departments`:
          will.viewAllDepartments().then( ([rows, fields]) => {
            console.log('\n');
            console.table(rows);
            console.log('\n');
            init();
          });
          break;
        case `View all Roles`:
          will.viewAllRoles().then( ([rows, fields]) => {
            console.log('\n');
            console.table(rows);
            console.log('\n');
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
          getEmployeeInfo().then(({ employeeFirstName, employeeLastName, employeeRole, isManager, managerFirstName, managerLastName }) => {
            if (isManager) {
              will.addAnEmployeeAsManager(employeeFirstName, employeeLastName, employeeRole).then( () => {
                console.log(`Successfully added ${employeeFirstName} ${employeeLastName} to company database with the role of ${employeeRole}`);
              })
            } else {
              will.addAnEmployee(employeeFirstName, employeeLastName, employeeRole, isManager, managerFirstName, managerLastName).then( () => {
                console.log(`Successfully added ${employeeFirstName} ${employeeLastName} to company database with the role of ${employeeRole} under ${managerFirstName} ${managerLastName}`);
              })
            }
          })
          break;
        case `Update an Employee Role`:
          will.renderEmployees().then(employeeNames => {
            let [[ { employees } ]] = employeeNames
    
            let employeeArray = employees.split(',');

            return employeeArray;
          })
          .then(allEmployees => {
             pickEmployee(allEmployees);
          })
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
          name: 'salary',
          type: 'input',
          message: 'What do you want the salary for this role to be?'
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
          message: 'What is the first name of this employee?'
        },
        {
          name: 'employeeLastName',
          type: 'input',
          message: 'What is the last name of this employee?'
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
          message: `What is the first name of the manager?`,
          when(answer) {
            return !answer.isManager;
          }
        },
        {
          name: 'managerLastName',
          type: 'input',
          message: `What is the last name of the manager?`,
          when(answer) {
            return !answer.isManager;
          }
        }
      ]);
    }

    function pickEmployee(allEmployees) {
      return inquirer.prompt([
        {
          name: 'toUpdate',
          type: 'list',
          message: 'Which employee would you like to update?',
          choices: allEmployees
        },
        {
          name: 'newRole',
          type: 'input',
          message: 'Which role would you like to give this employee?'
        }
      ])
      .then(({ toUpdate, newRole }) => {
        will.updateEmployee(toUpdate, newRole).then( () => {
          console.log(`${toUpdate} has been updated to the role of ${newRole}`);
          init();
        });
      })
    }
}

init();