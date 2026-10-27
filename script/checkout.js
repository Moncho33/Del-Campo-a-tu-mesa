renderAppChrome("Confirmar pedido");

var carrito = Storage.getCarrito();
var resumen = document.getElementById("resumenPedido");
var totalTexto = document.getElementById("totalCheckout");
var form = document.getElementById("checkoutForm");
var usuario = Storage.getUsuario();

if (!carrito.length) {
  window.location.href = "carrito.html";
  return;
}

if (usuario) {
  document.getElementById("nombre").value = usuario.nombre || "";
}

carrito.forEach(function (item) {
  var li = document.createElement("li");
  li.textContent = item.nombre + " x " + item.cantidad + " = " + formatoPesos(item.precio * item.cantidad);
  resumen.appendChild(li);
});
totalTexto.textContent = "Total: " + formatoPesos(totalCarrito(carrito));

form.addEventListener("submit", function (event) {
  event.preventDefault();

  var cliente = {
    nombre: document.getElementById("nombre").value.trim(),
    telefono: document.getElementById("telefono").value.trim(),
    direccion: document.getElementById("direccion").value.trim(),
    notas: document.getElementById("notas").value.trim()
  };

  if (!cliente.nombre || !cliente.telefono || !cliente.direccion) {
    aviso("Completa nombre, teléfono y dirección.");
    return;
  }

  var pedido = {
    id: Date.now(),
    fecha: new Date().toLocaleString("es-CO"),
    fechaIso: new Date().toISOString(),
    productos: carrito,
    total: totalCarrito(carrito),
    estado: "Pendiente",
    cliente: cliente,
    vendedorId: TIENDA.vendedorId,
    vendedorNombre: TIENDA.vendedorNombre
  };

  var pedidos = Storage.getPedidos();
  pedidos.push(pedido);
  Storage.setPedidos(pedidos);
  Storage.setPedidoSeleccionado(pedido);
  Storage.setCarrito([]);

  if (usuario) {
    usuario.nombre = cliente.nombre;
    usuario.telefono = cliente.telefono;
    usuario.direccion = cliente.direccion;
    Storage.setUsuario(usuario);
  }

  window.open(urlWhatsApp(pedido), "_blank");
  window.location.href = "detallePedido.html";
});
