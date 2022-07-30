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
    // job title, role id, department role belongs to, salary for role
    `SELECT
      roles.id, roles.title, roles.salary, departments.name
    FROM roles
    INNER JOIN departments
    ON roles.department_id = departments.id;`
  );
}

module.exports = {
  will: {
    viewAllDepartments,
    viewAllRoles
  }
};