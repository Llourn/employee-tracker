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

const employeeInfo = [
  {
    input: "input",
    name: "employeefirstName",
    message: "What's the first name of the employee?",
  },
  {
    input: "input",
    name: "employeelastName",
    message: "Last name?",
  },
  {
    input: "list",
    name: "employeeRole",
    message: "Role?",
    choices: [],
  },
  {
    input: "list",
    name: "employeeManager",
    message: "Manager?",
    choices: [],
  },
];

module.exports = {
  startingQuestion,
  departmentInfo,
  roleInfo,
  employeeInfo,
  startingOptions,
};
