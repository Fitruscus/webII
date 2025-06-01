
## Iniciar el Servidor

Para iniciar el servidor JSON, ejecutar el siguiente comando en la terminal:
```bash
json-server --watch "Base de datos/cine_bd.json" --port 3000
```

## Endpoints Disponibles

- `http://localhost:3000/cliente`
- `http://localhost:3000/sala`
- `http://localhost:3000/pelicula`
- `http://localhost:3000/asignacion`
- `http://localhost:3000/boleto`

## Estructura de Datos

El archivo `cine_bd.json` contiene las siguientes tablas:
- `cliente`: Información de los clientes
- `sala`: Detalles de las salas de cine
- `pelicula`: Datos de las películas
- `asignacion`: Asignación de películas a salas
- `boleto`: Boletos vendidos
