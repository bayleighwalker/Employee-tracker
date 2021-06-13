// importing npm inquirer dependencies
const inquirer = require("inquirer");
const { prompt } = require("inquirer");

// importing helper files from src folder
const dbRole = require("./src/role-helper");
const dbEmployee = require("./src/employee-helper");
const dbDepartment = require("./src/department-helper");


const team = [];

startPrompts();


async function startPrompts() {
  const { choice } = await prompt([
    {
      name: "choice",
      type: "list",
      message: "What would you like do?",
      choices: [
        new inquirer.Separator(
          "|-----------------Adding----------------------------|"
        ),
        {
          name: "Adding Department",
          value: "1",
        },
        {
          name: "Adding Roles",
          value: "2",
        },
        {
          name: "Adding Employee",
          value: "3",
        },
        new inquirer.Separator(
          "|-----------------Viewing---------------------------|"
        ),
        {
          name: "Viewing All Departments",
          value: "4",
        },
        {
          name: "Viewing All Employees",
          value: "5",
        },
        {
          name: "Viewing All Roles",
          value: "6",
        },
        {
          name: "Viewing All Employees By Department",
          value: "7",
        },
        {
          name: "Viewing All Employees By Manager",
          value: "8",
        },
        new inquirer.Separator(
          "|-----------------Updating--------------------------|"
        ),
        {
          name: "Updating an Employee Role",
          value: "9",
        },
        {
          name: "Updating an Employee's Manager",
          value: "10",
        },
        {
          name: "Updating an Employee's Department",
          value: "15",
        },
        new inquirer.Separator(
          "|-----------------Removing--------------------------|"
        ),
        {
          name: "Removing Department",
          value: "11",
        },
        {
          name: "Removing Employee",
          value: "12",
        },
        {
          name: "Removing Roles",
          value: "13",
        },
        new inquirer.Separator(
          "|-----------------Exciting--------------------------|"
        ),
        {
          name: "Exit",
          value: "14",
        },
      ],
    },
  ]);
  switch (choice) {
    case "1":
      return addDepartment();
    case "2":
      return addRole();
    case "3":
      return addEmployee();
    case "4":
      return viewDepartments();
    case "5":
      return viewEmployees();
    case "6":
      return viewRoles();
    case "7":
      return viewEmployeesByDepartment();
    case "8":
      return viewEmployeesByManager();
    case "9":
      return updateEmployeeRole();
    case "10":
      return updateEmployeeManager();
    case "11":
      return removeDepartment();
    case "12":
      return removeEmployee();
    case "13":
      return removeRole();
    case "15":
      return updateEmployeeDepartment();
    default:
      return quit();
  }
}


async function addRole() {
  const departments = await dbDepartment.viewAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  const role = await prompt([
    {
      name: "title",
      message: "What is the name of the role?",
      validate: validate,
    },
    {
      name: "salary",
      message: "What is the salary of the role?",
      validate: validate,
    },
    {
      type: "list",
      name: "department_id",
      message: "Which department does the role belong to?",
      validate: validate,
      choices: departmentChoices,
    },
  ]);

  await dbRole.createRole(role);

  console.log(`Added ${role.title} to the database`);

  startPrompts();
}

async function addEmployee() {
  const roles = await dbRole.viewAllRoles();
  const employees = await dbEmployee.viewAllEmployees();

  const employee = await prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?",
      validate: validate,
    },
    {
      name: "last_name",
      message: "What is the employee's last name?",
      validate: validate,
    },
  ]);

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { roleId } = await prompt({
    type: "list",
    name: "roleId",
    message: "What is the employee's role?",
    validate: validate,
    choices: roleChoices,
  });

  employee.role_id = roleId;

  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
    name: first_name + " " + last_name,
    value: id,
  }));

  managerChoices.unshift({
    name: "None",
    value: null,
  });

  const { managerId } = await prompt({
    type: "list",
    name: "managerId",
    message: "Who is the employee's manager?",
    validate: validate,
    choices: managerChoices,
  });
  
  employee.manager_id = managerId;

  await dbEmployee.createEmployee(employee);

  console.log(
    `Added ${employee.first_name} ${employee.last_name} to the database`
  );

  startPrompts();

}

async function removeDepartment() {
  const departments = await dbDepartment.viewAllDepartments();

  const departmentsChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  const { departmentId } = await prompt([
    {
      type: "list",
      name: "departmentId",
      message: "Which department would you like to delete?",
      validate: validate,
      choices: departmentsChoices,
    },
  ]);

  await dbDepartment.removeDepartment(departmentId);

  console.log(`Department successfully removed!`);

  startPrompts();
}

