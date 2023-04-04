const { getRoles, getManagers } = require("./db");

const firstQuestion = {
  type: "list",
  name: "firstQuestion",
  choices: [
    "view all departments",
    "view all roles",
    "view all employees",
    "add a department",
    "add a role",
    "add an employee",
    "update an employee role",
  ],
};

const departmentInfo = {
  type: "input",
  name: "departmentName",
  message: "What's the name of the dept you'd like to add?",
};

const roleInfo = [
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
    type: "input",
    name: "roleDepartment",
    message: "Which department does this role belong to?",
  },
];

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
    choices: getRoles(),
  },
  {
    input: "list",
    name: "employeeManager",
    message: "Manager?",
    choices: getManagers(),
  },
];
