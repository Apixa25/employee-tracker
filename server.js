const inquirer = require("inquirer");
const mysql = require("mysql2");

// connect to MySQL
const connection = mysql.createConnection({
    host: "localhost",
    port: 3001,
    user: "root",
    password: password",
    database: "employeeTracker_db",
});

// connect to the database
connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database!");
    // start the application
    start();
});
