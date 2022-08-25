
//Variables
let carrito = []
let total = 0

// DOM
const contenedorDeProductos = document.getElementById("contenedor-productos")
const contenedorDeCarrito = document.getElementById("contenedor-carrito")


//      LOCAL STORAGE

document.addEventListener("DOMContentLoaded", () => {
    localStorage.getItem("carrito") ? carrito = JSON.parse(localStorage.getItem("carrito")): console.log("No hay nada en local storage");
    verCarrito()

})

//FETCH 

fetch('/data/productos.json')
    .then(res => res.json())
    .then(productos => {
        productos.forEach((producto) => {
            const divProducto = document.createElement("div")
            divProducto.classList.add("divProducto")
            divProducto.innerHTML = `
            <img src= "${producto.imagen}" alt = "${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <h3> Precio : $ ${producto.precio} </h3>
            <button id= "agregar${producto.id}" class="botonAgregar">Agregar</button>
            `
            //APPENDS
            contenedorDeProductos.appendChild(divProducto)

            //funciones sobre carrito
            const agregarAlCarrito = (prodId) => {
                const item = productos.find((prod) => prod.id === prodId)
                carrito.push(item)
                verCarrito()
            }

            //BOTON AGREGAR
            const boton = document.getElementById(`agregar${producto.id}`)
            boton.classList.add("botonAgregar")
            boton.addEventListener("click", () => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Producto agregado',
                    showConfirmButton: false,
                    timer: 1500
                })
                agregarAlCarrito(producto.id)
            })
        })

    }
    )



// pintar productos en carrito
const verCarrito = () => {

    contenedorDeCarrito.innerHTML = ""
    carrito.forEach((producto) => {
        const divCarrito = document.createElement("div")
        divCarrito.classList.add("divCarrito")
        divCarrito.innerHTML = `
        <img src= "${producto.imagen}" alt = "${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <h3> Precio : $ ${producto.precio} </h3>

        `
        // boton eliminar
        const botonEliminar = document.createElement("button")
        botonEliminar.classList.add("botonEliminar")
        botonEliminar.innerText = "Eliminar"
        botonEliminar.addEventListener("click", () => {
            eliminarDelCarrito(producto.id)

        })

        // appends



        divCarrito.appendChild(botonEliminar)
        contenedorDeCarrito.appendChild(divCarrito)
        // Guardadando en  localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito))


    }
    )
    // calculo total de compra
    const pTotal = document.getElementById("precio-total")
    pTotal.innerText = carrito.reduce((contador, producto) => contador + producto.precio, 0)
    // contador de productos
    const contador = document.getElementById("contador-carrito")
    contador.innerText = carrito.length

}

//FUNCIONES SOBRE CARRITO


// BOTON VACIAR
const borrarCarrito = document.getElementById("boton-vaciar")
borrarCarrito.addEventListener("click", () => {
    Swal.fire({
        title: 'Estas seguro?',
        text: "No podrás revertir esto.!",
        icon: 'Cuidado',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Eliminado',
                'Su carrito ha sido eliminado',
                'Listo'
            )
            carrito.length = 0
            verCarrito()
            localStorage.clear()
        }
    })


})

//BOTON ELIMINAR
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    verCarrito()
}



