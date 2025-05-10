// variable global para almacenar las encuestas
const encuestas = [];

function crearPregunta(texto, opciones) {
    if (opciones.length < 2) {
      console.error("Una pregunta necesita al menos 2 opciones.");
      return null;
    }
    const votos = opciones.map(() => 0); // Inicializa votos con ceros
    return [texto, opciones, votos]; // Array en lugar de objeto 
  }

  //Pide opciones de respuestas 
function ingresarOpciones() {
  let cantidad = parseInt(prompt("¿Cuántas opciones deseas ingresar?\n(mínimo 2, dejar en blanco para 3)"));

  if (isNaN(cantidad) || cantidad < 2) {
    cantidad = 3;
    alert("Se usarán 3 opciones por defecto.");
  }
  const opciones=[];
  for (let i = 0; i < cantidad; i++) {
    const opcion = prompt(`Ingresa la opción ${i + 1}:`);
    opciones.push(opcion);
  }
  return opciones;
}
  function crearEncuesta() {
    const titulo = prompt("Ingrese el título de la encuesta:");
    let preguntasDATA = [];
  //8 preguntas por defecto
    for (let i = 0; i < 8; i++) {
      const texto = prompt(`Escribe el texto de la pregunta ${i + 1}:`);
      const opciones = ingresarOpciones();
      const pregunta = crearPregunta(texto, opciones);
      if (pregunta) preguntasDATA.push(pregunta);
    }
  
    let agregarMas = confirm("¿Deseas agregar más preguntas?");
    while (agregarMas) {
      const texto = prompt("Escribe el texto de la nueva pregunta:");
      const opciones = ingresarOpciones(); // Llama a la función para ingresar opciones

      const pregunta = crearPregunta(texto, opciones);
      if (pregunta) preguntasDATA.push(pregunta);
      agregarMas = confirm("¿Deseas agregar otra pregunta?");// se redefine el agregarmas
    }
  
    const encuesta = [titulo, preguntasDATA]; // [título, [[texto, opciones, votos], ...]]
    encuestas.push(encuesta);
    console.log(`Encuesta "${titulo}" creada con éxito.`);
    return encuesta;
  }
//votarpregunta
function votarPregunta(pregunta) {
  const [texto, opciones, votos] = pregunta;
  let opcionesTexto = opciones.map((op, i) => `${i + 1}. ${op}`).join("\n");
  const respuesta = parseInt(prompt(`${texto}\n${opcionesTexto}\nElige una opción:`)) - 1;

  if (respuesta>=0 && respuesta < opciones.length) {
    votos[respuesta]++
  }else {
    alert("Opción inválida.");
  }
}
//Votar encuesta
function votarEnEncuesta(encuesta) {
  const [titulo, preguntas] = encuesta;
  alert(`Comienza la votación para la encuesta: ${titulo}`);

  let seguirVotando = true;

  while (seguirVotando) {
    // Generar listado de preguntas con sus textos
    let listadoPreguntas = preguntas.map(([texto], i) => `${i + 1}. ${texto}`).join("\n");
    const preguntaIndex = parseInt(prompt(
      `¿Sobre qué pregunta deseas votar?\n${listadoPreguntas}\n\nIngresa el número de la pregunta:`)) - 1;

    if (preguntaIndex >= 0 && preguntaIndex < preguntas.length) {
      votarPregunta(preguntas[preguntaIndex]);
    } else {
      alert("Número de pregunta inválido.");
      continue;
    }

    seguirVotando = confirm("¿Deseas votar en otra pregunta?");
  }
}
//Muestra los resultados de la encuesta
function mostrarResultados(encuesta) {
  const [titulo, preguntas] = encuesta;
  console.log(`Resultados para la encuesta: "${titulo}"`);

  preguntas.forEach(([texto, opciones, votos], index) => {
    console.log(`\n${index + 1}. ${texto}`);
    opciones.forEach((op, i) => {
      console.log(`- ${op}: ${votos[i]} voto(s)`);
    });
  });
}

function iniciarSistemaEncuestas() {
  let continuar = true;
  while (continuar) {
    const encuesta = crearEncuesta();
    votarEnEncuesta(encuesta);
    mostrarResultados(encuesta);
    continuar = confirm("¿Deseas crear otra encuesta?");
  }
}


iniciarSistemaEncuestas();
