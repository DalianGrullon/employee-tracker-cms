const mysql = require('mysql2');
const db = require('../config/connection');
const cTable = require('console.table');
const util = require('util');
// Create a class called Query to handle queries
class Query {
  constructor (choice) {
    this.choice = choice;
  }

  // Create methods that return desired queries
  viewAllDepartments() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM department', (err, results, fields) => {
        resolve(results);
      })
    })
  }

  viewAllRoles() {
    return new Promise((resolve, reject) => {
      db.query('SELECT role.id, role.title, role.salary, department.name FROM department INNER JOIN role ON role.department_id = department.id', (err, results, fields) => {
        resolve(results);
      })
    })
  }
};


module.exports = Query;