const mysql = require("mysql2");
const fs = require("fs").promises;
const path = require("path");
const { printTable } = require("console-table-printer");
const {
  startingOptions,
  departmentInfo,
  roleInfo,
  employeeInfo,
  updateEmployeeInfo,
} = require("./questions");
const inquirer = require("inquirer");

const createConnection = async () =>
  mysql.createConnection(
    {
      host: "127.0.0.1",
      user: "root",
      password: "thisismypassword",
      database: "employee_db",
      multipleStatements: true,
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

const handleFirstAnswer = async (answer, db) => {
  if (answer === startingOptions.viewRoles) {
    const [rows] = await db
      .promise()
      .query(
        "SELECT role.id, title, department.name as department, salary FROM role JOIN department ON department.id = role.department_id"
      );
    printTable(rows);
  }
  if (answer === startingOptions.viewDeps) {
    const [rows] = await db.promise().query("SELECT * FROM department");
    printTable(rows);
  }
  if (answer === startingOptions.viewEmps) {
    const [rows] = await db
      .promise()
      .query(
        "SELECT e.id, e.first_name, e.last_name, role.title, department.name, role.salary, CONCAT(m.first_name, ' ', m.last_name) as manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id JOIN role on role.id = e.role_id JOIN department on department.id = role.department_id;"
      );
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
  }
  if (answer === startingOptions.addEmp) {
    console.log("adding an employee");
    const answers = await inquirer.prompt(await employeeInfo(db));
    const [results] = await db
      .promise()
      .query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.employeeFirstName}', '${answers.employeeLastName}', ${answers.employeeRole}, ${answers.employeeManager})`
      );
    if (results.affectedRows > 0) {
      console.log(
        `✅ Employee '${answers.employeeFirstName} ${answers.employeeLastName}' added successfully`
      );
    }
  }
  if (answer === startingOptions.updateEmp) {
    console.log("Updating emp");
    const answers = await inquirer.prompt(await updateEmployeeInfo(db));
    const [results] = await db
      .promise()
      .query(
        `UPDATE employee SET role_id = ${answers.employeeRole}  WHERE id = ${answers.employee}`
      );
    console.log(answers.employee);
    if (results.affectedRows > 0) {
      console.log(`✅ Employee updated successfully`);
    }
  }
};

module.exports = {
  initializeDB,
  createConnection,
  handleFirstAnswer,
};
