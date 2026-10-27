renderAppChrome("Mis pedidos");

var listaPedidos = document.getElementById("listaPedidos");
var mensaje = document.getElementById("mensaje");
var pedidos = Storage.getPedidos().slice().reverse();

if (!pedidos.length) {
  mensaje.textContent = "Aún no tienes pedidos en este celular.";
} else {
  mensaje.textContent = "Estos pedidos quedaron guardados en tu navegador.";
  pedidos.forEach(function (pedido) {
    var li = document.createElement("li");
    li.className = "card";
    li.innerHTML =
      "<strong>Pedido #" + pedido.id + "</strong>" +
      "<p>Total: " + formatoPesos(pedido.total) + "</p>" +
      "<p>Fecha: " + pedido.fecha + "</p>" +
      '<p><span class="estado ' + (pedido.estado || "").toLowerCase() + '">' + pedido.estado + "</span></p>" +
      "<p class='vendedor'>Vende " + (pedido.vendedorNombre || TIENDA.vendedorNombre) + "</p>";

    var btnVer = document.createElement("button");
    btnVer.textContent = "Ver detalle";
    btnVer.addEventListener("click", function () {
      Storage.setPedidoSeleccionado(pedido);
      window.location.href = "detallePedido.html";
    });
    li.appendChild(btnVer);
    listaPedidos.appendChild(li);
  });
}
