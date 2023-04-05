const mysql = require("mysql2");
const fs = require("fs").promises;
const path = require("path");

const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: "thisismypassword",
    database: "employee_db",
    multipleStatements: true,
  },
  console.log("🔌 Connected to the employee_db database.")
);

async function initializeDB() {
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

const getDepartments = new Promise((resolve, reject) => {
  db.query("SELECT * from department", (err, results) => {
    if (err) {
      console.error(err);
      reject("issue getting departments");
    } else {
      console.log(results);
      resolve(results.toString());
    }
  });
});

module.exports = { initializeDB, db, getRoles, getManagers, getDepartments };
