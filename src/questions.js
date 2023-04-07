const mainMenuOptions = {
  viewDeps: "view all departments",
  viewRoles: "view all roles",
  viewEmps: "view all employees",
  addDep: "add a department",
  addRole: "add a role",
  addEmp: "add an employee",
  updateEmp: "update an employee role",
  exit: "🚪 Exit",
};

const mainMenu = {
  type: "list",
  name: "mainMenu",
  message: "What would you like to do?",
  choices: [
    mainMenuOptions.viewDeps,
    mainMenuOptions.viewRoles,
    mainMenuOptions.viewEmps,
    mainMenuOptions.addDep,
    mainMenuOptions.addRole,
    mainMenuOptions.addEmp,
    mainMenuOptions.updateEmp,
    mainMenuOptions.exit,
  ],
};

const addDepartment = {
  type: "input",
  name: "departmentName",
  message: "What's the name of the dept you'd like to add?",
};

const addRole = async (db) => {
  const [rows] = await db.promise().query("SELECT * FROM department");
  const convertedRows = rows.map((row) => {
    return { name: row.name, value: row.id };
  });

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

const addEmployee = async (db) => {
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

const updateEmployee = async (db) => {
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
  mainMenu,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployee,
  mainMenuOptions,
};
