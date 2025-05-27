<?php
require_once '../config/database.php';

class BoletosController {
    // Obtener todos los boletos
    public function obtenerBoletos() {
        $sql = "SELECT b.*, c.nombre as cliente_nombre, f.horario, p.titulo 
                FROM boletos b 
                JOIN clientes c ON b.cliente_id = c.id 
                JOIN funciones f ON b.funcion_id = f.id 
                JOIN peliculas p ON f.pelicula_id = p.id";
        $result = ejecutarConsulta($sql);
        return obtenerFilas($result);
    }

    // Obtener boletos por cliente
    public function obtenerBoletosPorCliente($cliente_id) {
        $sql = "SELECT b.*, f.horario, p.titulo, s.nombre as sala_nombre 
                FROM boletos b 
                JOIN funciones f ON b.funcion_id = f.id 
                JOIN peliculas p ON f.pelicula_id = p.id 
                JOIN salas s ON f.sala_id = s.id 
                WHERE b.cliente_id = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "i", $cliente_id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return obtenerFilas($result);
    }

    // Crear un nuevo boleto
    public function crearBoleto($funcion_id, $cliente_id, $asiento, $precio) {
        $sql = "INSERT INTO boletos (funcion_id, cliente_id, asiento, precio) VALUES (?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "iids", $funcion_id, $cliente_id, $precio, $asiento);
        return mysqli_stmt_execute($stmt);
    }

    // Verificar disponibilidad de asiento
    public function verificarAsientoDisponible($funcion_id, $asiento) {
        $sql = "SELECT * FROM boletos 
                WHERE funcion_id = ? 
                AND asiento = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "is", $funcion_id, $asiento);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return mysqli_num_rows($result) == 0;
    }

    // Obtener boletos por función
    public function obtenerBoletosPorFuncion($funcion_id) {
        $sql = "SELECT b.*, c.nombre as cliente_nombre 
                FROM boletos b 
                JOIN clientes c ON b.cliente_id = c.id 
                WHERE b.funcion_id = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "i", $funcion_id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return obtenerFilas($result);
    }

    // Obtener cantidad de boletos vendidos por función
    public function obtenerCantidadBoletosVendidos($funcion_id) {
        $sql = "SELECT COUNT(*) as cantidad 
                FROM boletos 
                WHERE funcion_id = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "i", $funcion_id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $row = obtenerFilas($result)[0];
        return $row ? $row['cantidad'] : 0;
    }
}
?>
