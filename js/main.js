// leyenda "Cargando" que se mostrara mieentras se hace el fetch
const loading = document.getElementById('loading'); 



// mensajes y botones de info en caso de no estar logueado el usuario
const portada = document.querySelector('.portada');
const main=document.querySelector('main');




// div pago en verificacion
const verificando=`
         <div class="info__grupos datos_insc">
                                                            <div class="info__grupos-titulo">          
                                                                Recibimos tu comprobante y lo estamos verificando! 🔍
                                                            </div>
                                                            <div class="content">
                                                                <p>Un operador está revisando que todo está OK. Puede demorar algun tiempo. Una vez verificado el pago se habilitaran automaticamente las siguientes opciones:</p>
                                                                            <ul class="opcpago">
                                                                                <li>Impresion de deslinde o firma digital</li>
                                                                                <li>Carga de certificado medico</li>
                                                                                <li>Cambio de modalidad/distancia</li>
                                                                                <li>Transferencia de inscripcion a otra persona (si no podes participar)</li>
                                                                                <li>Pago del saldo si optaste por cuotas</li>                       
                                                                                <li>Contactarte directamente con la organizacion</li>                       
                                                                                
                                                                                </ul> 
                                                                                
                                                                </div>
                                                        </div>    
            


            `;





// funcion que muestra los elementos de portada sin logueo
const mostrarElementos = () => {
    loading.style.display = 'none';
    portada.style.display = 'block';
    
    
};


// funcion si esta logueado el user, muestro los datos
info=()=>{
    //console.log(datos[0])
    let sexo;
    let estado;
    let certificado;
    let deslinde;
   

    // verifico el sexo para el saludo y el estado de la inscripcion...
    let color;
    if (datos[0].sexo==="VARON"){ sexo="o";}else {sexo="a"; }
    if (datos[0].estado==="0"){ estado="⚠️ PENDIENTE DE PAGO"; color='red';}
    if (datos[0].estado==="1"){ estado="✅"; color='green';}
    if (datos[0].estado==="9"){ estado="VERIFICANDO EL PAGO"; color='#D3840C'; }
    if (datos[0].estado==="8"){ estado="ANTICIPO PAGADO"; color='blue';}

    // si campolibre esta vacio, muestro X. Si deslinde=no, muestro x
    if (!datos[0].campolibre){ certificado="❌";} else { certificado='✅';}
    if (datos[0].deslinde==="no"){ deslinde="❌";} else { deslinde='✅';}



    // creo elementos y cargo al DOM -> main

    const h3 = document.createElement('h3');
    h3.classList.add('saludo');
    h3.innerHTML = `Bienvenid${sexo}, que bueno verte de nuevo <span class="nombre">${datos[0].nombre} ${datos[0].apellido}</span> 😊`;
    const info = document.createElement('div');
    info.classList.add('infoinscripciones');   


     main.appendChild(h3);
     main.appendChild(info);

    let certifydeslinde;
    if (datos[0].estado!="0" && datos[0].estado!=9){
         certifydeslinde=`                    <div class="oc">
                        <p><span class="resaltado">Certificado medico cargado:</span> <span class="certificado">${certificado}</span></p>
                        <p><span class="resaltado">Deslinde firmado:</span> <span class="deslinde">${deslinde}</span></p>
                    </div>   `;
    }else { certifydeslinde='';}


    let deuda = datos[0].financiado - datos[0].importe;

    // div donde se cargaran los elementos post logueo....
    //const info = document.querySelector('.infoinscripciones');
    let tarjetas;

    tarjetas=`   
<div class="faq"> 

            <div class="info__grupos infoInsc">
                <div class="info__grupos-titulo">          
                    Info de tu inscripción 📝
                </div>
                <div class="content">
                    <p><span class="resaltado">Participante:</span> ${datos[0].nombre} ${datos[0].apellido} [${datos[0].grupo}]</p>
                                <input type='hidden' id='idcode' value='${datos[0].id}'>
                                <input type='hidden' id='comput' value='${datos[0].computable}'>

                    <p><span class="resaltado">Estado inscripcion:</span> <span class="pago" style='color:${color};'>${estado}</span></p>
                    ${certifydeslinde}
                        </div>
                    
                <div class="content"><p><span class="resaltado">🚫<a href='#' onclick='cerrar();'> <span class='subrayado'>[Cerrar Sesión]</span></span> Podrás volver a loguearte ingresando tu DNI en la opcion 'inscripcion'</a>  </p>

                    </div>
            </div>    
`;

//loading.style.display="none";
// si el estado es pago muestro las opciones para deslinde, firma digital, certificado medico, transferencia de inscripcion y cambio de distancia
if (datos[0].estado==="1" || datos[0].estado==="8" ){
//console.log(datos[0]);    
let deslinde=`<details name="desp">
            <summary>
         
                    Deslinde/Formulario inscripcion 📑
        </summary>
                <div class="content">
                    <p>Deberas presentar este documento impreso al momento de retirar tu kit, o bien, firmarlo digitalmente.</p>
                    <p>🖨️ <a href='https://www.encarrera.com.ar/pdf/deslinde.php?i=${datos[0].id2}' target='_blank'><span class='subrayado'>Imprimilo haciendo click aqui</span></a></p>
                    <p>✒️ <span class='subrayado' id='cargafirma'><a href='?i=fd&p=${datos[0].id2}'>Firmar digitalmente</a></span></p>
                    
            </div> </details>
            `;

            let certificado=`                
             <details name="desp">
            <summary>        Certificado medico 🩺
               </summary> <div class="content">
                    <p>Para poder participar es condición indispensable la presentación de un certificado medico donde conste tu aptitud fisica para realizar deportes. Debe tener una antiguedad maxima de 6 meses.</p>
                    <p>✅ <span class='subrayado' id='cargacm' onclick="mostrarDialogo()">Cargalo haciendo click aqui</span></p>
                    <p>📄 O bien, presentalo al retirar tu kit</p>
                    </div>
            </details> 
            
                                                                    <dialog id="myDialog">
                                                                        <div class="info__grupos-titulo">          
                                                                                                Cargá tu certificado medico 🩺
                                                                                            </div>
                                                                                            <div class="content">
                                                                                                <p>Subi una foto legible, escaneo o pdf del mismo. </p>
                                                                                                <p>El certificado medico debe tener una antiguedad de maximo 6 meses.</p>
                                                                                                <p>Presiona <span class="resaltado">Seleccionar archivo</span> para buscar y cargar el comprobante. Luego presioná <span class="resaltado">subir archivo</span></p>
                                                                                            
                                                                                            
                                                                                    <section class="form" id="contact">         
                                                                                                <form class="form__form" enctype="multipart/form-data" method="POST">
                                                                                                   <div class="form__input-container">
                                                                                                    <input type="file" id="fileInputcm" accept=".jpg, .jpeg, .png, .pdf" />            
                                                                                                    </div>
                                                                                                    <input type="hidden" name="idcm" id="idcm" value="${datos[0].id}"/>
                                                                                                    <div class="form__input-container">

                                                                                                            <input type="button" class="subir subir2" id="codigo" value="Subir archivo" onclick="subirArchivo('cm');">


                                                                                                    </div>
                                                                            </form>
                                                                            </section>
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                        
                                                                    <p onclick='cerrarDialogo();' class='cerrar_ventana'>Cerrar ventana</p>
                                                                      </dialog>
            
            `;



            const distancias=datos[0].distancias;
     
            const select = document.getElementById('cambiodistancia'); 
            let opciones;

distancias.forEach((dist) => {

    if (dist.distancia !== "INFANTILES (VIERNES)" && dist.distancia !== "ELITE") {
        opciones+=`<option value='${dist.distancia}'>${dist.distancia}</option>`;}
  


});


            
let elite=`
<details name="desp">
<summary class="elite">Cambiar a ELITE 🔝
</summary> <div class="content">
    <p>Desde aqui podrás solicitar el cambio a categoria ELITE.</p>
     <p>👉<a href='https://www.trialapaz.com.ar/elite.pdf' target='_blank'>Consulta aqui la información para el cambio a elite y sus implicancias</a></p>
   
                      <p><div id="estadoElite" class="trfcode"></div></p>

    <div class="form__input-container muestraCode">

                      
<input type="button" class="subir subir2" id="cambioelite" value="CAMBIARME A ELITE" onclick="cambiarElite()">
</div>    </div>    

    </details>

`;










            let cambiodist=`                
            <details name="desp">
           <summary id='cambioDist'>Cambio de modalidad / distancia 🔄
              </summary> <div class="content">
                   <p>Hasta el 15/12/2024 podrás cambiar la modalidad / distancia en la que participas.</p>
                   <p>Tu modalidad actual: <span class="resaltado">${datos[0].grupo}</span></p>
                   <p>Tu categoria actual: <span class="resaltado">${datos[0].categoria}</span></p>
                   <p>Quiero cambiar a...
                   <select id="selectchangedst" name='cambiodistancia' style="border:1px solid #48e;">
                                                <option value='' disabled selected>SELECCIONAR</option>
            ${opciones}
                    </select>
                   </p>
                   
                  <div class="form__input-container muestraCode">

                                    
        <input type="button" class="subir subir2" id='confirmacambio' value="Confirmar cambio" onclick="changedst()">
    </div>        
                   </div>

           </details> `;
     


           let trfins=`                
           <details name="desp">
          <summary>Transferir tu inscripción 👤➡️👤
             </summary> <div class="content">
                  <p>Si no podes participar del evento, transferi tu inscripcion a un tercero.</p>
                  <p>La organización no interviene ni tampoco mediará en el intercambio, el cual corre por cuenta exclusiva tuya y de tu reemplazo.</p>
                  <p>En caso de detectar irregularidades, el cupo será dado de baja sin lugar a reclamo alguno, perdiendo ambas partes la posibilidad de participar, y por ende, perdiendo el dinero abonado por la inscripción.</p>
                  <p>Para la transferencia se genera un <span class="resaltado">codigo aleatorio unico asociado a tu inscripción</span>. <br><br>Este codigo, deberás comunicarlo a tu reemplazo quien deberá ingresar a la opcion <span class="resaltado">INSCRIPCION</span> y luego cliquear sobre <span class="resaltado">TENGO UN CODIGO DE TRANSFERENCIA.</span><br><br>Cuando el otro participante se registre con tu codigo, será dada de baja tu inscripción automaticamente.
                  <p><div id="trfcode" class="trfcode"></div></p>
                  <div class="form__input-container muestraCode">

                                    
        <input type="button" class="subir subir2" id="codigotrf" value="Generar código para transferencia" onclick="generarYMostrarCodigo()">
    </div>    </div>    

                  </details> `;






let saldo='';

if (datos[0].estado==="8"){

saldo=

`    
           <details name="desp" class='saldo'>
          <summary class='saldo1' style='color:#fff;
        border-radius:5px;  background: rgba(223, 43, 43, 0.899);'>⚠️<span class='subrayado'>SALDO PENDIENTE: $ ${deuda}</span>
             </summary> <div class="content">
                  <p>Importe total en cuotas: <span class='resaltado'>$${datos[0].financiado}</p>
                  <p>Anticipo pagado <span class='resaltado'>$${datos[0].importe}</span>.  
                  <p>Saldo a pagar (hasta el ${datos[0].venc2}): <span class='resaltado'>$${deuda}</p>    
                  <p>Luego del vencimiento, se recalculará el saldo de acuerdo al nuevo valor de la inscripcion</p>   
                  
                  </div>    
<div class="content">
     <div class="info__grupos-titulo">          
                    Datos para realizar la transferencia 💵
                </div><p>Realizá una transferencia a la siguiente cuenta bancaria:
                     <ul class="opcpago">
                                <li><span class="resaltado">${datos[0].banco}</span></li>
                                <li><span class="resaltado">Titular:</span> ${datos[0].titular}</li>
                                <li><span class="resaltado">Alias:</span> ${datos[0].alias}</li>
                                <li><span class="resaltado">Cbu:</span> ${datos[0].cbu}</li>
                                <li><span class="resaltado">Cuit:</span> ${datos[0].cuit}</li>                       
                                <li><span class="resaltado">Importe:</span> $${deuda}</li>                       

                                </ul>            
                </div>
                
                 <div class="content">
                    <span class="resaltado">No olvides cargar el comprobante!</span>
                    <p>Si ya hiciste la transferencia <span class="resaltado"> cargá aqui el comprobante</span> asi lo imputamos a tu registro.</p>
                    <p>Cargá una imagen, foto, captura o pdf. El comprobante será revisado por un operador para verificar el pago.</p>
                    <p>Presiona <span class="resaltado">Seleccionar archivo</span> para buscar y cargar el comprobante. Luego presioná <span class="resaltado">subir archivo</span></p>
                  
                  
          <section class="form" id="contact">         
                    <form class="form__form" enctype="multipart/form-data" method="POST">
<div class="form__input-container">
    <input type="file" id="fileInput" accept=".jpg, .jpeg, .png, .pdf" />            
</div>
      <input type="hidden" name="id" id="id" value="${datos[0].id}"/>
<div class="form__input-container">
    <input type="button" class="subir" id='subir' value="Subir archivo" onclick='subirArchivo("saldo");'>
 </div>
</form>
</section>
                    </div>
            



                  </details> `;
}

                

                  if (datos[0].grupo==="INFANTILES (VIERNES)"){
                    cambiodist='';
                    trfins='';
                    elite='';

                }


                if (datos[0].grupo==="ELITE"){
                    cambiodist='';
                    trfins='';
                    elite='';

                }

               
                if (datos[0].grupo !== "ESTANDAR") {
                    elite = "";
                }

                  if (datos[0].campolibre){certificado='';}
                  if(datos[0].deslinde==='si'){ deslinde='';}
            tarjetas+=saldo+deslinde+certificado+elite; //+trfins; //cambiodist
            


           
        }

      
// si cargo comprobante y esta en verificacion, muestro mensaje de que esta en verif
if (datos[0].estado==="9"){ tarjetas+=verificando;
    

}

                // si el estado de la inscripcion es pendiente de pago, muestro los precios, cuenta bancaria y form de carga de comprobante

            if (datos[0].estado==="0"){
                let valcuota=datos[0].financiado/datos[0].cuotas
                tarjetas+=`
             <div class="info__grupos paga">
                <div class="info__grupos-titulo">          
                    Pagá tu inscripcion 💰
                </div>
                <div class="content">   
                        <p><span class="resaltado">En 1 pago:</span> $ ${datos[0].precio} (vencimiento ${datos[0].venc})</p>
                        <p><span class="resaltado">En 2 cuotas:</span>
                            <ul class="opcpago">
                                <li>1° Pago: $ ${valcuota} hasta el ${datos[0].venc}</li>
                                <li>2° Pago: $ ${valcuota} hasta el ${datos[0].venc2}</li>
                            </ul> 
                            
                            <br><span class="italica">Luego del ${datos[0].venc}, si no se registran pagos, el registro será dado de baja.</span>
                               <div class="content"> </div>
                        <div class="info__grupos-titulo">          
                    Datos para realizar la transferencia 💵
                </div><p>Realizá una transferencia a la siguiente cuenta bancaria de acuerdo a la modalidad de pago (importe total o valor de cuota):
                     <ul class="opcpago">
                                <li><span class="resaltado">${datos[0].banco}</span></li>
                                <li><span class="resaltado">Titular:</span> ${datos[0].titular}</li>
                                <li><span class="resaltado">Alias:</span> ${datos[0].alias}</li>
                                <li><span class="resaltado">Cbu:</span> ${datos[0].cbu}</li>
                                <li><span class="resaltado">Cuit:</span> ${datos[0].cuit}</li>                       
                                </ul>            
                
                
                </div>

            </div>    


                
            <div class="info__grupos carga">
                <div class="info__grupos-titulo">          
                    Cargá el comprobante  🧾
                </div>
                <div class="content">
                    <span class="resaltado">No olvides cargar el comprobante!</span>
                    <p>Si ya hiciste la transferencia <span class="resaltado"> cargá aqui el comprobante</span> asi lo imputamos a tu registro.</p>
                    <p>Cargá una imagen, foto, captura o pdf. El comprobante será revisado por un operador para verificar el pago.</p>
                    <p>Presiona <span class="resaltado">Seleccionar archivo</span> para buscar y cargar el comprobante. Luego presioná <span class="resaltado">subir archivo</span></p>
                  
                  
          <section class="form" id="contact">         
                    <form class="form__form" enctype="multipart/form-data" method="POST">
<div class="form__input-container">
    <input type="file" id="fileInput" accept=".jpg, .jpeg, .png, .pdf" />            
</div>
      <input type="hidden" name="id" id="id" value="${datos[0].id}"/>
<div class="form__input-container">
    <input type="button" class="subir" id='subir' value="Subir archivo" onclick='subirArchivo("comprobante");'>
 </div>
</form>
</section>
                    </div>
            </div>    
            `;
            //loading.style.display = 'none';

            }

            // cargo las tarjetas del usuario logueado...
            info.innerHTML=tarjetas;



            if (datos[0].elite === "2" || datos[0].elite === "1" || datos[0].elite === "3") {

                let estsol=`<span class="resaltado">Solicitud en revision</span>`;
                if (datos[0].elite==="1"){ estsol=`<span class="resaltado">ELITE ACEPTADA✅</span>`;}
                if (datos[0].elite==="3"){ estsol=`<span class="resaltado">ELITE RECHAZADA ❌<br>Conservarás tu categoria original</span>`;}

                document.getElementById('cambioelite').style.display = 'none';
                document.getElementById('estadoElite').innerHTML = estsol;




             }



            if (datos[0].codigotr){
                document.getElementById('codigotrf').style.display = 'none';
                document.getElementById('trfcode').innerHTML = `<span class="resaltado">Código para transferencia: <h2>${datos[0].codigotr}</h2></span>`;

             }
    


            // si el estado es distinto de pendiente, muestro estado de certificado medico y deslinde
            if (datos[0].estado!=="0"){
                const oc=document.querySelector('.oc');
                oc.style.display="block";
            }
            

            // agrega clases que dan color al estado de la inscripcion
            const pago=document.querySelector('.pago');
            if (datos[0].estado==="0"){ pago.classList.add('pendiente');}
            if (datos[0].estado==="1"){ pago.classList.add('inscripto');}
            if (datos[0].estado==="9"){ pago.classList.add('verificacion');}
            if (datos[0].estado==="8"){ pago.classList.add('anticipo');}
    




          

           
       
       
       
       
       













        }  // fin funcion participante encontrado













// Recuperar el valor de 'tlpID' desde localStorage
const tlpID = localStorage.getItem('tlpID');
let datos = []; // array donde se guardaran los datos de la bd
//loading.style.display = 'flex'; // muestro "cargando..."



// si hay algo en LS, hago un fetch para busccar los datos via post

if (tlpID) { 
    
    fetch('https://propesca.com.ar/tlp/ls.php', { //pido los datos a la bd
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'tlpID=' + encodeURIComponent(tlpID) //paso el id almacenado en LS
    })
    .then(response => response.json()) 
    .then(data => {
        datos = data; // si la BD devuelve usuario, guardo los datos en vble datos
        //console.log(datos);
        if (datos.length === 1) {
            info(datos[0]); // llamo a la funcion info y paso los datos para carga de las tarjetas del usuario

            portada.style.display = 'none'; // oculto "cargando..."
            loading.style.display = 'none'; // oculto "cargando..."
            

        } else if (datos.length === 0) {

                // si no devolvio datos la BD muestro la portada
            localStorage.removeItem('tlpID');
            localStorage.removeItem('tlp');

            mostrarElementos();
        }



        
        
    })
    .catch(error => console.error('Error:', error));
} else { // si no hay nada en LS muestro los elementos de la portada... 
    mostrarElementos();
   
}



// FUNCION CERRAR SESION Y ELIMINAR LOCALSTORAGE
const cerrar = () => {
    localStorage.removeItem('tlpID');
    localStorage.removeItem('tlp');

    alert('Sesion Cerrada. Podras volver a loguearte haciendo click en INSCRIPCION');
    window.location.href = 'index.html';

};



// cambiodistancia
const changedst = () => {
    // Obtener el ID del input oculto
    const idcode = document.getElementById('idcode').value;
    const confirmacambio = document.getElementById('confirmacambio');
    confirmacambio.value="Cambiando...⏳";

    const nvadistancia = document.getElementById('selectchangedst').value;
    const comput = document.getElementById('comput').value;

    // Enviar el código y el ID al archivo PHP
    fetch('./src/changedst.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            distancia: nvadistancia,
            idcode: idcode,
            computable: comput
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log('Código enviado con éxito:', data); // Mostrar la respuesta en la consola
        //confirmacambio.value="Modalidad cambiada ✅";
        setTimeout(function() {
            window.location.href = 'index.php';
        }, 100); 
    })
    .catch(error => {
        console.error('Error al enviar el código:', error); // Mostrar errores en la consola
    });
};





// generar codigo aleatorio para transferencias

const generarYMostrarCodigo = () => {
    const longitud = 8; // Longitud del código
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
    let codigo = '';

    for (let i = 0; i < longitud; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres[indice];
    }

    // Obtener el ID del input oculto
    const idcode = document.getElementById('idcode').value;

    // Ocultar el botón
    document.getElementById('codigotrf').style.display = 'none';

    // Mostrar el código en la página
    document.getElementById('trfcode').innerHTML = `<span class="resaltado">Código para transferencia: <h2>${codigo}</h2></span>`;

    // Enviar el código y el ID al archivo PHP
    fetch('./src/code.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            codigo: codigo,
            idcode: idcode
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log('Código enviado con éxito', data);
        // Puedes manejar la respuesta del servidor aquí
    })
    .catch(error => {
        console.error('Error al enviar el código:', error);
    });
};




            
function mostrarDialogo() {
    document.getElementById('myDialog').showModal();
}


function mostrarfirma() {
    document.getElementById('firmadigi').showModal();
}


// Cerrar el diálogo
function cerrarDialogo() {    document.getElementById('myDialog').close();
};


function cerrarfirma() {    document.getElementById('firmadigi').close();
};



function subirArchivo(tipo) {
    // Determina los elementos y URL según el tipo
    let fileInput, fileName, formData, url, idName,cuota;
    
    if (tipo === 'comprobante' || tipo === 'saldo') {
        fileInput = document.getElementById('fileInput');
        idName = 'id';
        cuota=tipo;
        url = './src/uploads.php';
        
    } else if (tipo === 'cm') {
        fileInput = document.getElementById('fileInputcm');
        idName = 'idcm';
        url = './src/uploadscm.php';
    } else {
        console.error('Tipo de archivo no válido.');
        return;
    }
    
    const file = fileInput.files[0];
    if (file) {
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        
        if (!allowedExtensions.includes(fileExtension)) {
            alert('Solo se permiten archivos JPG, PNG y PDF.');
            return;
        }
        
        formData = new FormData();
        formData.append(`file${tipo === 'cm' ? 'cm' : ''}`, file);
        formData.append(idName, document.getElementById(idName).value);
        formData.append('cuota',cuota);
        
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text); });
            }
            return response.text();
        })
        .then(data => {
            console.log('Archivo subido con éxito', data);
        
                window.location.href = 'index.php';
            
        })
        .catch(error => {
            console.error('Error al subir el archivo:', error.message);
            alert('Error al subir el archivo: ' + error.message);
        });
    } else {
        alert('Por favor, selecciona un archivo primero.');
    }
}





// cambiar a elite

const cambiarElite = () => {


    // Obtener el ID del input oculto
    const idcode = document.getElementById('idcode').value;

    // Ocultar el botón
    document.getElementById('cambioelite').style.display = 'none';

    // Mostrar el código en la página
    document.getElementById('estadoElite').innerHTML = `<span class="resaltado">Solicitud enviada ✅</span>`;

    // Enviar el código y el ID al archivo PHP
    fetch('./src/solicitud.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            idcode: idcode
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log('Código enviado con éxito', data);
        // Puedes manejar la respuesta del servidor aquí
    })
    .catch(error => {
        console.error('Error al enviar el código:', error);
    });
};

