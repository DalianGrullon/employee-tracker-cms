const mysql = require('mysql2');
const db = require('../config/connection');
const cTable = require('console.table');

// Create a class called Query to handle queries
class Query {
  constructor (choice) {
    this.choice = choice;
  }

  // Create methods that return desired queries
  viewAllDepartments() {
    db.query('SELECT name FROM department', (err, results) => {
      console.table(results);
    })
  }
};


module.exports = Query;