renderAppChrome();

var pedido = Storage.getPedidoSeleccionado();
var lista = document.getElementById("detalleLista");
var totalTexto = document.getElementById("totalPedido");
var titulo = document.getElementById("tituloPedido");
var estadoTexto = document.getElementById("estadoPedido");
var datosCliente = document.getElementById("datosCliente");
var btnEntregado = document.getElementById("btnEntregado");
var btnWhatsApp = document.getElementById("btnWhatsApp");

if (!pedido) {
  titulo.textContent = "No hay pedido seleccionado";
  btnEntregado.hidden = true;
  btnWhatsApp.hidden = true;
} else {
  titulo.textContent = "Pedido #" + pedido.id;
  datosCliente.textContent = pedido.cliente
    ? pedido.cliente.nombre + " · " + pedido.cliente.telefono + " · " + pedido.cliente.direccion
    : "Pedido sin datos de cliente";
  estadoTexto.innerHTML = '<span class="estado ' + (pedido.estado || "").toLowerCase() + '">' + pedido.estado + "</span>";

  (pedido.productos || []).forEach(function (item) {
    var li = document.createElement("li");
    li.textContent = item.nombre + " · " + item.cantidad + " × " + formatoPesos(item.precio) +
      " = " + formatoPesos(item.precio * item.cantidad);
    lista.appendChild(li);
  });

  totalTexto.textContent = "Total: " + formatoPesos(pedido.total);
  btnWhatsApp.href = urlWhatsApp(pedido);
}

btnEntregado.addEventListener("click", function () {
  if (!pedido) return;
  pedido.estado = "Entregado";
  var pedidos = Storage.getPedidos().map(function (item) {
    return item.id === pedido.id ? pedido : item;
  });
  Storage.setPedidos(pedidos);
  Storage.setPedidoSeleccionado(pedido);
  estadoTexto.innerHTML = '<span class="estado entregado">Entregado</span>';
  aviso("Pedido marcado como entregado");
});
