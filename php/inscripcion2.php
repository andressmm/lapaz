<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
include('conexion.php');
// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Incluir conexión a base de datos (ajusta la ruta según tu estructura)
// include('./config/database.php'); 

$response = [
    'success' => false,
    'data' => null,
    'message' => '',
    'inscripcion_habilitada' => false,
    'usuario_ya_inscrito' => false,
    'transferencia' => false
];

try {
    // Obtener configuración del evento
    $cons = "SELECT inscripcion, mensaje FROM eventos WHERE id='$evento'";
    $consulta = mysqli_query($link, $cons);
    $row = mysqli_fetch_array($consulta);
    $habilitado = $row['inscripcion'];
    $mensaje = $row['mensaje'];

    // Obtener DNI
    $dni = '998877996633'; // Default
    if (isset($_POST['dni'])) {
        $dni_recibido = $_POST['dni'];
        $dni = htmlspecialchars($dni_recibido, ENT_QUOTES, 'UTF-8');
    }

    $dnie = encrypt_decrypt('encrypt', $dni);

    // Verificar si ya está inscrito
    $query = "SELECT * FROM inscripciones WHERE dni = ? AND evento = ?";
    $stmt = $link->prepare($query);
    $stmt->bind_param('ss', $dni, $evento);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $response['usuario_ya_inscrito'] = true;
        $response['redirect_url'] = 'index.html';
        $response['encrypted_dni'] = $dnie;
        echo json_encode($response);
        exit;
    }

    // Verificar transferencia
    $transferencia = 'no';
    $codigotrf = '';
    if (isset($_POST['criptedcode'])) {
        $habilitado = 'si';
        $transferencia = 'si';
        $codigotrf = $_POST['criptedcode'];
    }

    $response['transferencia'] = ($transferencia === 'si');
    $response['codigo_transferencia'] = $codigotrf;

    // Si inscripciones no están habilitadas
    if ($habilitado !== "si") {
        $response['inscripcion_habilitada'] = false;
        $response['message'] = $mensaje;
        echo json_encode($response);
        exit;
    }

    $response['inscripcion_habilitada'] = true;

    // Buscar datos existentes del participante
    $stmt = $link->prepare("SELECT * FROM participantes WHERE dni = ?");
    $stmt->bind_param("s", $dni);
    $stmt->execute();
    $result = $stmt->get_result();
    $participante = $result->fetch_assoc();
    $stmt->close();

    $datos_existentes = false;
    if ($participante) {
        $datos_existentes = true;
        
        // Convertir fecha de nacimiento
        if (!empty($participante['nac'])) {
            $date = DateTime::createFromFormat('d/m/Y', $participante['nac']);
            if ($date) {
                $participante['nac_formatted'] = $date->format('Y-m-d');
            } else {
                $participante['nac_formatted'] = '';
            }
        } else {
            $participante['nac_formatted'] = '';
        }
    } else {
        // Datos vacíos para nuevo participante
        $participante = [
            'id' => '',
            'nombre' => '',
            'apellido' => '',
            'sexo' => '',
            'ciudad' => '',
            'provincia' => '',
            'pais' => '',
            'nac_formatted' => ''
        ];
    }

    $response['success'] = true;
    $response['datos_existentes'] = $datos_existentes;
    $response['participante'] = $participante;
    $response['dni'] = $dni;

} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = 'Error interno del servidor: ' . $e->getMessage();
}

echo json_encode($response);
?>