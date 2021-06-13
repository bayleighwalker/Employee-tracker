
const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }


  viewAllEmployees() {
    return this.connection.query(
      `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(e_mng.first_name, ' ' , e_mng.last_name) AS manager
            FROM employee 
            LEFT JOIN role ON role.id = employee.role_id 
            LEFT JOIN department ON department.id = role.department_id
            LEFT JOIN employee AS e_mng ON e_mng.id = employee.manager_id`
    );
  }

  removeEmployee(employeeId) {
    return this.connection.query(
      `DELETE FROM employee
            WHERE id = ${employeeId}`
    );
  }
}

  module.exports = new DB(connection);