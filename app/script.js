document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username");
    if (!username) {
      window.location.href = "./index.html";
    }
  });
  

const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#enter')
const titulo = document.getElementById('titulo-tareas')
const check = 'bi-check-circle'
const uncheck = 'bi-circle'
const lineThrough = 'line-through'
let id
let LIST


if (document.getElementById('elemento') == null) {
    titulo.textContent = "Sin tareas pendientes"
}

const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString('es-MX', { weekday: 'long', month: 'long', day: 'numeric' })


function agregarTarea(tarea, id, realizado, eliminado) {

    if (eliminado) return;

    const REALIZADO = realizado ? check : uncheck;
    const LINE = realizado ? lineThrough : '';

    const elemento = document.createElement('li');
    elemento.id = 'elemento';
    elemento.classList.add('slide-in');
    elemento.innerHTML = `
        <i class="bi ${REALIZADO}" data="realizado" id="${id}"></i>
        <p class="text ${LINE}">${tarea}</p>
        <i class="bi bi-trash" data="eliminado" id="${id}"></i>
    `;
    lista.insertBefore(elemento, lista.firstChild);

}


botonEnter.addEventListener('click', () => {
    const tarea = input.value;

    if (tarea) {
        agregarTarea(tarea, id, false, false);
        LIST.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false,
        });
        localStorage.setItem('TODO', JSON.stringify(LIST));
        input.value = '';
        id++;
        actualizarTitulo();
        ajustarAlturaLista();
    }
});


document.addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        const tarea = input.value;
        if (tarea) {
            agregarTarea(tarea, id, false, false);
            LIST.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false,
            });
            localStorage.setItem('TODO', JSON.stringify(LIST));
            input.value = '';
            id++;
            actualizarTitulo();
            ajustarAlturaLista();
        }
    }
});



function tareaRealizada(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ? false : true
}

function tareaEliminada(element) {
    const tarea = element.parentNode;
    tarea.classList.add('slide-out');

    tarea.addEventListener('animationend', () => {
        lista.removeChild(tarea);
        actualizarTitulo();
        ajustarAlturaLista();
    });

    LIST[element.id].eliminado = true;
}


lista.addEventListener('click', function (event) {
    const element = event.target
    const elementData = element.attributes.data.value

    if (elementData == 'realizado') {
        tareaRealizada(element)
    }
    else if (elementData == 'eliminado') {
        tareaEliminada(element)
    }
    localStorage.setItem('TODO', JSON.stringify(LIST))

    if (document.getElementById('elemento') == null) {
        titulo.textContent = "Sin tareas pendientes"
    }

})

function actualizarTitulo() {
    const tareasVisibles = lista.querySelectorAll('li').length;
    if (tareasVisibles === 0) {
        titulo.textContent = "Sin tareas pendientes";
    } else {
        titulo.textContent = "Estas son tus tareas pendientes";
    }
}

function ajustarAlturaLista() {
    const altura = lista.scrollHeight;
    lista.style.height = `${altura}px`;
}



let data = localStorage.getItem('TODO');
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    cargarLista(LIST);
    actualizarTitulo();
    ajustarAlturaLista();
} else {
    LIST = [];
    id = 0;
    actualizarTitulo();
    ajustarAlturaLista();
}


function cargarLista(DATA) {
    DATA.forEach(function (i) {
        agregarTarea(i.nombre, i.id, i.realizado, i.eliminado)
    })

}

document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username")
    if (!username) {
        window.location.href = "../index.html";
    } else {
        document.getElementById("username").textContent = username;
    }
}
)

document.getElementById("clearStorageButton").addEventListener("click", () => {
    localStorage.clear();
    alert("Se han eliminado los datos del usuario.");
    window.location.href = "../index.html";
});
