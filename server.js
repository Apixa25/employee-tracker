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
                    case "View all roles":
                        viewAllRoles();
                        break;
                    case "Add Employee":
                        addEmployee();
                        break;
                    case "View all Roles":
                        viewAllRoles();
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
                    case "EXIT":
                        connection.end();
                        console.log("Thank you have a great day!");
                        break;
            }
        });
}