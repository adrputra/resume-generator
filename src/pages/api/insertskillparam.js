const mysql = require('mysql'); // or require('mysql2');
import data from "@/../public/data"

// Create a MySQL connection
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Your JSON data
const jsonData = data.data

// Insert each item from the JSON data array into the database
jsonData.forEach((item) => {
  const sql = 'INSERT INTO param_skill (value, label) VALUES (?, ?)';
  const values = [item.value, item.label];
  
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL database:', err);
      return;
    }
    console.log('Data inserted into MySQL database:', result);
  });
});

// Close the connection after all inserts are done
connection.end((err) => {
  if (err) {
    console.error('Error closing MySQL connection:', err);
    return;
  }
  console.log('MySQL connection closed');
});
