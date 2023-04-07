const mainMenuOptions = {
  viewEmps: "View All Employees",
  addEmp: "Add Employee",
  updateEmp: "Update Employee role",
  viewRoles: "View All Roles",
  addRole: "Add Role",
  viewDeps: "View All Departments",
  addDep: "Add Department",
  exit: "🚪 Exit",
};

const mainMenu = {
  type: "list",
  name: "mainMenu",
  message: "What would you like to do?",
  choices: [
    mainMenuOptions.viewEmps,
    mainMenuOptions.addEmp,
    mainMenuOptions.updateEmp,
    mainMenuOptions.viewRoles,
    mainMenuOptions.addRole,
    mainMenuOptions.viewDeps,
    mainMenuOptions.addDep,
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
  const departments = rows.map((row) => {
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
      choices: departments,
    },
  ];
};

const addEmployee = async (db) => {
  const [empRows] = await db.promise().query("SELECT * FROM employee");
  const [roleRows] = await db.promise().query("SELECT * FROM role");

  const employees = empRows.map((row) => {
    return { name: `${row.first_name} ${row.last_name}`, value: row.id };
  });

  let roles = roleRows.map((row) => {
    return { name: row.title, value: row.id };
  });

  employees.push({ name: "NONE", value: null });

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
      choices: roles,
    },
    {
      type: "list",
      name: "employeeManager",
      message: "Manager?",
      choices: employees,
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
