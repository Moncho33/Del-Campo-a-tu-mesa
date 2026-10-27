renderAppChrome("Carrito");

var lista = document.getElementById("listaCarrito");
var totalTexto = document.getElementById("total");
var mensajeVacio = document.getElementById("mensajeVacio");
var btnCheckout = document.getElementById("btnCheckout");

function renderCarrito() {
  var carrito = Storage.getCarrito();
  lista.innerHTML = "";
  totalTexto.textContent = "";
  mensajeVacio.textContent = "";

  if (!carrito.length) {
    mensajeVacio.textContent = "Tu carrito está vacío.";
    totalTexto.textContent = "Total: $0";
    btnCheckout.style.pointerEvents = "none";
    btnCheckout.style.opacity = "0.5";
    return;
  }

  btnCheckout.style.pointerEvents = "";
  btnCheckout.style.opacity = "1";

  carrito.forEach(function (producto) {
    var li = document.createElement("li");
    li.className = "card";
    var subtotal = producto.precio * producto.cantidad;
    li.innerHTML =
      "<strong>" + producto.emoji + " " + producto.nombre + "</strong>" +
      "<p class='muted'>" + formatoPesos(producto.precio) + " / " + (producto.unidad || "und") + "</p>" +
      "<p>Cantidad: " + producto.cantidad + "</p>" +
      "<p>Subtotal: " + formatoPesos(subtotal) + "</p>" +
      "<p class='vendedor'>Vende " + (producto.vendedorNombre || TIENDA.vendedorNombre) + "</p>";

    var fila = document.createElement("div");
    fila.className = "btn-fila";

    var btnMenos = document.createElement("button");
    btnMenos.className = "btn-secundario";
    btnMenos.textContent = "-";
    btnMenos.addEventListener("click", function () {
      if (producto.cantidad > 1) {
        producto.cantidad -= 1;
      } else {
        carrito = carrito.filter(function (item) { return item.id !== producto.id; });
      }
      Storage.setCarrito(carrito);
      renderCarrito();
      renderAppChrome();
    });

    var btnMas = document.createElement("button");
    btnMas.className = "btn-secundario";
    btnMas.textContent = "+";
    btnMas.addEventListener("click", function () {
      producto.cantidad += 1;
      Storage.setCarrito(carrito);
      renderCarrito();
      renderAppChrome();
    });

    var btnEliminar = document.createElement("button");
    btnEliminar.className = "btn-peligro";
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", function () {
      carrito = carrito.filter(function (item) { return item.id !== producto.id; });
      Storage.setCarrito(carrito);
      renderCarrito();
      renderAppChrome();
    });

    fila.appendChild(btnMenos);
    fila.appendChild(btnMas);
    fila.appendChild(btnEliminar);
    li.appendChild(fila);
    lista.appendChild(li);
  });

  totalTexto.textContent = "Total: " + formatoPesos(totalCarrito(carrito));
}

renderCarrito();
