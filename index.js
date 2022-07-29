const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const questions = require('./lib/questions');
const Query = require('./lib/queryHandlers');

// destructuring questions for inquirer prompts
const { todo } = questions

require('dotenv').config();

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  },
  console.log(`Connected to database.`)
);

function init() {
  inquirer
    .prompt(todo)
}

init();