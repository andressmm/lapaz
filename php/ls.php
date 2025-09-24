<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if (isset($_POST['tlpID'])) {
    $tlpID = $_POST['tlpID'];
    // Ahora puedes usar el valor en tu lógica PHP

    include('crypt.php');
    include('conexion.php');

    
    $dni= htmlentities(encrypt_decrypt('decrypt', $tlpID));


    $idencriptado=encrypt_decrypt('encrypt', $tlpID);



$consulta="SELECT id,nombre,apellido,nac,estado,grupo,categoria,talle,campolibre,deslinde,sexo,importe,codigotr,elite FROM inscripciones WHERE dni='$dni' and evento='$evento'";
$result=mysqli_query($link,$consulta);


$consulta="SELECT distancia FROM distancias WHERE evento='$evento'";
$distancias=mysqli_query($link,$consulta);

$resultados = array();

// Recorrer los resultados y guardarlos en el array
while ($fila = mysqli_fetch_assoc($distancias)) {
    $resultados[] = $fila;
}

$datos=array();

// Verificar si la consulta devolvió resultados
if ($result->num_rows > 0) { // si el participante esta registrado al evento, recupero sus datos en un array
  
    while ($fila = $result->fetch_assoc()) {
        
        $grupo=$fila['grupo'];
        $nac=substr($fila['nac'], 6, 4);

        $fila['id2']=encrypt_decrypt('encrypt',$fila['id']);
        

        
 

        $consulta2="SELECT costo,fechafin,financiado,cantcuotas,venc1 FROM distancias WHERE distancia='$grupo' and evento='$evento'";
        $result2=mysqli_query($link,$consulta2);
        $row=mysqli_fetch_array($result2);
        $fila['precio']=$row['costo'];
        $fila['venc']=$row['fechafin'];
        $fila['financiado']=$row['financiado'];
        $fila['venc2']=$row['venc1'];
        $fila['cuotas']=$row['cantcuotas'];
        $fila['evento']=$evento;
        $fila['distancias']=$resultados;
        $fila['ano']=$nac;
        
        
        $consulta3="SELECT banco,titular,cbu,cuit,alias,computable FROM eventos WHERE id='$evento'";
        $result3=mysqli_query($link,$consulta3);
        $row2=mysqli_fetch_array($result3);
        $fila['banco']=$row2['banco'];
        $fila['titular']=$row2['titular'];
        $fila['cbu']=$row2['cbu'];
        $fila['cuit']=$row2['cuit'];
        $fila['alias']=$row2['alias'];
        $fila['computable']=$row2['computable'];
        
        
        
        
        
        
        
        $datos[] = $fila;
        
        $result2->free();

        $result3->free();
                

    }

       



} else { //  si la consulta devuelve 0, entonces el array esta vacio
  

}

echo json_encode($datos); //mando el array via json

// Liberar el resultado
$result->free();
//$result->free();

// Cerrar la conexión a la base de datos
$link->close();



} 
?>