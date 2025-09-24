   class ParticipantsViewer {
            constructor() {
                this.page = 1;
                this.resultsPerPage = 50;
                this.loading = false;
                this.allLoaded = false;
                this.allResults = [];
                this.filteredResults = [];
                this.currentGroup = 'ESTANDAR';
                
                this.elements = {
                    loading: document.getElementById('loading'),
                    loadingMore: document.getElementById('loadingMore'),
                    errorMessage: document.getElementById('errorMessage'),
                    gruposNav: document.getElementById('gruposNav'),
                    tablaResultados: document.getElementById('tablaResultados'),
                    stats: document.getElementById('stats')
                };

                this.init();
            }

            init() {
                this.setupEventListeners();
                this.loadAllData();
            }

            setupEventListeners() {
                // Event listeners para los filtros
                document.querySelectorAll('.link_parts').forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const grupo = link.getAttribute('data-grupo');
                        this.filterResults(grupo);
                    });
                });

                // Scroll infinito mejorado
                let scrollTimeout;
                window.addEventListener('scroll', () => {
                    clearTimeout(scrollTimeout);
                    scrollTimeout = setTimeout(() => {
                        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
                            this.loadMoreResults();
                        }
                    }, 100); // Throttling del scroll
                });
            }

            async loadAllData() {
                try {
                    this.showLoading(true);
                    this.hideError();

                    const response = await fetch('https://propesca.com.ar/tlp/load_parts.php', {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    });

                    if (!response.ok) {
                        throw new Error(`Error HTTP: ${response.status}`);
                    }

                    const data = await response.json();
                    
                    if (!Array.isArray(data)) {
                        throw new Error('Los datos recibidos no tienen el formato esperado');
                    }

                    this.allResults = data;
                    //console.log(`Cargados ${data.length} participantes`);
                    
                    // Mostrar interfaz y cargar grupo por defecto
                    this.showInterface();
                    this.filterResults(this.currentGroup);

                } catch (error) {
                    console.error('Error al cargar participantes:', error);
                    this.showError('Error al cargar los participantes. Por favor, intenta nuevamente.');
                } finally {
                    this.showLoading(false);
                }
            }

            filterResults(grupo) {
    this.currentGroup = grupo;
    this.page = 1;
    this.allLoaded = false;

    // Actualizar enlace activo
    document.querySelectorAll('.link_parts').forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-grupo') === grupo);
    });

    // Filtrar resultados
    this.filteredResults = this.allResults.filter(participante => 
        participante.grupo === grupo
    );

    // Limpiar tabla
    this.clearResults();

    // Actualizar estadísticas
    this.updateStats();

    if (this.filteredResults.length === 0) {
        this.allLoaded = true; // 🚨 Importante: marcar que ya no hay nada para cargar
        this.elements.loadingMore.style.display = 'none';
        // Podés mostrar un mensaje de "Sin resultados" si querés
        const noResultsDiv = document.createElement('div');
        noResultsDiv.className = 'no-results';
        noResultsDiv.textContent = '';
        this.elements.tablaResultados.appendChild(noResultsDiv);
        return;
    }

    // Cargar primera página
    this.loadMoreResults();
}


            loadMoreResults() {
                if (this.loading || this.allLoaded) return;

                this.loading = true;
                this.elements.loadingMore.style.display = 'block';

                // Simular delay para mejor UX (opcional)
                setTimeout(() => {
                    const startIndex = (this.page - 1) * this.resultsPerPage;
                    const endIndex = startIndex + this.resultsPerPage;
                    const paginatedResults = this.filteredResults.slice(startIndex, endIndex);

                    if (paginatedResults.length === 0) {
                        this.allLoaded = true;
                        this.elements.loadingMore.style.display = 'none';
                        return;
                    }

                    this.displayResults(paginatedResults);
                    
                    if (paginatedResults.length < this.resultsPerPage) {
                        this.allLoaded = true;
                    }

                    this.page++;
                    this.loading = false;
                    this.elements.loadingMore.style.display = 'none';
                }, 100);
            }

            displayResults(results) {
                const fragment = document.createDocumentFragment();

                results.forEach(participante => {
                    const nroDiv = document.createElement('div');
                    nroDiv.className = 'tabla-item nro_data';
                    nroDiv.textContent = (participante.nro === "0" || participante.nro === "" || participante.nro === null) ? "--" : participante.nro;

                    const participanteDiv = document.createElement('div');
                    participanteDiv.className = 'tabla-item participante_data';
                    participanteDiv.textContent = `${participante.apellido}, ${participante.nombre}`;

                    const ciudadDiv = document.createElement('div');
                    ciudadDiv.className = 'tabla-item ciudad_data';
                    ciudadDiv.textContent = participante.ciudad || '--';

                    const categoriaDiv = document.createElement('div');
                    categoriaDiv.className = 'tabla-item categoria_data';
                    categoriaDiv.textContent = participante.categoria || '--';

                    const estadoDiv = document.createElement('div');
                    estadoDiv.className = 'tabla-item estado_data';
                    
                    if (participante.estado) {
                        const img = document.createElement('img');
                        
                        img.src = `./img/${participante.estado}.png`;
                        img.alt = participante.estado;
                        img.onerror = () => {
                            img.style.display = 'none';
                            estadoDiv.textContent = participante.estado;
                        };
                        estadoDiv.appendChild(img);
                    } else {
                        estadoDiv.textContent = '--';
                    }

                    fragment.appendChild(nroDiv);
                    fragment.appendChild(participanteDiv);
                    fragment.appendChild(ciudadDiv);
                    fragment.appendChild(categoriaDiv);
                    fragment.appendChild(estadoDiv);
                });

                this.elements.tablaResultados.appendChild(fragment);
            }

            clearResults() {
                // Mantener solo los headers
                const headers = this.elements.tablaResultados.querySelectorAll('.tabla-header');
                this.elements.tablaResultados.innerHTML = '';
                headers.forEach(header => this.elements.tablaResultados.appendChild(header));
            }

            updateStats() {
                const total = this.filteredResults.length;
                const groupName = this.currentGroup;
                //this.elements.stats.textContent = `${groupName}`;
            }

            showInterface() {
                this.elements.gruposNav.style.display = 'block';
                this.elements.tablaResultados.style.display = 'grid';
                this.elements.stats.style.display = 'block';
            }

            showLoading(show) {
                this.elements.loading.style.display = show ? 'block' : 'none';
            }

            showError(message) {
                this.elements.errorMessage.textContent = message;
                this.elements.errorMessage.style.display = 'block';
            }

            hideError() {
                this.elements.errorMessage.style.display = 'none';
            }
        }

        // Inicializar cuando el DOM esté listo
        document.addEventListener('DOMContentLoaded', () => {
            new ParticipantsViewer();
        });