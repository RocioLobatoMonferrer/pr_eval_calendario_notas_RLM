const pintarNotas = document.querySelector("#pintarNotas");
const btnListar = document.querySelector("#btnListar");
const btnLimpiar = document.querySelector("#btnLimpiar");
const meses = document.querySelectorAll(".mes"); 
const nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

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

function limpiar() {
    if(!confirm("¿Estás seguro de borrar todas las notas?")) {
        return false;
    }
    pintarNotas.textContent = "";
    for(let i = 0; i < meses.length; i++) {
        localStorage.removeItem("nota" + (i + 1));
        meses[i].textContent = 0;
    }
    contarNotas();
}

function listar() { // FOR: Del array con todas las notas de los meses, a solo un mes con todas su notas
    pintarNotas.textContent = "";
    for(let  i = 0; i < meses.length; i++) {
        const notaMes = cargarNotas(i + 1);
        for(let j = 0; j < notaMes.length; j++) {
            const li = document.createElement("li");
            li.textContent = `Mes: ${nombresMeses[i]} - ${notaMes[j].titulo}: ${notaMes[j].descripcion}`;
            pintarNotas.appendChild(li);
        }

    }
    contarNotas();
}
