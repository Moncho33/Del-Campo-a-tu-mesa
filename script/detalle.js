renderAppChrome();

var params = new URLSearchParams(window.location.search);
var producto = Storage.getProducto(params.get("id"));
var caja = document.getElementById("detalleProducto");

if (!producto || !producto.activo) {
  caja.innerHTML = '<p class="vacio">No encontramos este producto.</p><a class="btn" href="productos.html">Volver al catálogo</a>';
} else {
  document.title = producto.nombre + " | CampoDirecto";
  caja.innerHTML =
    '<div class="emoji">' + producto.emoji + '</div>' +
    '<h2>' + producto.nombre + '</h2>' +
    '<p class="descripcion muted">' + producto.descripcion + '</p>' +
    '<span class="precio">' + formatoPesos(producto.precio) + ' / ' + producto.unidad + '</span>' +
    '<p class="vendedor">Vende ' + producto.vendedorNombre + '</p>' +
    '<div class="qty">' +
      '<button type="button" id="menos">-</button>' +
      '<strong id="cantidad">1</strong>' +
      '<button type="button" id="mas">+</button>' +
    '</div>' +
    '<div class="acciones">' +
      '<button type="button" id="btnAgregar">Agregar al carrito</button>' +
      '<a class="btn-secundario" href="productos.html">Volver</a>' +
    '</div>';

  var cantidad = 1;
  var etiqueta = document.getElementById("cantidad");

  document.getElementById("mas").addEventListener("click", function () {
    cantidad += 1;
    etiqueta.textContent = cantidad;
  });

  document.getElementById("menos").addEventListener("click", function () {
    if (cantidad > 1) cantidad -= 1;
    etiqueta.textContent = cantidad;
  });

  document.getElementById("btnAgregar").addEventListener("click", function () {
    var resultado = Storage.agregarAlCarrito(producto.id, cantidad);
    aviso(resultado.mensaje);
    renderAppChrome();
  });
}
