renderAppChrome("Panel de la tienda");

var loginAdmin = document.getElementById("loginAdmin");
var panelAdmin = document.getElementById("panelAdmin");
var form = document.getElementById("formProducto");
var listaAdmin = document.getElementById("listaAdmin");

function autenticado() {
  return sessionStorage.getItem("campodirecto_admin") === "ok";
}

function mostrarPanel() {
  loginAdmin.hidden = true;
  panelAdmin.hidden = false;
  pintarAdmin();
}

if (autenticado()) {
  mostrarPanel();
}

document.getElementById("btnEntrarAdmin").addEventListener("click", function () {
  var clave = document.getElementById("clave").value;
  if (clave === TIENDA.adminClave) {
    sessionStorage.setItem("campodirecto_admin", "ok");
    mostrarPanel();
  } else {
    aviso("Clave incorrecta");
  }
});

function limpiarFormulario() {
  form.reset();
  document.getElementById("productoId").value = "";
  document.getElementById("activo").checked = true;
  document.getElementById("emoji").value = "🥬";
}

function pintarAdmin() {
  var productos = Storage.getProductos();
  listaAdmin.innerHTML = "";
  productos.forEach(function (producto) {
    var li = document.createElement("li");
    li.className = "card";
    li.innerHTML =
      "<strong>" + producto.emoji + " " + producto.nombre + "</strong>" +
      "<p>" + formatoPesos(producto.precio) + " / " + producto.unidad + "</p>" +
      "<p class='muted'>" + (producto.activo ? "Visible" : "Oculto") + " · stock " + producto.stock + "</p>" +
      "<p class='vendedor'>" + producto.vendedorNombre + " (" + producto.vendedorId + ")</p>";

    var fila = document.createElement("div");
    fila.className = "btn-fila";

    var editar = document.createElement("button");
    editar.className = "btn-secundario";
    editar.textContent = "Editar";
    editar.addEventListener("click", function () {
      document.getElementById("productoId").value = producto.id;
      document.getElementById("nombre").value = producto.nombre;
      document.getElementById("precio").value = producto.precio;
      document.getElementById("unidad").value = producto.unidad;
      document.getElementById("stock").value = producto.stock;
      document.getElementById("emoji").value = producto.emoji;
      document.getElementById("descripcion").value = producto.descripcion;
      document.getElementById("activo").checked = producto.activo;
      document.getElementById("destacado").checked = producto.destacado;
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    var ocultar = document.createElement("button");
    ocultar.className = "btn-secundario";
    ocultar.textContent = producto.activo ? "Ocultar" : "Mostrar";
    ocultar.addEventListener("click", function () {
      producto.activo = !producto.activo;
      Storage.setProductos(productos);
      pintarAdmin();
    });

    fila.appendChild(editar);
    fila.appendChild(ocultar);
    li.appendChild(fila);
    listaAdmin.appendChild(li);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  var productos = Storage.getProductos();
  var id = Number(document.getElementById("productoId").value);
  var datos = {
    id: id || siguienteId(productos),
    nombre: document.getElementById("nombre").value.trim(),
    precio: Number(document.getElementById("precio").value),
    unidad: document.getElementById("unidad").value.trim(),
    stock: Number(document.getElementById("stock").value) || 0,
    emoji: document.getElementById("emoji").value.trim() || "🥬",
    descripcion: document.getElementById("descripcion").value.trim(),
    activo: document.getElementById("activo").checked,
    destacado: document.getElementById("destacado").checked,
    vendedorId: TIENDA.vendedorId,
    vendedorNombre: TIENDA.vendedorNombre
  };

  if (id) {
    productos = productos.map(function (producto) {
      return producto.id === id ? datos : producto;
    });
  } else {
    productos.push(datos);
  }

  Storage.setProductos(productos);
  limpiarFormulario();
  pintarAdmin();
  aviso("Producto guardado");
});

document.getElementById("btnCancelar").addEventListener("click", limpiarFormulario);
