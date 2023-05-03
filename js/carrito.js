const pintarCarrito = () => {
    ticketContent.innerHTML = "";
    ticketContent.style.display = "flex";

    const ticketCarrito = document.createElement("div");
    
    ticketCarrito.className = "ticket-carrito";
    ticketCarrito.innerHTML = `
    <h1 class="ticket-title">Su Carrito</h1>
    `;
    ticketContent.append(ticketCarrito);

    const ticketButton = document.createElement("h1");
    ticketButton.innerText = "X";
    ticketButton.className = "ticket-button";

    ticketButton.addEventListener("click", () => {
        ticketContent.style.display = "none";
    });

    ticketCarrito.append(ticketButton);

    carrito.forEach((producto) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "ticket-container";
        carritoContent.innerHTML = `
            <img src="${producto.img}">
            <h3 class="texto">${producto.nombre}</h3>
            <p class="precio"> $ ${producto.precio}</p>
            <span class="restar"> - </span>
            <h5 class="cantidad"> x ${producto.cantidad}</h5>
            <span class="sumar"> + </span>
            <span class="delete-product"> ❌ </span>
        `;

        ticketContent.append(carritoContent);

        let restar = carritoContent.querySelector(".restar");

        restar.addEventListener("click", () => {
            if(producto.cantidad !== 1) {
                producto.cantidad--;
            }
            saveLocal();
            pintarCarrito();
        });

        let sumar = carritoContent.querySelector(".sumar");

        sumar.addEventListener("click", () => {
            producto.cantidad++;
            saveLocal();
            pintarCarrito();
        });

        let eliminar = carritoContent.querySelector(".delete-product");
        eliminar.addEventListener("click", alerta)

        function alerta() {
            Swal.fire({
                icon: 'success',
                title: 'Perfecto',
                text: 'El producto se elimino corectamente!',
              })
        };

        eliminar.addEventListener("click", () => {
            eliminarProducto(producto.id);
        });
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `Total a pagar: $ ${total}`;
    ticketContent.append(totalBuying);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });

    carritoGlobo();
    saveLocal();
    pintarCarrito();
};

const carritoGlobo = () => {
    cantidadCarrito.style.display = "block";

    const carritoLenght = carrito.length;

    localStorage.setItem("carritoLenght", JSON.stringify(carritoLenght))
    
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLenght"));
};

carritoGlobo();