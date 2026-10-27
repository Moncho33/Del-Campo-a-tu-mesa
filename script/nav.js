function paginaActual() {
  var archivo = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (!archivo) return "index.html";
  return archivo;
}

function renderAppChrome(titulo) {
  var activa = paginaActual();
  var cantidad = Storage.cantidadCarrito();
  var usuario = Storage.getUsuario();

  var header = document.getElementById("app-header");
  if (header) {
    header.innerHTML =
      '<div class="brand">' +
        '<a href="index.html">' + TIENDA.nombre + '</a>' +
        '<p>' + TIENDA.slogan + '</p>' +
      '</div>' +
      '<div class="header-actions">' +
        (usuario
          ? '<span class="user-chip">' + usuario.nombre + '</span>'
          : '<a class="link-quieto" href="login.html">Entrar</a>') +
      '</div>';
  }

  if (titulo) {
    var heading = document.getElementById("page-title");
    if (heading) heading.textContent = titulo;
  }

  var nav = document.getElementById("app-nav");
  if (nav) {
    var items = [
      { href: "index.html", id: "index.html", label: "Inicio", icon: "🏠" },
      { href: "productos.html", id: "productos.html", label: "Productos", icon: "🥬" },
      { href: "carrito.html", id: "carrito.html", label: "Carrito", icon: "🛒", badge: cantidad },
      { href: "pedidos.html", id: "pedidos.html", label: "Pedidos", icon: "📦" }
    ];

    nav.innerHTML = items.map(function (item) {
      var isActive = activa === item.id ||
        (item.id === "productos.html" && activa === "producto.html") ||
        (item.id === "carrito.html" && activa === "checkout.html") ||
        (item.id === "pedidos.html" && activa === "detallepedido.html");
      var badge = item.badge
        ? '<span class="nav-badge">' + item.badge + '</span>'
        : "";
      return '<a class="' + (isActive ? "active" : "") + '" href="' + item.href + '">' +
        '<span>' + item.icon + '</span>' + item.label + badge + '</a>';
    }).join("");
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  }
}

function aviso(texto) {
  var toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = texto;
  toast.className = "toast visible";
  setTimeout(function () {
    toast.className = "toast";
  }, 2200);
}
