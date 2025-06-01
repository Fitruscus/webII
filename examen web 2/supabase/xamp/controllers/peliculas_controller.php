<?php
require_once '../config/database.php';

class PeliculasController {
    // Obtener todas las películas
    public function obtenerPeliculas() {
        $sql = "SELECT * FROM peliculas";
        $result = ejecutarConsulta($sql);
        return obtenerFilas($result);
    }

    // Obtener una película por ID
    public function obtenerPelicula($id) {
        $sql = "SELECT * FROM peliculas WHERE id = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "i", $id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return obtenerFilas($result)[0] ?? null;
    }

    // Crear una nueva película
    public function crearPelicula($titulo, $genero, $duracion, $clasificacion, $sinopsis) {
        $sql = "INSERT INTO peliculas (titulo, genero, duracion, clasificacion, sinopsis) VALUES (?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "ssiss", $titulo, $genero, $duracion, $clasificacion, $sinopsis);
        return mysqli_stmt_execute($stmt);
    }

    // Actualizar una película
    public function actualizarPelicula($id, $titulo, $genero, $duracion, $clasificacion, $sinopsis) {
        $sql = "UPDATE peliculas SET titulo = ?, genero = ?, duracion = ?, clasificacion = ?, sinopsis = ? WHERE id = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "ssissi", $titulo, $genero, $duracion, $clasificacion, $sinopsis, $id);
        return mysqli_stmt_execute($stmt);
    }

    // Eliminar una película
    public function eliminarPelicula($id) {
        $sql = "DELETE FROM peliculas WHERE id = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "i", $id);
        return mysqli_stmt_execute($stmt);
    }
}
?>
