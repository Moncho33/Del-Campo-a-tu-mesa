var CACHE = "campodirecto-v1";
var ARCHIVOS = [
  "./",
  "./index.html",
  "./productos.html",
  "./producto.html",
  "./carrito.html",
  "./checkout.html",
  "./pedidos.html",
  "./detallePedido.html",
  "./login.html",
  "./admin.html",
  "./style/style.css",
  "./script/datos.js",
  "./script/storage.js",
  "./script/nav.js",
  "./script/catalogo.js",
  "./script/index.js",
  "./script/productos.js",
  "./script/detalle.js",
  "./script/carrito.js",
  "./script/checkout.js",
  "./script/pedidos.js",
  "./script/detallePedido.js",
  "./script/login.js",
  "./script/admin.js",
  "./manifest.json",
  "./icons/icon.svg"
];

self.addEventListener("install", function (event) {
  event.waitUntil(caches.open(CACHE).then(function (cache) {
    return cache.addAll(ARCHIVOS);
  }));
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (key) {
        return key !== CACHE;
      }).map(function (key) {
        return caches.delete(key);
      }));
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (respuesta) {
      return respuesta || fetch(event.request);
    })
  );
});
