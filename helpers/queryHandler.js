const mysql = require('mysql2');
const db = require('../config/connection');
const cTable = require('console.table');

// View data in database
function viewAllDepartments() {
  return db.promise().query(
    `SELECT 
      name AS Department, id AS Department_ID
    FROM departments;`
  );
}

function viewAllRoles() {
  return db.promise().query(
    `SELECT
      roles.title AS Role, roles.id AS Role_ID, departments.name AS Department, roles.salary AS Role_Salary
    FROM roles
    INNER JOIN departments ON roles.department_id = departments.id;`
  );
}

function viewAllEmployees() {
  return db.promise().query(
    `SELECT
      employees.id AS Employee_ID, employees.first_name AS First_Name, employees.last_name AS Last_Name,
      roles.title AS Role, departments.name AS Department, roles.salary AS Role_Salary,
      CONCAT(managers.first_name, (' '), managers.last_name) AS Manager
    FROM employees
    INNER JOIN roles ON employees.role_id = roles.id
    INNER JOIN departments ON roles.department_id = departments.id
    LEFT JOIN managers ON managers.id = employees.manager_id`
  );
}

// Add data into database
function addADepartment(department) {
  return db.promise().query(`INSERT INTO departments (name) VALUES (?)`, department);
}

async function addARole(role, salary, department) {
  let [[ { id } ]] = await getDepartmentId(department);
  return db.promise().query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [role, parseFloat(salary), id]);
}

async function addAnEmployee(employeeFirstName, employeeLastName, employeeRole, hasManager, managerFirstName, managerLastName) {
  let [[ { id: roleId } ]] = await getRoleId(employeeRole);
  let [[ { id: managerId } ]] = await getManagerId(managerFirstName, managerLastName);
  
  return db.promise().query(
    `INSERT INTO employees (first_name, last_name, role_id, manager_id) 
    VALUES (?, ?, ?, ?)`, [employeeFirstName, employeeLastName, roleId, managerId]);
}

async function addAnEmployeeAsManager(employeeFirstName, employeeLastName, employeeRole) {
  let [[ { id: roleId } ]] = await getRoleId(employeeRole);
  
  return db.promise().query(
    `INSERT INTO employees (first_name, last_name, role_id) 
    VALUES (?, ?, ?)`, [employeeFirstName, employeeLastName, roleId]);
}

// Update data in database
async function updateEmployee(name, role) {
  let [[ { id: roleId } ]] = await getRoleId(role);
  let [[ { id: employeeId } ]] = await getEmployeeId(name);
  
  return db.promise().query(
    `UPDATE employees
    SET role_id = (?)
    WHERE id = (?)`,
    [roleId, employeeId]
  );
}


// Get data from database
function getDepartmentId(name) {
  return db.promise().query(`SELECT id FROM departments WHERE name = (?)`, name);
}

function getRoleId(nameOfRole) {
  return db.promise().query(`SELECT id FROM roles WHERE title = (?)`, nameOfRole);
}

function getManagerId(firstName, lastName) {
  return db.promise().query(`SELECT id FROM managers WHERE first_name = (?) AND last_name = (?)`, [firstName, lastName]);
}

function getEmployeeId(fullName) {
  let firstAndLast = fullName.split(' ');
  
  return db.promise().query(`SELECT id FROM employees WHERE first_name = (?) AND last_name = (?)`, [firstAndLast[0], firstAndLast[1]]);
}

async function getEmployees() {
  return db.promise().query(
    `SELECT GROUP_CONCAT(first_name, (' '), last_name) AS employees
    FROM employees;`);
}

module.exports = {
  will: {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addADepartment,
    addARole,
    addAnEmployee,
    addAnEmployeeAsManager,
    getEmployees,
    updateEmployee
  }
};