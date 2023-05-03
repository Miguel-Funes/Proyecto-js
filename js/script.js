const shopContent = document.getElementById("shopContent");
fetch("data.json")
    .then((response) => response.json())    
    .then((productos) =>{
        renderizarTarjetas(productos)
    })
const verCarrito = document.getElementById("verCarrito");
const ticketContent = document.getElementById("ticketContent");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/*BUSCADOR*/
let buscador = document.getElementById("buscador")
buscador.addEventListener("input", filtrarPorNombre)

function filtrarPorNombre() {
    fetch("data.json")   
        .then((response) => response.json())
        .then((productos) => {
        let arrayFiltrado = productos.filter(producto => producto.nombre.includes(buscador.value.toLowerCase()))
        renderizarTarjetas(arrayFiltrado)
    })
}
/*FILTRO CATEGORIAS*/
let filtro = document.getElementById("filtro")
filtro.addEventListener("change", filtrarPorCategoria)

function filtrarPorCategoria() {
    fetch("data.json")   
        .then((response) => response.json())
        .then((productos) => {
        if (filtro.value === "todos") {
            renderizarTarjetas(productos)
        } else {
            let arrayFiltrado = productos.filter(producto => producto.categoria === filtro.value)
            renderizarTarjetas(arrayFiltrado)
        }
    })
}
/*CARDS*/
function renderizarTarjetas(productos){
    shopContent.innerHTML = ""
    productos.forEach((producto)=> {
        let contenedor = document.createElement("div");
        contenedor.className = "card";
        contenedor.innerHTML = `
            <img class="photo" src="${producto.img}">
            <h3 class="text">${producto.nombre}</h3>
            <p class="price">${producto.valor + producto.precio}</p>
        `;
        
        shopContent.append(contenedor);
        
        let comprar = document.createElement("button");
        comprar.innerText = "🛒" + "Agregar al carrito";
        comprar.className = "comprar";
        
        contenedor.append(comprar);
        
        comprar.addEventListener("click", () =>{
            const repeat = carrito.some((repeatProducto) => repeatProducto.id === producto.id);
        
            if (repeat){
                carrito.map((prod) => {
                    if(prod.id === producto.id){
                        prod.cantidad++;
                    }
                });
            } else {
            carrito.push({
                id: producto.id,
                img: producto.img,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: producto.cantidad,
            });
            carritoGlobo();
            saveLocal();
            }
        });
    });
};
/*LOCAL STORAGE*/
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

/*
const getProducts = async () => {
    const response = await fetch("data.json");
    const data = await response.json();
};
*/
/*
getProducts();
*/