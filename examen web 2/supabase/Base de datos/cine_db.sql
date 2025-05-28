-- Crear tabla clientes
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100),
    telefono VARCHAR(20)
);

-- Crear tabla películas
CREATE TABLE peliculas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200),
    genero VARCHAR(50),
    duracion INTEGER,
    clasificacion VARCHAR(10),
    sinopsis TEXT
);

-- Crear tabla salas
CREATE TABLE salas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    capacidad INTEGER,
    tipo VARCHAR(20),
    descripcion TEXT
);

-- Crear tabla funciones
CREATE TABLE funciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pelicula_id INTEGER,
    sala_id INTEGER,
    horario TIMESTAMP,
    FOREIGN KEY (pelicula_id) REFERENCES peliculas(id),
    FOREIGN KEY (sala_id) REFERENCES salas(id)
);

-- Crear tabla boletos
CREATE TABLE boletos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    funcion_id INTEGER,
    cliente_id INTEGER,
    asiento VARCHAR(10),
    precio DECIMAL(10,2),
    FOREIGN KEY (funcion_id) REFERENCES funciones(id),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- Crear tabla asignaciones
CREATE TABLE asignacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_sala VARCHAR(50),
    nombre_pelicula VARCHAR(200),
    fecha DATE,
    horario_entrada_pelicula TIME,
    boletos_disponibles INTEGER
);
