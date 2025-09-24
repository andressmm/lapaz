
<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


    include('conexion.php');

// Consulta SQL para obtener todos los resultados (sin paginación)
$query = "SELECT nro, apellido, nombre, ciudad, grupo,categoria, estado, grupo 
          FROM inscripciones 
          WHERE evento = '$evento'  
          ORDER BY apellido ASC";

$result = mysqli_query($link, $query);

// Verifica si hay resultados
if (mysqli_num_rows($result) > 0) {
    // Crear un array para almacenar los datos
    $participantes = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $participantes[] = $row;
    }
    
    // Devuelve los resultados como JSON
    echo json_encode($participantes);
} else {
    // No hay más resultados
    echo json_encode([]);
}
$result->free();

$link->close();

?>
