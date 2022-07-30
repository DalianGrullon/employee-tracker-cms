const mysql = require('mysql2');
const db = require('../config/connection');
const cTable = require('console.table');

function viewAllDepartments() {
  return db.promise().query(
    `SELECT 
      id, name 
    FROM departments;`
  );
}

function viewAllRoles() {
  return db.promise().query(
    `SELECT
      roles.id, roles.title, roles.salary, departments.name
    FROM roles
    INNER JOIN departments
    ON roles.department_id = departments.id;`
  );
}

function viewAllEmployees() {
  return db.promise().query(
    `SELECT
      employees.id, employees.first_name, employees.last_name, roles.title, departments.name, roles.salary,
      CONCAT(managers.first_name, (' '), managers.last_name) AS managers
    FROM employees
    INNER JOIN roles ON employees.role_id = roles.id
    INNER JOIN departments ON roles.department_id = departments.id
    LEFT JOIN managers ON managers.id = employees.manager_id`
  );
}

function addADepartment(department) {
  return db.promise().query(`INSERT INTO departments (name) VALUES (?)`, department);
}

async function addARole(role, salary, department) {
  let [[ { id } ]] = await getDepartmentId(department);
  return db.promise().query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [role, parseFloat(salary), id]);
}

function getDepartmentId(name) {
  return db.promise().query(`SELECT id FROM departments WHERE name = (?)`, name);
}

module.exports = {
  will: {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addADepartment,
    addARole
  }
};