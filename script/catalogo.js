function tarjetaProducto(producto) {
  return (
    '<article class="card card-producto">' +
      '<div class="emoji">' + producto.emoji + '</div>' +
      '<div>' +
        '<h3>' + producto.nombre + '</h3>' +
        '<span class="precio">' + formatoPesos(producto.precio) + ' / ' + producto.unidad + '</span>' +
        '<p class="vendedor">Vende ' + producto.vendedorNombre + '</p>' +
        '<div class="btn-fila">' +
          '<a class="btn-secundario" href="producto.html?id=' + producto.id + '">Ver</a>' +
          '<button type="button" data-add="' + producto.id + '">Agregar</button>' +
        '</div>' +
      '</div>' +
    '</article>'
  );
}

function pintarProductos(contenedor, productos) {
  if (!contenedor) return;
  if (!productos.length) {
    contenedor.innerHTML = '<p class="vacio">No hay productos disponibles por ahora.</p>';
    return;
  }
  contenedor.innerHTML = productos.map(tarjetaProducto).join("");
  contenedor.querySelectorAll("[data-add]").forEach(function (boton) {
    boton.addEventListener("click", function () {
      var resultado = Storage.agregarAlCarrito(boton.getAttribute("data-add"), 1);
      aviso(resultado.mensaje);
      renderAppChrome();
    });
  });
}
