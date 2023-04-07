const startingOptions = {
  viewDeps: "view all departments",
  viewRoles: "view all roles",
  viewEmps: "view all employees",
  addDep: "add a department",
  addRole: "add a role",
  addEmp: "add an employee",
  updateEmp: "update an employee role",
  exit: "🚪 Exit",
};

const startingQuestion = {
  type: "list",
  name: "startingQuestion",
  message: "What would you like to do?",
  choices: [
    startingOptions.viewDeps,
    startingOptions.viewRoles,
    startingOptions.viewEmps,
    startingOptions.addDep,
    startingOptions.addRole,
    startingOptions.addEmp,
    startingOptions.updateEmp,
    startingOptions.exit,
  ],
};

const departmentInfo = {
  type: "input",
  name: "departmentName",
  message: "What's the name of the dept you'd like to add?",
};

const roleInfo = async (db) => {
  const [rows] = await db.promise().query("SELECT * FROM department");
  const convertedRows = rows.map((row) => {
    return { name: row.name, value: row.id };
  });
  console.log("departments:", rows);
  return [
    {
      type: "input",
      name: "roleTitle",
      message: "What's the name of the role you'd like to add?",
    },
    {
      type: "input",
      name: "roleSalary",
      massage: "What's the salary?",
    },
    {
      type: "list",
      name: "roleDepartment",
      message: "Which department does this role belong to?",
      choices: convertedRows,
    },
  ];
};

const employeeInfo = async (db) => {
  const [empRows] = await db.promise().query("SELECT * FROM employee");
  const [roleRows] = await db.promise().query("SELECT * FROM role");

  const convertedEmpRows = empRows.map((row) => {
    return { name: `${row.first_name} ${row.last_name}`, value: row.id };
  });

  let convertedRoleRows = roleRows.map((row) => {
    return { name: row.title, value: row.id };
  });

  convertedEmpRows.push({ name: "NONE", value: null });

  return [
    {
      type: "input",
      name: "employeeFirstName",
      message: "What's the first name of the employee?",
    },
    {
      type: "input",
      name: "employeeLastName",
      message: "Last name?",
    },
    {
      type: "list",
      name: "employeeRole",
      message: "Role?",
      choices: convertedRoleRows,
    },
    {
      type: "list",
      name: "employeeManager",
      message: "Manager?",
      choices: convertedEmpRows,
    },
  ];
};

const updateEmployeeInfo = async (db) => {
  const [empRows] = await db.promise().query("SELECT * FROM employee");
  const [roleRows] = await db.promise().query("SELECT * FROM role");

  const convertedEmpRows = empRows.map((row) => {
    return { name: `${row.first_name} ${row.last_name}`, value: row.id };
  });

  const convertedRoleRows = roleRows.map((row) => {
    return { name: row.title, value: row.id };
  });

  return [
    {
      type: "list",
      name: "employee",
      message: "Employee?",
      choices: convertedEmpRows,
    },
    {
      type: "list",
      name: "employeeRole",
      message: "Role?",
      choices: convertedRoleRows,
    },
  ];
};

module.exports = {
  startingQuestion,
  departmentInfo,
  roleInfo,
  employeeInfo,
  updateEmployeeInfo,
  startingOptions,
};
