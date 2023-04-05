const inquirer = require("inquirer");
const { printTable } = require("console-table-printer");
const { initializeDB, db, getRoles } = require("./db");
const {
  startingOptions,
  startingQuestion,
  departmentInfo,
  roleInfo,
  employeeInfo,
} = require("./questions");

initializeDB();

function prompt() {
  inquirer
    .prompt(startingQuestion)
    .then((answers) => {
      if (answers.startingQuestion == startingOptions.exit) {
        process.exit();
      } else {
        if (answers.startingQuestion === startingOptions.viewRoles) {
          // call getroles() here and print them to the screen.
        }
        // prompt();
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment.
      } else {
        // Something else went wrong.
      }
    });
}

prompt();
