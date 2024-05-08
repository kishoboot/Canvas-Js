let canvas = document.getElementById("canvas"); // Aquí se obtiene el elemento del DOM con el ID “canvas”.
canvas.width = window.innerWidth - 60; //Establece el ancho del lienzo restando 60 píxeles al ancho de la ventana del navegador.
canvas.height = window.innerHeight * 0.6; // Establece la altura del lienzo como el 60% de la altura de la ventana del navegador.
let context = canvas.getContext("2d"); //Obtiene el contexto 2D del lienzo para dibujar.
context.fillStyle = "white"; // : Establece el color de relleno del contexto en blanco.
context.fillRect(0, 0, canvas.width, canvas.height); // Dibuja un rectángulo blanco que cubre todo el lienzo.
let restore_array = []; // Un arreglo vacío para almacenar datos de imagen.
let stroke_color = 'black'; //Color del trazo inicializado en negro.
let stroke_width = "2"; // Ancho del trazo inicializado en 2 píxeles.
let is_drawing = false; // Bandera para rastrear si se está dibujando.

function change_color(element) {
  stroke_color = element.style.background; // Cambia el color del trazo según el elemento seleccionado.
}

function change_width(element) {
  stroke_width = element.innerHTML // Cambia el ancho del trazo según el elemento seleccionado.
}

function start(event) {
  is_drawing = true;
  context.beginPath();
  context.moveTo(getX(event), getY(event)); // Inicia el dibujo cuando se hace clic o se toca el lienzo.
  event.preventDefault();
}

function draw(event) {
  if (is_drawing) {
    context.lineTo(getX(event), getY(event));
    context.strokeStyle = stroke_color;
    context.lineWidth = stroke_width; // Dibuja mientras se arrastra el cursor o se mueve el dedo.
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }
  event.preventDefault();
}

function stop(event) {
  if (is_drawing) {
    context.stroke(); // Detiene el dibujo cuando se levanta el cursor o se levanta el dedo.
    context.closePath();
    is_drawing = false;
  }
  event.preventDefault();
  restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
  start_index += 1;
}

function getX(event) { // Obtiene la coordenada X del evento (clic o toque).
  if (event.pageX == undefined) {return event.targetTouches[0].pageX - canvas.offsetLeft}
  else {return event.pageX - canvas.offsetLeft}
  }


function getY(event) { //  Obtiene la coordenada Y del evento (clic o toque).
  if (event.pageY == undefined) {return event.targetTouches[0].pageY - canvas.offsetTop}
  else {return event.pageY - canvas.offsetTop}
}

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

function Restore() {
  if (start_index <= 0) { //  Almacena datos de imagen y permite deshacer cambios.
    Clear()
  } else {
    start_index += -1;
    restore_array.pop();
    if ( event.type != 'mouseout' ) {
      context.putImageData(restore_array[start_index], 0, 0);
    }
  }
}

function Clear() { // Limpia el lienzo por completo
    context.fillStyle = "white";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
    restore_array = [];
    start_index = -1;
}



