const mysql = require('mysql2/promise');

async function connectDB() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'tesstdb'
    });

    console.log('Conectado a MySQL (Promesas)');

    const [rows] = await connection.execute('SELECT * FROM usuarios');
    console.log('Usuarios:', rows);

    await connection.end();
  } catch (error) {
    console.error('Error en la conexión:', error);
  }
}

connectDB();
