const inquirer = require("inquirer");
const mysql = require("mysql2");

// connect to MySQL
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "eTrack_db",
});

// connect to the database
connection.connect((err) => {
    if (err) throw err;
    console.log("Congratulations your onnected to the database! On Port 3306");
});

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
        .then
}