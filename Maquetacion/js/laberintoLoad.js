$(document).ready(function(){
    // Temporizador en milisegundos (por ejemplo, 5 segundos)
    const tiempoDelay = 3000;

    // Función para redireccionar a otra página
    function redireccionar() {
      window.location.href = "laberintoEnd.html";
    }

    // Llama a la función redireccionar después de cierto tiempo
    setTimeout(redireccionar, tiempoDelay);
});