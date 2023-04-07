const mysql = require("mysql2");
const fs = require("fs").promises;
const path = require("path");
const { printTable } = require("console-table-printer");
const { startingOptions, departmentInfo, roleInfo } = require("./questions");
const inquirer = require("inquirer");

const createConnection = async () =>
  mysql.createConnection(
    {
      host: "127.0.0.1",
      user: "root",
      password: "thisismypassword",
      database: "employee_db",
      multipleStatements: true,
      // debug: true,
    },
    console.log("🔌 Connected to the employee_db database.")
  );

async function initializeDB(db) {
  try {
    const schemaSql = await fs
      .readFile(path.join(__dirname, "../db/schema.sql"))
      .then((response) => {
        return response.toString();
      });

    const seedSql = await fs
      .readFile(path.join(__dirname, "../db/seed.sql"))
      .then((response) => {
        return response.toString();
      })
      .catch((err) => {
        console.error(err);
      });
    db.query(schemaSql);
    db.query(seedSql);
  } catch (err) {
    console.error(err);
  }
}

function getRoles() {
  let roles = [];
  db.query("SELECT * from department", (err, results) => {
    if (err) {
      console.error(err);
    } else {
      roles = results;
    }
  });
  return roles;
}

function getManagers() {}

// const getDepartments = new Promise((resolve, reject) => {
//   db.query("SELECT * from department", (err, results) => {
//     if (err) {
//       console.error(err);
//       reject("issue getting departments");
//     } else {
//       console.log(results);
//       resolve(results.toString());
//     }
//   });
// });
const handleFirstAnswer = async (answer, db) => {
  if (answer === startingOptions.viewRoles) {
    const [rows] = await db.promise().query("SELECT * FROM role");
    printTable(rows);
  }
  if (answer === startingOptions.viewDeps) {
    const [rows] = await db.promise().query("SELECT * FROM department");
    printTable(rows);
  }
  if (answer === startingOptions.viewEmps) {
    const [rows] = await db.promise().query("SELECT * FROM employee");
    printTable(rows);
  }
  if (answer === startingOptions.addDep) {
    const answers = await inquirer.prompt(departmentInfo);
    const [results] = await db
      .promise()
      .query(
        `INSERT INTO department (name) VALUES ('${answers.departmentName}')`
      );
    if (results.affectedRows > 0) {
      console.log(
        `✅ Department '${answers.departmentName}' added successfully`
      );
    }
  }
  if (answer === startingOptions.addRole) {
    console.log("adding a role");
    const answers = await inquirer.prompt(await roleInfo(db));
    console.log("answers", answers);
    const [results] = await db
      .promise()
      .query(
        `INSERT INTO role (title, salary, department_id) VALUES ('${answers.roleTitle}', ${answers.roleSalary}, ${answers.roleDepartment})`
      );
    if (results.affectedRows > 0) {
      console.log(`✅ Role '${answers.roleTitle}' added successfully`);
    }

    // inquirer.prompt(roleInfo).then((answers) => {
    //   db.query(
    //     `INSERT INTO role (title, salary, department_id) VALUES ('${answers.roleTitle}', ${answers.roleSalary}, ${answers.roleDepartment}),`,
    //     (err, results) => {
    //       if (err) {
    //         console.error(err);
    //       } else {
    //         console.log(
    //           `Successfully added '${answers.roleTitle}' to departments table.\n`
    //         );
    //       }
    //     }
    //   );
    // });
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
          }
        }
      );
    });
  }
};

module.exports = {
  initializeDB,
  createConnection,
  getRoles,
  getManagers,
  // getDepartments,
  handleFirstAnswer,
};
