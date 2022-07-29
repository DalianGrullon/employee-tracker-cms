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
      db.query('SELECT name FROM department', (err, results, fields) => {
        // console.table(results);
        resolve(results);
      })
    })
  }
};


module.exports = Query;