<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Manejar preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include('conexion.php');
include('crypt.php');

if (isset($_POST['dni'])) {
    $dni = $_POST['dni'];

}




// si el evento esta habilitado...
$cons="SELECT inscripcion,mensaje from eventos where id='$evento'";
$consulta=mysqli_query($link,$cons);
$row=mysqli_fetch_array($consulta);
$habilitado=$row['inscripcion'];
$mensaje=$row['mensaje'];
$habilitado = ($habilitado == 'si') ? "abierto" : "cerrado";



// busco participante... 
$cons="SELECT dni from inscripciones where dni='$dni' and evento='$evento'";
$consulta=mysqli_query($link,$cons);




if (mysqli_num_rows($consulta) > 0) {

 // si ya estaba inscripto...

    $estado='inscripto';
    $row = mysqli_fetch_array($consulta);
    $info=encrypt_decrypt('encrypt', $row['dni']);
} else {

    // si no estaba inscripto...



    $cons="SELECT apellido,nombre,dni,sexo,nac,ciudad,provincia,pais from participantes where dni='$dni'";
$consulta=mysqli_query($link,$cons);

$info= mysqli_fetch_assoc($consulta);



    $estado='inscribir';
   
}


if ($habilitado=='cerrado' and $estado=='inscripto'){
    $estado='inscripto';
}

if ($habilitado=='cerrado' and $estado=='inscribir'){
    $estado='cerrado';
    $info='';
}


echo json_encode([
        'estado' => $estado,
        'info' => $info,
        'mensaje' => $mensaje
    ]);




mysqli_close($link);
?>