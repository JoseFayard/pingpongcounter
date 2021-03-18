// DOM ELEMENTS
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let saques = document.getElementById("contadorSaques");
let restarPlayer1 = document.getElementById("restarPlayer1");
let restarPlayer2 = document.getElementById("restarPlayer2");
let rondasPlayer1 = document.getElementById("juegosPlayer1");
let rondasPlayer2 = document.getElementById("juegosPlayer2");
let botonSorteo = document.getElementById("botonSorteo");
let nombreJugadorASacar = document.getElementById("nombreJugadorASacar");
let jugadorGanadorDelRonda = document.getElementById("jugadorGanadorDelJuego");
let jugadorGanadorDelPartido = document.getElementById("jugadorGanadorDelPartido");
let jugadorGanadorDelTorneo = document.getElementById("jugadorGanadorDelTorneo");
let footer = document.getElementById("footer");
let numeroJuego = document.getElementById("numeroJuego");
let switchLabel = document.getElementById("switch-label");

// Elementos donde se escribirán los nombres de los jugadores
let h2NombreJugador1 = document.getElementById("h2NombreJugador1");
let h2NombreJugador2 = document.getElementById("h2NombreJugador2");

// Inputs para escribir el nombre de los jugadores
let inputNombreJugador1 = document.getElementById("inputNombreJugador1");
let inputNombreJugador2 = document.getElementById("inputNombreJugador2");

// Botones para guardar nombres de jugadores
let guardarNombreJugador1 = document.getElementById("guardarNombreJugador1");
let guardarNombreJugador2 = document.getElementById("guardarNombreJugador2");

// Modales
let modalGanadorRonda = document.getElementById("ganadorJuego");
let modalGanadorPartido = document.getElementById("ganadorPartido");
let modalGanadorTorneo = document.getElementById("ganadorTorneo");
let modalRealizarSorteo = document.getElementById("realizarSorteo");
let modalSorteo = document.getElementById("modalSorteo");
let modalNombreJugador1 = document.getElementById("nombreJugador1");
let modalNombreJugador2 = document.getElementById("nombreJugador2");

// variables
let puntosJugador1 = 0;
let puntosJugador2 = 0;
let rondasGanadosPlayer1 = 0;
let rondasGanadosPlayer2 = 0;
let contadorSaques = 2;
let numeroDePuntosAJugar = 10;
let actualmenteSacando;
let ronda = 1;
let juegosAGanar = 1;
let sorteoRealizado = false;
let nombreDelJugador1 = "";
let nombreDelJugador2 = "";

// Archivos de audio 
let audioCampeon = "audio/campeon.mp3";
let audioPuntoMenos = "audio/smb_stomp.wav";
let audioPuntoMas = "audio/smb_coin.wav";
let audioGanadorRonda = "audio/smb_stage_clear.wav";
let audioGanadorPartido = "audio/smb_world_clear.wav";
let audioSorteoSaque = "audio/smb_flagpole.wav";
let audioRealizarSorteo = "audio/smb_fireworks.wav";

// Creamos elemento HMTL5 "audio"
let audioElement = document.createElement("audio");

// Configuración del audio
audioElement.autoplay = true;
audioElement.load();

// Evento click en los botonos de puntos
button1.addEventListener("click", SumarUno);
button2.addEventListener("click", SumarUno);

//Evento click en los botones para guardar los nombres de los jugadores
guardarNombreJugador1.addEventListener("click", guardarNombre);
guardarNombreJugador2.addEventListener("click", guardarNombre);

//Evento click en los botones de resta de puntos
restarPlayer1.addEventListener("click", RestarPunto);
restarPlayer2.addEventListener("click", RestarPunto);

// Evento click en el botón del sorteo
botonSorteo.addEventListener("click", ModalPrimeroEnSacar);

// Evento para cerrar las modales
modalSorteo.addEventListener("click", CerrarModal);
modalGanadorRonda.addEventListener("click", CerrarModal);
modalGanadorPartido.addEventListener("click", CerrarModal);
modalGanadorTorneo.addEventListener("click", CerrarModal);
modalRealizarSorteo.addEventListener("click", CerrarModal);

function SumarUno() {

    let cualBoton = this.id;

    // Se llama a la función para que cambie el puntaje necesario para ganar en caso de ser necesario

    console.log("Numero de puntos a jugar SumarUno(): " + numeroDePuntosAJugar);

    // Se verifica si el checkbox ¿Final del torneo? está checked o no, de ser cierto se cambia la cantidad de juegos a ganar por cada jugador a 2 para que así tengan que ganar 3 rondas para ganar el partido final
    if (switchLabel.checked === true) {
        juegosAGanar = 2;
    }

    if (sorteoRealizado) {

        if (cualBoton === "button1") {



            if (puntosJugador1 < numeroDePuntosAJugar) {

                // Jugador 1 ha ganado un punto
                puntosJugador1 += 1;

                // Se muestra ese punto ganado en pantalla
                button1.innerHTML = puntosJugador1;

                // Se llama a la función para que reste un saque
                RestarSaque();

                // Sonido de un punto adicional
                ReproducirAudio(audioPuntoMas);

            } else {

                //El jugador 1 ha ganado la ronda actual
                // Sonido de ganador de ronda
                ReproducirAudio(audioGanadorRonda);

                // Se suma la ronda ganada al total de rondas del jugador 1
                puntosJugador1 += 1;

                // Se suma un punto en el puntaje del jugador 1
                button1.innerHTML = puntosJugador1;

                // Se escribe el nombre del jugador 1 en la ventana modal
                jugadorGanadorDelRonda.innerHTML = nombreDelJugador1;

                // Se escribe el numero del juego ganado en la ventana modal
                numeroJuego.innerHTML = ronda;

                // Se borran los puntos de ambos jugadores y se reestablecen los saques a 5
                button1.innerHTML = 0;
                button2.innerHTML = 0;
                saques.innerHTML = 2;
                contadorSaques = 2;
                puntosJugador1 = 0;
                puntosJugador2 = 0;

                // Se aumenta la variable ronda
                ronda += 1;

                // Si el jugador 2 aún no tiene 2 juegos ganados
                if (rondasGanadosPlayer1 < juegosAGanar) {

                    // Se suma un juego ganado al jugador 1
                    rondasGanadosPlayer1 += 1;

                    // Se muestra la ventana modal solo si el jugador no es el ganador del partido
                    modalGanadorRonda.style.visibility = "visible";

                    // Se escribe en pantalla las rondas ganadas que tiene el jugador 1
                    rondasPlayer1.innerHTML = rondasGanadosPlayer1;

                } else {

                    // En caso de tener dos juegos ganados
                    // Se suma ese juego ganado al jugador 1
                    rondasGanadosPlayer1 += 1;

                    // Se escribe ese juego ganado en la ventana modal
                    rondasPlayer1.innerHTML = rondasGanadosPlayer1;

                    if (juegosAGanar === 2) {

                        // Se reproduce la música de campeón
                        ReproducirAudio(audioCampeon);

                        // Se escribe el nombre del jugador dos en pantalla dentro de la ventana modal #ganadorTorneo
                        jugadorGanadorDelTorneo.innerHTML = nombreDelJugador1;

                        // Se muestra la ventana modal #ganadorTorneo
                        modalGanadorTorneo.style.visibility = "visible";

                    } else {

                        // Sonido ganador partido
                        ReproducirAudio(audioGanadorPartido);

                        // Se escribe el nombre del jugador dos en pantalla dentro de la ventana modal #ganadorPartido
                        jugadorGanadorDelPartido.innerHTML = nombreDelJugador1;

                        // Se muestra la ventana modal #ganadorPartido
                        modalGanadorPartido.style.visibility = "visible";

                    }

                    // Se resetean los puntajes y los juegos ganados
                    rondasGanadosPlayer1 = 0;
                    rondasGanadosPlayer2 = 0;
                    rondasPlayer1.innerHTML = 0;
                    rondasPlayer2.innerHTML = 0;
                    ronda = 1;

                    // Se reestablece el color del footer a blanco
                    footer.style.backgroundColor = "#FFF";

                    // El sorteo vuelve al estado de no realizado y el botón del sorteo vuelve a estar disponible
                    sorteoRealizado = false;
                    botonSorteo.disabled = false;
                    botonSorteo.classList.add("pulsame");

                }

                // El numero de puntos a ganar vuelve a 10
                numeroDePuntosAJugar = 10;

            }

        } else {

            if (puntosJugador2 < numeroDePuntosAJugar) {

                // Se suma un punto al jugador 2
                puntosJugador2 += 1;

                // Se muestra en pantalla ese punto ganado
                button2.innerHTML = puntosJugador2;

                // Se llama a la función para que reste un saque
                RestarSaque();

                // Sonido de punto adicional
                ReproducirAudio(audioPuntoMas);

            } else {


                // Sonido de ganador de ronda
                ReproducirAudio(audioGanadorRonda);

                // Se suma punto al jugador 2
                puntosJugador2 += 1;

                // Se muestra en pantalla ese punto ganado por el jugador dos
                button2.innerHTML = puntosJugador2;

                // Se escribe el nombre del jugador 2 en la ventana modal
                jugadorGanadorDelRonda.innerHTML = nombreDelJugador2;

                // Se escribe el numero del juego ganado en la ventana modal
                numeroJuego.innerHTML = ronda;

                // Se borran los puntos de ambos jugadores y se reestablecen los saques a 5
                button2.innerHTML = 0;
                button1.innerHTML = 0;
                saques.innerHTML = 2;
                contadorSaques = 2;
                puntosJugador2 = 0;
                puntosJugador1 = 0;

                // Se aumenta la variable ronda
                ronda += 1;

                // Si el jugador 2 aún no tiene 2 juegos ganados
                if (rondasGanadosPlayer2 < juegosAGanar) {

                    // Se suma un juego ganado al jugador 2
                    rondasGanadosPlayer2 += 1;

                    // Se muestra la ventana modal solo si el jugador no es el ganador del partido
                    modalGanadorRonda.style.visibility = "visible";

                    // Se muestra el nuevo juego ganado del jugador 2 en pantalla
                    rondasPlayer2.innerHTML = rondasGanadosPlayer2;

                } else { // En caso de tener dos juegos ganandos

                    // Se suma un juego ganado al jugador 2
                    rondasGanadosPlayer2 += 1;

                    // Se muestra ese nuevo juego ganado en pantalla
                    rondasPlayer2.innerHTML = rondasGanadosPlayer2;

                    // Comprobamos si es la final del torneo
                    if (juegosAGanar === 2) {

                        // Se reproduce la música de campeón
                        ReproducirAudio(audioCampeon);

                        // Se escribe el nombre del jugador dos en pantalla dentro de la ventana modal #ganadorTorneo
                        jugadorGanadorDelTorneo.innerHTML = nombreDelJugador2;

                        // Se muestra la ventana modal #ganadorTorneo
                        modalGanadorTorneo.style.visibility = "visible";

                    } else {

                        // Sonido ganador partido
                        ReproducirAudio(audioGanadorPartido);

                        // Se escribe el nombre del jugador dos en pantalla dentro de la ventana modal #ganadorPartido
                        jugadorGanadorDelPartido.innerHTML = nombreDelJugador2;

                        // Se muestra la ventana modal #ganadorPartido
                        modalGanadorPartido.style.visibility = "visible";

                    }

                    // Se resetean los puntajes y los juegos ganados
                    rondasGanadosPlayer2 = 0;
                    rondasGanadosPlayer1 = 0;
                    rondasPlayer2.innerHTML = 0;
                    rondasPlayer1.innerHTML = 0;
                    ronda = 1;

                    // Se reestablece el color del footer a blanco
                    footer.style.backgroundColor = "#FFF";

                    // El sorteo vuelve al estado de no realizado y el botón del sorteo vuelve a estar disponible
                    sorteoRealizado = false;
                    botonSorteo.disabled = false;
                    botonSorteo.classList.add("pulsame");

                }

                // El numero de puntos a ganar vuelve a 10
                numeroDePuntosAJugar = 10;

            }

        }

    } else {

        // Se informa al usuario que debe realizar el sorteo de saque previo al inicio del partido
        modalRealizarSorteo.style.visibility = "visible";

        // Sonido que acompaña a la modal que advierte al usuario para que realice el saque
        ReproducirAudio(audioRealizarSorteo);

    }
    CambiarPuntaje();


}

function RestarSaque() {

    // Se verifica que los saques sean mayores a 1, si lo son se resta uno
    if (contadorSaques > 1) {

        contadorSaques -= 1;
        saques.innerHTML = contadorSaques;

    } else { // En caso contrario se reestablecen a 5

        saques.innerHTML = 2;
        contadorSaques = 2;
        // Se cambia el color del jugador que va a sacar

        if (actualmenteSacando === 1) {

            footer.style.backgroundColor = "#2196F3";
            actualmenteSacando = 2;

        } else {

            footer.style.backgroundColor = "#4CAF50";
            actualmenteSacando = 1;

        }
    }
}

function RestarPunto() {

    // Se guarda el ID del jugador al cual debe restarsele un punto
    let aQuienRestar = this.id;

    // Se verifica a que jugador hay que restarle un punto y de acuerdo a esa verificación se le resta un punto a dicho jugador
    if (aQuienRestar === "restarPlayer1") {

        if (puntosJugador1 > 0) {

            puntosJugador1 -= 1;

            // Se muestra en pantalla el puntaje nuevo
            button1.innerHTML = puntosJugador1;

            // Sonido de punto menos
            ReproducirAudio(audioPuntoMenos);

            // Se verifica que los saques sean menores a 5, en caso de ser así se aumentan en uno
            if (contadorSaques < 2) {

                contadorSaques += 1;
                saques.innerHTML = contadorSaques;

            }

        }
    } else {

        if (puntosJugador2 > 0) {

            puntosJugador2 -= 1;

            // Se muestra en pantalla el puntaje nuevo
            button2.innerHTML = puntosJugador2;

            // Sonido de punto menos
            ReproducirAudio(audioPuntoMenos);

            // Se verifica que los saques sean menores a 5, en caso de ser así se aumentan en uno
            if (contadorSaques < 2) {

                contadorSaques += 1;
                saques.innerHTML = contadorSaques;

            }

        }
    }
}

function CambiarPuntaje() {
    let ventajaJugador1 = puntosJugador1 - puntosJugador2;
    let ventajaJugador2 = puntosJugador2 - puntosJugador1;

    console.log("Ventaja jugador 1: " + ventajaJugador1);
    console.log("Ventaja jugador 2: " + ventajaJugador2);

    // Se verifica si los jugadores tiene 10 puntos cada uno, en caso de ser así se cambia el numero total de puntos para ganar a 12
    if (puntosJugador1 >= 10 && puntosJugador2 >= 10) {

        if ( ( ventajaJugador1 < 1) && ( ventajaJugador2 < 1) ) {
            
            console.log("entré");
            numeroDePuntosAJugar += 1;
            console.log(numeroDePuntosAJugar);
        
        }

    }
    

}

function PrimeroEnSacar() {

    // Se realiza el sorteo del saque inicial
    return Math.round(Math.random());
}

function ModalPrimeroEnSacar() {

    // Se guarda el jugador que sacará primero
    let quienSaca = PrimeroEnSacar();
    let jugadorASacar = "";

    // Se verifica quien sacará primero de acuerdo al resultado aleatorio
    if (quienSaca === 0) {

        jugadorASacar = nombreDelJugador1;

        footer.style.backgroundColor = "#4CAF50";

        actualmenteSacando = 1;

    } else {

        jugadorASacar = nombreDelJugador2;

        footer.style.backgroundColor = "#2196F3";

        actualmenteSacando = 2;

    }

    // Se escribe el nombre del jugador a sacar primero, esto se hace en la ventana modal correspondiente
    nombreJugadorASacar.innerHTML = jugadorASacar;

    // Se muestra la ventana modal para mostrar quien sacará primero
    modalSorteo.style.visibility = "visible";

    // Sonido que anuncia que el sorteo de saque se realizó
    ReproducirAudio(audioSorteoSaque);

    // El sorteo ya se ha realizado por ende la variable pasa a true
    sorteoRealizado = true;

    // El botón para realizar el sorteo deshabilita
    botonSorteo.disabled = true;

    botonSorteo.classList.remove("pulsame");

}

function CerrarModal() {

    // Se guarda el ID de la ventana modal a cerrar
    let modalACerrar = this.id;

    // Se cierra la ventana modal correspondiente
    document.getElementById(modalACerrar).style.visibility = "hidden";
}

function ReproducirAudio(sonidoAReproducir) {

    // Esperamos a que el archivo de sonido esté cargado
    audioElement.addEventListener("load", function () {

        // Lo reproducimos
        audioElement.play();

    });

    // Le pasamos el sonido a reproducir
    audioElement.src = sonidoAReproducir;

}

function guardarNombre() {

    // Capturamos el id del botón pulsado para saber donde colocaremos el nombre
    let cualNombre = this.id;

    if (cualNombre === "guardarNombreJugador1") {

        // Guardamos el texto que fue introducido en el input
        let nombreAGuardar = inputNombreJugador1.value;

        // Verficamos que el input no esté vacío
        if (nombreAGuardar !== "") {

            // Escribimos el nombre en el h2 correspondiente
            h2NombreJugador1.innerHTML = nombreAGuardar;

            // Guardamos el nombre del jugador 1 en la variable correspondiente
            nombreDelJugador1 = nombreAGuardar;

            // Cerramos la modal correspondiente
            document.getElementById("nombreJugador1").style.visibility = "hidden";

            // Limpiamos el input del nombre del jugador 1
            inputNombreJugador1.value = "";

            // Abrimos la siguiente ventana modal para el nombre del segundo jugador
            document.getElementById("nombreJugador2").style.visibility = "visible";

        } else {

            // Si el input está vacío se lo indicamos al usuario
            inputNombreJugador1.style.borderColor = "#D32F2F";

            // Enfocamos el input correspondiente
            inputNombreJugador1.focus();
        }

    } else {

        // Guardamos el texto que fue introducido en el input
        let nombreAGuardar = inputNombreJugador2.value;

        // Verificamos si el input no está vacío
        if (nombreAGuardar !== "") {

            // Escribimos el nombre en el h2 correspondiente
            h2NombreJugador2.innerHTML = nombreAGuardar;

            // Guardamos el nombre del jugador 2 en la variable correspondiente
            nombreDelJugador2 = nombreAGuardar;

            // Cerramos la modal correspondiente
            document.getElementById("nombreJugador2").style.visibility = "hidden";

            // Limpiamos el input del nombre del jugador 2
            inputNombreJugador2.value = "";

        } else {

            // Si el input está vacío se lo indicamos al usuario
            inputNombreJugador2.style.borderColor = "#D32F2F";

            // Enfocamos el input correspondiente
            inputNombreJugador2.focus();

        }

    }

}