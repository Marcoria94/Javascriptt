// buscador
const filtrar = () => {
   // console.log(buscador.value);
   const mensaje = buscador.value.toLowerCase()
}

const buscador = document.getElementById("buscador")
buscador.addEventListener("keyup" , filtrar)


