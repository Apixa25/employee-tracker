// required dependencies 
const inquirer = require("inquirer");
const mysql = require("mysql2");

// connect to MySQL
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306, // i currently have no idea why this is the only port I can get to work?
    user: "root",
    password: "password",
    database: "eTrack_db",
});

// connect to the database
connection.connect((err) => {
    if (err) throw err;
    console.log("Congratulations your onnected to the database! On Port 3306");
    start();
});

// this starts inquirer to begin asking the user questions
function start() {
    inquirer
        .prompt({
            type: "list",
            name: "action",
            message: "Choose an action",
            choices: [
                "View all Employees",
                "Add Employee",
                "View All Roles",
                "Update Employee Role",
                "Add a Role",
                "View all Departments",
                "Add a Department",
                "Exit"
                
            ]
        })
        .then((answer) => {
            switch (answer.action) {
                case "View all Employees":
                    viewAllEmployees();
                    break;
                    case "Add Employee":
                        addEmployee();
                        break;
                    case "View all Roles":
                        allRoles();
                        break;
                    case "Update Employee Role":
                        updateEmployeeRole();
                        break;
                    case "Add a Role":
                        addARole();
                        break;
                    case "View all Departments":
                        viewAllDepartments();
                        break;
                    case "Add a Department":
                        addADepartment();
                        break;
                    case "Exit":
                        connection.end();
                        console.log("Thank you have a great day!");
                        break;
            }
        });
}
// function to view all employees
function viewAllEmployees() {
    const query = `
    SELECT e.id, e.first_name, e.last_name, r.title, 
    d.department_name, r.salary, CONCAT(m.first_name, ' ', m.last_name) 
    As manager_name
    FROM employee e
    LEFT JOIN roles r ON e.role_id = r.id
    LEFT JOIN departments d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id;
    `;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}
// function to view all roles in the company
function allRoles() {
    const query = "SELECT roles.title, roles.id, departments.department_name, roles.salary from roles join departments on roles.department_id = departments.id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });

}
// function to add employee
function addEmployee() {
    // give the new employee a role
    connection.query("SELECT id, title FROM roles", (error, results) => {
        if (error) {
            console.error(error);
            return;
        }
        const roles = results.map(({ id, title }) => ({
            name: title,
            value: id,
        }));
        // from the existing managers you can give the new employee a manager
        connection.query(
            'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee',
            (error, results) => {
                if (error) {
                    console.error(error);
                    return;
                }
                const managers = results.map(({ id, name }) => ({
                    name,
                    value: id,
                }));
                // enter the new employees info
                inquirer
                    .prompt([
                        {
                            type: "input",
                            name: "firstName",
                            message: "Enter the employee's first name:",
                        },
                        {
                            type: "input",
                            name: "lastName",
                            message: "Enter the employee's last name:",
                        },
                        {
                            type: "list",
                            name: "roleId",
                            message: "Select the employee role:",
                            choices: roles,
                        },
                        {
                            type: "list",
                            name: "managerId",
                            message: "Select the employee manager:",
                            choices: [
                                { name: "None", value: null },
                                ...managers,
                            ],
                        },
                    ])
                    .then((answers) => {
                        // Insert the employee into the database
                        const sql =
                            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                        const values = [
                            answers.firstName,
                            answers.lastName,
                            answers.roleId,
                            answers.managerId,
                        ];
                        connection.query(sql, values, (error) => {
                            if (error) {
                                console.error(error);
                                return;
                            }
                            console.log("Employee added successfully");
                            start();
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        );
    });
}
// function to view all departments
function viewAllDepartments() {
    const query = "SELECT * FROM departments";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        // restart the application
        start();
    });
}
