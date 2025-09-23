

         const contenidos = {

 
      info: `   <section class="card-section">
        <div class="card-header">
            <h1 class="card-title">Información del Evento</h1>
            <div class="card-header-icon">👇</div>
        </div>

        <div class="card-container">
            <article class="card card--infantiles">
                <div class="card-text">
                    <a href="?i=infantiles" class="card-link">
                        Información Infantiles
                    </a>
                    <div class="card-date">Viernes 17/01/2026</div>
                </div>
                <div class="card-icon">🧒</div>
            </article>

            <article class="card card--mayores">
                <div class="card-text">
                    <a href="?i=mayores" class="card-link">
                        Información Mayores
                    </a>
                    <div class="card-date">Sábado 18/01/2026</div>
                </div>
                <div class="card-icon">👤</div>
            </article>

            <article class="card card--elite">
                <div class="card-text">
                    <a href="elite.pdf" target="_blank" class="card-link">
                        Categoría ELITE
                    </a>
                    <div class="card-date">Reglamento especializado</div>
                </div>
                <div class="card-icon">🏆</div>
            </article>

            <article class="card card--transferencias">
                <div class="card-text">
                    <a href="transferencias.pdf" target="_blank" class="card-link">
                        Transferencia de Inscripciones
                    </a>
                    <div class="card-date">Proceso y documentación</div>
                </div>
                <div class="card-icon">🔄</div>
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