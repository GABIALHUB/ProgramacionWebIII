const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tesstdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function getUsers() {
  try {
    const connection = await pool.getConnection();
    console.log('Conectado a MySQL (Pool de Conexiones)');

    const [rows] = await connection.query('SELECT * FROM usuarios');
    console.log('Usuarios:', rows);

    connection.release(); // Liberar conexión
  } catch (error) {
    console.error('Error en la conexión:', error);
  }
}

getUsers();
