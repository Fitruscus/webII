const sql = require('mssql');

require('dotenv').config();

const config = {
    server: process.env.DB_SERVER,  // Nombre del servidor
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: false,
        trustServerCertificate: true,
        port: 1433,
        requestTimeout: 5000, 
        connectTimeout: 5000
    }
};

const pool = new sql.ConnectionPool(config);

pool.connect()
    .then(() => {
        console.log('Conexión a SQL Server exitosa');
    })
    .catch(err => {
        console.error('Error al conectar a SQL Server:', err);
    });

module.exports = {
    sql,
    pool
};

pool.connect()
    .then(() => {
        console.log('Conexión a SQL Server exitosa');
    })
    .catch(err => {
        console.error('Error al conectar a SQL Server:', err);
    });

module.exports = {
    sql,
    pool
};
