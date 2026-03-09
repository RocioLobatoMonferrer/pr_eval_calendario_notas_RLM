const pintarNotas = document.querySelector("#pintarNotas");
const btnListar = document.querySelector("#btnListar");
const btnLimpiar = document.querySelector("#btnLimpiar");
const clavesMeses = ["nota_1", "nota_2", "nota_3", "nota_4", "nota_5", "nota_6", 
    "nota_7", "nota_8", "nota_9", "nota_10", "nota_11", "nota_12"];
const meses = document.querySelectorAll(".mes"); // contador

let notas = [];

function init() {
    const params = new URLSearchParams(window.location.search);
    const mes = Number(params.get("mes"));
    notas = cargarNotas();
    contarNotas();

    btnListar.addEventListener("click", () => {

    });

    btnLimpiar.addEventListener("click", () => {

    });

}

init();

function contarNotas() {
    for(let i = 0; i < notas.length; i++) {
        let contador = notas[i].length;
        meses[i].textContent = contador;
    }
}

function cargarNotas() {
    let allNotas = [];
    for(let i = 0; i < clavesMeses.length; i++) {
        const clave = clavesMeses[i];
        const raw = localStorage.getItem(clave);
    
        try {
            const notas = raw ? JSON.parse(raw) : []; //JSON a Array
            allNotas.push(Array.isArray(notas) ? notas : []);
        } catch (error) {
            alert.error("JSON inválido:", error);
            allNotas.push([]);
        }
    }
    return allNotas;
}

function limpiar() {

}

function listar() {
    
}
