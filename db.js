const mysql = require("mysql2");

const conn = mysql.createConnection({
    // Completar con los datos de la conexión
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "spoticfy"
});

conn.connect((err) => {
    if (err) return console.log("Error Connecting to DB");
    console.log("> Connected to database");
})

module.exports = conn;
