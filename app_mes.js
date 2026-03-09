/**
 * DOM
 */
const tituloHead = document.querySelector("h1");
const listaNotas = document.querySelector("#listaNotas");
const inpTitulo = document.querySelector("#inpTitulo");
const inpDescripcion = document.querySelector("#inpDescripcion");
const btnAgregar= document.querySelector("#btnAgregar");
const msg = document.querySelector("#msg");
const timeOut = 2000;

/**
 * Lista de Meses
 */
const nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

let notas = [];
let notasMeses;


// nombreMeses empieza en cero, mientras que mes empieza en 1 por HTML, 
// por eso, para que coga el array le -1

// notasMeses sirve para que separe cada mes correspondientemente sus notas

function init() {
    const params = new URLSearchParams(window.location.search);
    const mes = Number(params.get("mes"));
    tituloHead.textContent = "Notas de " + nombresMeses[mes - 1];
    notasMeses = "nota" + mes;
    notas = cargarNotas();

    render();

    btnAgregar.addEventListener("click", () => {
        if(!validad()) {
            return;
        }
        insertarNota();
    })
    
}

init();

function validad() {
    if(!inpTitulo.checkValidity()) {
        mostrarMensaje("Debes colocar un título de mínimo dos caracteres");
        return false;
    }
    if(!inpDescripcion.checkValidity()) {
        mostrarMensaje("Debes colocar una descripción de mínimo dos caracteres");
        return false;
    }
    return true;
}

function pintarListaNotas() {
    listaNotas.textContent = "";
    for(let i = 0; i < notas.length; i++) {
        const div = document.createElement("div");
        const li = document.createElement("li");
        const borrar = document.createElement("button");
        const editar = document.createElement("button");

        li.textContent = notas[i];
        borrar.textContent = "Borrar";
        editar.textContent = "Editar";

        listaNotas.appendChild(div);
        div.appendChild(li);
        div.appendChild(borrar);
        div.appendChild(editar);

        li.innerHTML = `Título: ${notas[i].titulo}<br>
        Descripción: ${notas[i].descripcion}<br>`;

        borrar.addEventListener("click", () => borrarNota(i));
        editar.addEventListener("click", () => editarNota(i));
    }
}

function borrarNota(indice) {
     if(!confirm("¿Estás seguro de borrar esta nota?")) {
        return false;
    }
    notas.splice(indice, 1);
    localStorage.setItem(notasMeses, JSON.stringify(notas));
    render();
}

function editarNota(indice) {
    const editNota = notas[indice];
    inpTitulo.value = editNota.titulo;
    inpDescripcion.value = editNota.descripcion;

    notas.splice(indice, 1);
    localStorage.setItem(notasMeses, JSON.stringify(notas));

    pintarListaNotas();
}

function render() {
    pintarListaNotas();
}

function crearNota() {
    const nota = {
        titulo: inpTitulo.value,
        descripcion: inpDescripcion.value
    };
    return nota;
}

function insertarNota() {
    const nota = crearNota();
    if(!nota) {
        return null;
    } else {
        notas.push(nota);
        localStorage.setItem(notasMeses, JSON.stringify(notas));
        inpTitulo.value = "";
        inpDescripcion.value = "";
        pintarListaNotas();
    }
}

function cargarNotas() {
  const raw = localStorage.getItem(notasMeses);

  if (!raw) return [];

  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    alert("JSON inválido:", error);
    return [];
  }
}

function mostrarMensaje(texto) {
    msg.innerHTML = `${texto}<br>`
    setTimeout(function() {
        limpiarMensaje();
    }, timeOut);
}

function limpiarMensaje() {
    msg.textContent = "";
}

