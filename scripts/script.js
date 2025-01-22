const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#enter')
const titulo = document.getElementById('titulo-tareas')
const check='bi-check-circle'
const uncheck='bi-circle'
const lineThrough='line-through'
let id
let LIST

// Local Storage : almacena la info cuando cierro el navegador
// Sesion Storage: se pierde la info cuando cierro el navegador

// Agregar la fecha actual
const FECHA = new Date() 
fecha.innerHTML=FECHA.toLocaleDateString('es-MX', {weekday: 'long', month: 'long', day: 'numeric'})

// if(document.getElementById('elemento')==null){
//     titulo.textContent="Sin tareas pendientes"
// }

// Funcion agregar tarea
function agregarTarea(tarea, id, realizado, eliminado){

    if(eliminado){return}

    const REALIZADO = realizado ?check :uncheck
    const LINE = realizado ?lineThrough :''
    // <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
    // <i class="fas ${REALIZADO}" data="realizado" id="${id}"></i>
    const elemento = `<li id="elemento">
                        <i class="bi ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="bi bi-trash" data="eliminado" id="${id}"></i>
                      </li>`
    lista.insertAdjacentHTML("afterbegin",elemento)
}


botonEnter.addEventListener('click',()=> {

    titulo.textContent = 'Estas son tus tareas pendientes'

    const tarea = input.value
    if(tarea) { //existe la tarea?
        agregarTarea(tarea, id, false, false)
        LIST.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false,
        })
    }
    localStorage.setItem('TODO',JSON.stringify(LIST))
    input.value=''
    id++
    
}) 

document.addEventListener('keyup', function(event){
    if(event.key=='Enter'){
        const tarea = input.value
        if(tarea) { //existe la tarea?
            agregarTarea(tarea, id, false, false)
            LIST.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false,
            })
        }
        localStorage.setItem('TODO',JSON.stringify(LIST))
        input.value=''
        id++
        
    }
})

// Funcion tarea Realizada
function tareaRealizada(element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough) //Del elemento traido, ve al padre y accede a la clase .text mediante el querySelector
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true
}

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true

}

lista.addEventListener('click', function(event){
    const element = event.target
    const elementData = element.attributes.data.value

    if(elementData=='realizado'){
        tareaRealizada(element)
    }
    else if(elementData=='eliminado'){
        tareaEliminada(element)
    }
    localStorage.setItem('TODO',JSON.stringify(LIST))

    if(document.getElementById('elemento')==null){
        titulo.textContent="Sin tareas pendientes"
    }

})


// local storage get item

let data = localStorage.getItem('TODO')
if(data){
    LIST=JSON.parse(data)
    id=LIST.length
    cargarLista(LIST)
}else{
    LIST = []
    id = 0
}

function cargarLista(DATA){
    DATA.forEach(function(i){
        agregarTarea(i.nombre, i.id, i.realizado, i.eliminado)
    })

}

document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username")
    if (!username) {
      window.location.href = "index.html"; // Redirige al inicio de sesión si no hay usuario
    } else {
      document.getElementById("username").textContent = username;
    }
}
)

document.getElementById("clearStorageButton").addEventListener("click", () => {
    localStorage.clear(); // Borra todos los datos del localStorage
    alert("Se han eliminado los datos del usuario.");
    window.location.href = "inicio-sesion.html"; // Redirige al inicio de sesión
  });