const inquirer = require('inquirer');

const lib = require('./lib/index');
const helpers = require('./helpers/index');

// destructuring resources from other directories
const { to } = lib.questions;
const Query = lib.Query;
const { getMethod } = helpers;

function init() {
  inquirer
    .prompt(to)
    .then(wants => {
      const { choices } = to;

      // make databse query asynchronus
      choices.forEach(choice => {
        if (wants.to === choice) {
          let query = new Query(choice);
          eval(`query.${getMethod(choice)}`).then((results) => {
            console.table(results);
            init();
          });
        }
      });
    })
}

init();