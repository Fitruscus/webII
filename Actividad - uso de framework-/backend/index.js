const mssql = require("mssql");
const express = require("express");
const cors = require("cors");

const anuel= express();
anuel.use(cors());
anuel.use(express.json());

const config = {
    user: 'sa',
    password: '123456',
    server: 'DESKTOP-9CJC069',
    database: 'BibliotecaDB',
    port: 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true,
        trustConnection: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
}
let spawningPool = new mssql.ConnectionPool(config);
const conectDB = async () => {
    try {
        console.log('Intentando conectar...');
        await spawningPool.connect();
        console.log("Conectado a la base de datos");
    } catch (error) {
        console.error('Error de conexión:', error);
        console.error('Mensaje de error:', error.message);
        console.error('Código de error:', error.code);
        console.error('Stack trace:', error.stack);
    }
}
anuel.get('/api/libros', async (req, res) => {
    try {
        const result = await spawningPool.request().query('SELECT * FROM Libros');
        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los libros');
    }
});
anuel.post('/api/libros', async (req, res) => {
    const {titulo,autor,anio}=req.body;
    if(!titulo || !autor || !anio) {
        return res.status(400).send('Faltan datos');

    }
    try{
        await spawningPool.request()
        .input('titulo', mssql.VarChar, titulo)
        .input('autor', mssql.VarChar, autor)
        .input('anio', mssql.Int, anio)
        .query('INSERT INTO Libros (titulo, autor, anio) VALUES (@titulo, @autor, @anio)');
    }
    catch (error) {
        console.error(error);
        return res.status(500).send('Error al insertar el libro');
    }
});
anuel.put('/api/libros/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, autor, anio } = req.body;
    if (!titulo || !autor || !anio) {
        return res.status(400).send('Faltan datos');
    }
    try {
        await spawningPool.request()
            .input('id', mssql.Int, id)
            .input('titulo', mssql.VarChar, titulo)
            .input('autor', mssql.VarChar, autor)
            .input('anio', mssql.Int, anio)
            .query('UPDATE Libros SET titulo=@titulo, autor=@autor, anio=@anio WHERE id=@id');
        res.send('Libro actualizado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el libro');
    }
});
anuel.delete('/api/libros/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await spawningPool.request()
            .input('id', mssql.Int, id)
            .query('DELETE FROM Libros WHERE id=@id');
        res.send('Libro eliminado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el libro');
    }
});

// Ruta de prueba para verificar la estructura de la base de datos
anuel.get('/api/test', async (req, res) => {
    try {
        const result = await spawningPool.request().query("SELECT * FROM sys.tables WHERE name = 'Libros'");
        if (result.recordset.length > 0) {
            res.json({
                success: true,
                message: 'Tabla Libros encontrada',
                tableExists: true
            });
        } else {
            res.json({
                success: true,
                message: 'Tabla Libros no encontrada',
                tableExists: false
            });
        }
    } catch (error) {
        console.error('Error en la consulta de prueba:', error);
        res.status(500).json({
            success: false,
            message: 'Error al verificar la tabla',
            error: error.message
        });
    }
});
const port = 3000;
anuel.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    conectDB();
});