const mysql = require("mysql2");
const fs = require("fs").promises;
const path = require("path");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "thisismypassword",
  database: "employee_db",
  multipleStatements: true,
});

async function initializeDB() {
  console.log("💢", path.join(__dirname, "../db/schema.sql"));
  try {
    const schemaSql = await fs
      .readFile(path.join(__dirname, "../db/schema.sql"))
      .then((response) => {
        console.log("🧪", response.toString());
        return response.toString();
      });

    const seedSql = await fs
      .readFile(path.join(__dirname, "../db/seed.sql"))
      .then((response) => {
        console.log("🧪", response.toString());
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

module.exports = { initializeDB, db };
