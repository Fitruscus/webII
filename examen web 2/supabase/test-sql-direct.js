const sql = require('mssql');

async function testConnection() {
    try {
        console.log('Intentando conexión directa...');
        
        // Configuración directa
        const config = {
            server: 'DESKTOP-9CJC069',
            database: 'cine_db',
            user: 'sa',
            password: '1234',
            options: {
                encrypt: false,
                trustServerCertificate: true,
                port: 1433,
                requestTimeout: 5000,
                connectTimeout: 5000
            }
        };
        
        const pool = new sql.ConnectionPool(config);
        
        await pool.connect()
            .then(() => {
                console.log('¡Conexión exitosa!');
                
                // Intentar una consulta simple
                return pool.request()
                    .query('SELECT @@version as sql_version');
            })
            .then(result => {
                console.log('Versión de SQL Server:', result.recordset[0].sql_version);
            });
            
    } catch (err) {
        console.error('\nError detallado:');
        console.error('Mensaje:', err.message);
        console.error('Código:', err.code);
        console.error('Nombre:', err.name);
        console.error('Stack:', err.stack);
        
        // Intentar obtener más detalles
        if (err.code === 'ECONNREFUSED') {
            console.error('\nPosibles causas:');
            console.error('1. El servicio SQL Server no está corriendo');
            console.error('2. El servicio SQL Server Browser no está corriendo');
            console.error('3. El puerto 1433 está bloqueado');
        } else if (err.code === 'ESOCKET') {
            console.error('\nPosibles causas:');
            console.error('1. El servicio SQL Server no está configurado para TCP/IP');
            console.error('2. TCP/IP no está habilitado en SQL Server Configuration Manager');
            console.error('3. El firewall está bloqueando la conexión');
        } else if (err.code === 'ETIMEOUT') {
            console.error('\nTiempo de espera agotado. El servicio SQL Server no responde.');
        }
    }
}

testConnection();
