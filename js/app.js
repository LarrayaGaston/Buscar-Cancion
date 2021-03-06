import { API } from './api.js';
import * as UI from './interfaz.js';




UI.formularioBuscar.addEventListener('submit', (e) => {
    e.preventDefault();

        // Obtener datos del formulario
        const artista = document.querySelector('#artista').value,
        cancion = document.querySelector('#cancion').value;

        if(artista === '' || cancion === '') {
        // El usuario deja los campos vacios, mostrar error
        UI.divMensajes.innerHTML = 'Error... Todos los campos son obligatorios';
        UI.divMensajes.classList.add('error');
        setTimeout(() => {
            UI.divMensajes.innerHTML = '';
            UI.divMensajes.classList.remove('error');
        }, 3000);
        } else{
            // EL FORMULARIO ESTA COMPLETO REALIZA LA CONSULTA A LA API
            const api = new API(artista,cancion);
            // Realizamos un promise

            api.consultarAPI()
                .then(data => {
                    if(data.respuesta.lyrics){
                        // La cancion existe
                        const letra = data.respuesta.lyrics;
                        UI.divResultados.textContent = letra;
                    }else{

                        // La cancion no existe
                            UI.divMensajes.innerHTML = 'La cancion no existe...Prueba con otra';
                            UI.divMensajes.classList.add('error');
                            setTimeout(() => {
                                UI.divMensajes.innerHTML = '';
                                UI.divMensajes.classList.remove('error');
                                UI.formularioBuscar.reset();
                            }, 3000);
                    }
                });
        }   

           
});