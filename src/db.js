const mysql = require("mysql2");

mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "thisismypassword",
  database: "employee_db",
});
