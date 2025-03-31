 const mysql = require('mysql2');

// Conexion a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',  
    database: 'tesstdb'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado con la base de datos!');

    //consulta a la base de datos
    connection.query('SELECT * FROM usuarios', (err, results, fields) => {
        if (err) throw err;
        console.log(results); 
    });

    connection.end();  
});
