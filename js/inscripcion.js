
let dni = '';
const main=document.querySelector('.main');
async function consultarInscripcion(dni) {
    try {
        
    const params = new URLSearchParams();
    params.append('dni', dni);

    const response = await fetch('https://www.propesca.com.ar/tlp/inscripcion2.php', {
    method: 'POST',
    body: params

});
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        // respuesta como texto
        const responseText = await response.text();
        
        // parsear respuesta a JSON
        const data = JSON.parse(responseText);
    
       
        //  según el estado de la respuesta...
        switch(data.estado) {
            case 'inscripto':
                localStorage.setItem('tlpID', data.info);
                window.location.href='index.html'

                break;
                
            case 'inscribir':
                        console.log(data.info.nac.split('/').reverse().join('-').slice(2))
                        main.innerHTML=`  <section class="form" id="contact">
            <form class="form__form" id="contactForm" >
                <div class="form__input-container">
                    <label>Nombre
                    <input type="text" id="nombreInput" name="nombre" placeholder="Ingresa tu nombre" value="${data.info.nombre}" required>
                        </label>
                </div>

                <div class="form__input-container">
                    <label>Apellido
                    <input type="text" id="apellidoInput" name="apellido" placeholder="Ingresa tu apellido" value="${data.info.apellido}" required>
                        </label>
                </div>

                <div class="form__input-container">
                    <label>Documento
                    <input type="text" id="dniInput" name="dni" placeholder="Ingresa tu dni aquí" value="${data.info.dni}" readonly>
                        </label>
                </div>

                <div class="form__input-container">
                    <label>Sexo
                        <select name="sexo" required>
                            <?php if ($participante['sexo']=='') { ?>
                                <option value='' disabled selected>SELECCIONAR</option>
                            <?php }?>
                            <option value="VARON" <?php if ($participante['sexo']=="VARON") { echo "selected";}?>>VARON</option>
                            <option value="MUJER" <?php if ($participante['sexo']=="MUJER") { echo "selected";}?>>MUJER</option>
                        </select>
                    </label>
                </div>

                <div class="form__input-container">
                    <label>F.Nacimiento
                    <input type="date" id="nacInput" name="nac" min="1939-01-01" max="2023-12-31" value="${data.info.nac}" required>
                        </label>
                </div>

                <div class="form__input-container">
                    <label>Ciudad
                    <input type="text" id="ciudadInput" name="ciudad" placeholder="Ingresa tu ciudad" value="${data.info.ciudad}" required>
                        </label>
                </div>

                <div class="form__input-container">
                    <label>Provincia
                    <input type="text" id="provinciaInput" name="provincia" placeholder="Ingresa provincia" value="${data.info.provincia}" required>
                        </label>
                </div>

                <div class="form__input-container">
                    <label>Pais
                    <input type="text" id="paisInput" name="pais" placeholder="Ingresa pais" value="${data.info.pais}" required>

                </label>
                </div>
                <?php if ($transferencia=="si"){ echo "<input type='hidden' name='criptedcode' value='$codigotrf' required>";}?>



                <div class="form__input-container">
                    <input type="submit" value="Siguiente" class="button">
                </div>
            </form>
            <div id="error-message" class="error-message">⚠️ Ingresa solo texto</div>
        </section>`;



                break;
                
            case 'cerrado':

                
                main.innerHTML=`
                <div class="error">
                <h2 class='emoji'>🥺</h2> <h3>${data.mensaje}</h3>
                </div>`;

                break;
                
            default:
                alert(`Estado desconocido: ${data.estado}\n\nMensaje: ${data.mensaje || 'Sin mensaje'}`);
        }
        
        return data;
        
    } catch (error) {
        console.error('Error al consultar inscripción:', error);
        alert('Error al consultar el estado de inscripción');
        throw error;
    }
}

// Event listener para el formulario
document.addEventListener('DOMContentLoaded', function() {
    // Delegación de eventos - funciona incluso si el elemento se agrega después
    document.addEventListener('submit', function(event) {
        if (event.target.id === 'contactForm') {
            event.preventDefault();
            
            // Obtener el DNI del formulario
            dni = document.getElementById('dniInput').value;
            
            // Validar que se haya ingresado un DNI
            if (!dni || dni.trim() === '') {
                alert('Por favor ingrese su DNI');
                return;
            }
            
            // Consultar el estado de inscripción
            consultarInscripcion(dni);
        }
    });
});