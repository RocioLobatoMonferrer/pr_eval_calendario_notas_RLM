/* ==========================================================
   1) REFERENCIAS AL DOM 
   ========================================================== */

const pintarNotas = document.querySelector("#pintarNotas");
const btnListar = document.querySelector("#btnListar");
const btnLimpiar = document.querySelector("#btnLimpiar");
const meses = document.querySelectorAll(".mes"); 
const msg = document.querySelector("#msg");


/* ==========================================================
   2) VARIABLES GLOBALES 
   ========================================================== */

const timeOut = 2000;
const nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];



/* ==========================================================
   3) INICIALIZACIÓN (eventos) 
   ========================================================== */


function init() {
    contarNotas();

    btnListar.addEventListener("click", () => {
        listar();
    });

    btnLimpiar.addEventListener("click", () => {
        limpiar();
    });

}

init();

/* ==========================================================
   4) CARGA DE DATOS
   ========================================================== */

function cargarNotas(mes) {
  const key = "nota" + mes;  
  const raw = localStorage.getItem(key);

  if (!raw) return [];

  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    alert("JSON inválido:", error);
    return [];
  }
}

/* ==========================================================
   5) CONTADORES
   ========================================================== */

function contarNotas() {
    for(let i = 0; i < meses.length; i++) {
        const contador = cargarNotas(i + 1); // Devuelve un array con todas las notas 
        meses[i].textContent = contador.length; // Necesario para obtener el número como tal

        const th = meses[i].closest("th");

        if(contador.length > 0) {
            th.classList.add("completada");
        } else {
             th.classList.remove("completada");
        }
    }
}

/* ==========================================================
   6) PINTAR Y LIMPIAR LOS MENSAJES Y LISTAS 
   ========================================================== */

function listar() { // FOR: Del array con todas las notas de los meses, a solo un mes con todas su notas
    pintarNotas.textContent = "";
    let ok = false;
    for(let i = 0; i < meses.length; i++) {            
        const notaMes = cargarNotas(i + 1);
        if(notaMes.length > 0) {
            ok = true;
            for(let j = 0; j < notaMes.length; j++) {
                const li = document.createElement("li");
                li.textContent = `Mes: ${nombresMeses[i]} - ${notaMes[j].titulo}: ${notaMes[j].descripcion}`;
                pintarNotas.appendChild(li);
            }
        } 
    }
    if (!ok) {
        mostrarMensaje("No hay notas disponibles");
    }
    contarNotas();
}

function limpiar() {
    let ok = false;
    if(!confirm("¿Estás seguro de borrar todas las notas?")) {
        return false;
    }
    pintarNotas.textContent = "";
    for(let i = 0; i < meses.length; i++) {
        const clave = "nota" + (i + 1);
        if(localStorage.getItem(clave) !== null) {
            localStorage.removeItem("nota" + (i + 1));
            meses[i].textContent = 0;
            ok = true;
        }
    }
    if(!ok) {
        mostrarMensaje("No tienes ninguna nota para borrar");
    }
    contarNotas();
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