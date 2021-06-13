

class DB {
  constructor(connection) {
    this.connection = connection;
  }

 
  viewAllEmployeesByDepartment(departmentId) {
    return this.connection.query(
      `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            WHERE department.id = ${departmentId}`
    );
  }

 
  viewAllDepartments() {
    return this.connection.query(
      `SELECT department.id, department.name, SUM(role.salary) AS utilized_budget 
            FROM department 
            LEFT JOIN role ON role.department_id = department.id 
            LEFT JOIN employee ON employee.role_id = role.id 
            GROUP BY department.id, department.name`
    );
  }

  createDepartment(department) {
    return this.connection.query(`INSERT INTO department SET ?`, department);
  }

 
  removeDepartment(departmentId) {
    return this.connection.query(
      `DELETE FROM department
            WHERE id = ${departmentId}`
    );
  }
}

module.exports = new DB(connection);
