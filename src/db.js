const mysql = require("mysql2/promise");
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

async function getRoles() {
  let roles = [];
  await db.query("SELECT * from department", (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.log("sdjlhkfgsdjkhfghsdk");
      roles = results;
    }
  });
  return roles;
}

function getManagers() {}

function getDepartments() {}

module.exports = { initializeDB, db, getRoles, getManagers, getDepartments };
