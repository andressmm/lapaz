

         const contenidos = {

 
      info: `   <section class="triathlon-info-section">
        <div class="triathlon-info-header">
            <h1 class="section-title">Información del Evento</h1>
            <div class="section-icon">👇</div>
          
        </div>

        <div class="information-links-container">
            <article class="info-card info-card--infantiles">
                
                <div class="info-card__content">
                    <div class="info-card__text">
                        <a href="?i=infantiles" class="info-card__link">
                            Información Infantiles
                        </a>
                        <div class="info-card__date">Viernes 17/01/2026</div>
                    </div>
                    <div class="info-card__icon">🧒</div>
                </div>
            </article>

            <article class="info-card info-card--mayores">
               
                <div class="info-card__content">
                    <div class="info-card__text">
                        <a href="?i=mayores" class="info-card__link">
                            Información Mayores
                        </a>
                        <div class="info-card__date">Sábado 18/01/2026</div>
                    </div>
                    <div class="info-card__icon">👤</div>
                </div>
            </article>

            <article class="info-card info-card--elite">
               
                <div class="info-card__content">
                    <div class="info-card__text">
                        <a href="elite.pdf" target="_blank" class="info-card__link">
                            Categoría ELITE
                        </a>
                        <div class="info-card__date">Reglamento especializado</div>
                    </div>
                    <div class="info-card__icon">🏆</div>
                </div>
            </article>

            <article class="info-card info-card--transferencias">
                
                <div class="info-card__content">
                    <div class="info-card__text">
                        <a href="transferencias.pdf" target="_blank" class="info-card__link">
                            Transferencia de Inscripciones
                        </a>
                        <div class="info-card__date">Proceso y documentación</div>
                    </div>
                    <div class="info-card__icon">🔄</div>
                </div>
            </article>
        </div>
    </section>`,


      inscripcion: `
        <h2>📝 Inscripción</h2>
        <p>La inscripción estará abierta hasta el 30 de septiembre. ¡No te quedes afuera!</p>
      `,
      participantes: `
        <h2>👥 Participantes</h2>
        <p>Actualmente hay 120 participantes confirmados de diferentes ciudades.</p>
      `,
      cronograma: `
        <h2>📅 Cronograma</h2>
        <ul>
          <li>09:00 - Apertura</li>
          <li>10:00 - Inicio de la competencia</li>
          <li>13:00 - Almuerzo</li>
          <li>15:00 - Premiación</li>
        </ul>
      `
    };


function clk(e) {
  e.preventDefault(); // Evita el salto al #
  const section = e.target.textContent.split(' ')[1].toLowerCase();
  
  document.querySelector('.main').innerHTML = contenidos[section];
}