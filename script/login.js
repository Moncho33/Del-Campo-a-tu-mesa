renderAppChrome("Tu cuenta");

var form = document.getElementById("loginForm");
var usuario = Storage.getUsuario();
var btnCerrar = document.getElementById("cerrarSesion");

if (usuario) {
  document.getElementById("nombre").value = usuario.nombre || "";
  document.getElementById("correo").value = usuario.correo || "";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  Storage.setUsuario({
    nombre: document.getElementById("nombre").value.trim(),
    correo: document.getElementById("correo").value.trim()
  });
  aviso("Sesión guardada en este celular");
  window.location.href = "productos.html";
});

btnCerrar.addEventListener("click", function () {
  Storage.cerrarSesion();
  aviso("Sesión cerrada");
  renderAppChrome();
  form.reset();
});
