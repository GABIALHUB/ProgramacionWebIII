const mysql = require('mysql2');
const mysqlPromise = require('mysql2/promise');

async function medirConexiones() {
  console.log('⏳ Iniciando medición de tiempos...\n');

  // 🟢 1. Conexión directa (mysql2)
  const inicioDirecta = performance.now();
  const conexionDirecta = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tesstdb'
  });
  conexionDirecta.connect();
  conexionDirecta.query('SELECT * FROM usuarios', (err, results) => {
    if (err) throw err;
    console.log(`Tiempo de consulta (Directa): ${(performance.now() - inicioDirecta).toFixed(2)} ms`);
    conexionDirecta.end();
  });

  // 🔵 2. Conexión con Promesas (mysql2/promise)
  const inicioPromesas = performance.now();
  const conexionPromesa = await mysqlPromise.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tesstdb'
  });
  const [rows] = await conexionPromesa.execute('SELECT * FROM usuarios');
  console.log(`Tiempo de consulta (Promesas): ${(performance.now() - inicioPromesas).toFixed(2)} ms`);
  await conexionPromesa.end();

  // 🟠 3. Conexión con Pool de Conexiones (mysql2.createPool)
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tesstdb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  const inicioPool = performance.now();
  pool.query('SELECT * FROM usuarios', (err, results) => {
    if (err) throw err;
    console.log(`Tiempo de consulta (Pool de Conexiones): ${(performance.now() - inicioPool).toFixed(2)} ms`);
    pool.end();
  });
}

medirConexiones();
