renderAppChrome();

var destacados = Storage.getProductosActivos().filter(function (producto) {
  return producto.destacado;
});

if (!destacados.length) {
  destacados = Storage.getProductosActivos().slice(0, 3);
}

pintarProductos(document.getElementById("destacados"), destacados);
