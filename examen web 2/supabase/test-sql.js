const { sql, pool } = require('./config/sqlserver');

async function testConnection() {
    try {
        console.log('Intentando conexión...');
        
        // Intentar una consulta simple
        const result = await pool.request()
            .query('SELECT @@version as sql_version');
            
        console.log('¡Conexión exitosa!');
        console.log('Versión de SQL Server:', result.recordset[0].sql_version);
        
        // Intentar listar las bases de datos
        const dbs = await pool.request()
            .query('SELECT name FROM sys.databases');
            
        console.log('\nBases de datos disponibles:');
        dbs.recordset.forEach(db => console.log(db.name));
        
    } catch (err) {
        console.error('\nError detallado:');
        console.error('Mensaje:', err.message);
        console.error('Código:', err.code);
        console.error('Nombre:', err.name);
        console.error('Stack:', err.stack);
    }
}

testConnection();
