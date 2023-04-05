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
        console.log("Exiting application...");
        process.exit();
      } else {
        handleFirstAnswer(answers.startingQuestion);
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

function handleFirstAnswer(answer) {
  if (answer === startingOptions.viewRoles) {
    db.query("SELECT * from role", (err, results) => {
      if (err) {
        console.error(err);
      } else {
        printTable(results);
      }
    });
  }
  if (answer === startingOptions.viewDeps) {
    db.query("SELECT * from department", (err, results) => {
      if (err) {
        console.error(err);
      } else {
        printTable(results);
      }
    });
  }
  if (answer === startingOptions.viewEmps) {
    db.query("SELECT * from employee", (err, results) => {
      if (err) {
        console.error(err);
      } else {
        printTable(results);
      }
    });
  }
  if (answer === startingOptions.addDep) {
    inquirer.prompt(departmentInfo).then((answers) => {
      db.query(
        `INSERT INTO department (name) VALUES ('${answers.departmentName}')`,
        (err, results) => {
          if (err) {
            console.error(err);
          } else {
            console.log(
              `Successfully added '${answers.departmentName}' to departments table.\n`
            );
            prompt();
          }
        }
      );
    });
  }
  if (answer === startingOptions.addRole) {
    inquirer.prompt(roleInfo).then((answers) => {
      db.query(
        `INSERT INTO role (title, salary, department_id) VALUES ('${answers.roleTitle}', ${answers.roleSalary}, ${answers.roleDepartment}),`,
        (err, results) => {
          if (err) {
            console.error(err);
          } else {
            console.log(
              `Successfully added '${answers.roleTitle}' to departments table.\n`
            );
            prompt();
          }
        }
      );
    });
  }
  if (answer === startingOptions.addEmp) {
    inquirer.prompt(departmentInfo).then((answers) => {
      db.query(
        `INSERT INTO department (name) VALUES ('${answers.departmentName}')`,
        (err, results) => {
          if (err) {
            console.error(err);
          } else {
            console.log(
              `Successfully added '${answers.departmentName}' to departments table.\n`
            );
            prompt();
          }
        }
      );
    });
  }
}
