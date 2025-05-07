// Clase que representa una sola pregunta de la encuesta
class Pregunta {
  constructor(texto, opciones) {
    this.texto = texto; // Texto de la pregunta
    this.opciones = opciones; // Opciones de respuesta (array)
    this.votes = new Array(opciones.length).fill(0); // Se crea un array del mismo largo que las opciones, lleno de ceros, para contar los votos por opción
  }
  // Método para votar por una opción específica
  vote(opcionesIndex) {
    if (opcionesIndex >= 0 && opcionesIndex < this.opciones.length) { // evita errores de índice, por ejemplo, si el usuario ingresa un número fuera del rango de opciones
      this.votes[opcionesIndex]++; // Suma 1 voto a la opción seleccionada
    } else {
      console.error("Índice de opción inválido."); // Control de flujo ante errores
    }
  }
  // Obtener resultados como array de strings
  Mostrar() {
    return this.opciones.map(
      (opcion, i) => `${opcion}: ${this.votes[i]} votos`
    );
  }
}
// Clase para manejar una encuesta completa con varias preguntas
class Encuesta {
  constructor(nombre) {
    this.nombre = nombre;
    this.preguntas = []; // Contenedor de preguntas (objetos Pregunta)
    this.permitirVotar = false;
  }
  // Agrega una pregunta nueva a la encuesta
  agregarPreguntas(preguntaTexto, opciones) {
    if (opciones.length < 2) {
      console.error("Una pregunta debe tener al menos 2 opciones.");
      return;
    }
    const pregunta = new Pregunta(preguntaTexto, opciones); // Se crea un nuevo objeto Pregunta
    this.preguntas.push(pregunta);// Se agrega a la lista de preguntas
  }
  finalizarEncuesta() {
    const total = this.preguntas.length;
    if (total < 8) {
      const faltan = 8 - total;
      console.log(`Debes agregar al menos 8 preguntas. Faltan ${faltan}.`);
      return;
    }

    this.permitirVotar = true;
    console.log(" Encuesta finalizada. Ahora puedes comenzar a votar.");
  }
  // Método para votar en una pregunta específica
  vote(preguntaIndex, opcionesIndex) {
    if (
      preguntaIndex >= 0 &&
      preguntaIndex < this.preguntas.length &&
      this.preguntas.length >= 8
    ) {
      this.preguntas[preguntaIndex].vote(opcionesIndex); // vota por la opción seleccionada de la pregunta correspondiente
    } else {
      console.log("La encuesta no está activa para votar, faltan preguntas.");
      return;
    }
  }
  // Muestra los resultados de todas las preguntas
  mostrarResultados() {
    console.log(`Resultados para: ${this.nombre}`);
    this.preguntas.forEach((q, i) => {
      console.log(`\n${i + 1}. ${q.texto}`);
      q.Mostrar().forEach((result) => console.log("- " + result));
    });
  }
}
// interaccion con el usuario//ahora como funcion
function crearYVotarEncuesta() {
  const titulo = prompt("Ingresa el título de tu encuesta:");
  const encuesta = new Encuesta(titulo);
  // Agregar 8 preguntas
  for (let i = 0; i < 8; i++) {
    const texto = prompt(`Escribe el texto de la pregunta ${i + 1}:`);
    const opciones = [];
    for (let j = 0; j < 3; j++) {
      const opcion = prompt(
        `Ingresa la opción ${j + 1} para la pregunta ${i + 1}:`
      );
      opciones.push(opcion);
    }
    encuesta.agregarPreguntas(texto, opciones);
  }
  // Agregar más preguntas si se desea
  let agregarMas = confirm("¿Deseas agregar más preguntas a la encuesta?");
  while (agregarMas) {
    const texto = prompt("Escribe el texto de la nueva pregunta:");
    const opciones = [];
    for (let j = 0; j < 3; j++) {
      const opcion = prompt(`Ingresa la opción ${j + 1}:`);
      opciones.push(opcion);
    }
    encuesta.agregarPreguntas(texto, opciones);
    agregarMas = confirm("¿Deseas agregar otra pregunta más?");
  }
  encuesta.finalizarEncuesta();
  // Votación
  let seguirVotando = true;
  while (seguirVotando) {
    let preguntaIndex =
      parseInt(
        prompt(
          `¿Sobre qué pregunta quieres votar? (1 a ${encuesta.preguntas.length})`
        )
      ) - 1;

    if (
      isNaN(preguntaIndex) ||
      preguntaIndex < 0 ||
      preguntaIndex >= encuesta.preguntas.length
    ) {
      alert("Número de pregunta inválido.");
      continue;
    }

    const pregunta = encuesta.preguntas[preguntaIndex];
    let opcionesTexto = "";
    pregunta.opciones.forEach((opcion, i) => {
      opcionesTexto += `${i + 1}. ${opcion}\n`;
    });

    let opcionElegida =
      parseInt(
        prompt(`\n${pregunta.texto}\n${opcionesTexto}\nElige una opción:`)
      ) - 1;

    if (
      isNaN(opcionElegida) ||
      opcionElegida < 0 ||
      opcionElegida >= pregunta.opciones.length
    ) {
      alert("Opción inválida.");
      continue;
    }
    encuesta.vote(preguntaIndex, opcionElegida);
    seguirVotando = confirm("¿Deseas seguir votando?");
  }
  encuesta.mostrarResultados();
}
// Función principal que permite crear varias encuestas
function iniciarSistemaEncuestas() {
  let crearOtra = true;
  while (crearOtra) {
    crearYVotarEncuesta();
    crearOtra = confirm("¿Deseas crear otra encuesta?");
  }
}
// Ejecutar el sistema
iniciarSistemaEncuestas();
