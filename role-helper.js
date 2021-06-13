
const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  viewAllRoles() {
    return this.connection.query(
      `SELECT role.id, role.title, role.salary, department.name 
            FROM role 
            LEFT JOIN department ON role.department_id = department.id`
    );
  }

 
  createRole(role) {
    return this.connection.query(`INSERT INTO role SET ?`, role);
  }


  updateEmployeeRole(employeeId, roleId) {
    return this.connection.query(
      `UPDATE employee SET role_id = ${roleId} 
            WHERE id = ${employeeId}`
    );
  }

  updateEmployeeDepartment(employeeId, roleId) {
    return this.connection.query(
      `UPDATE employee SET department_id = ${roleId} 
            WHERE id = ${employeeId}`
    );
  }


  removeRole(roleId) {
    return this.connection.query(
      `DELETE FROM role
            WHERE id = ${roleId}`
    );
  }
}

module.exports = new DB(connection);
