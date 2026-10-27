const Storage = {
  keys: {
    carrito: "campodirecto_carrito",
    pedidos: "campodirecto_pedidos",
    productos: "campodirecto_productos",
    usuario: "campodirecto_usuario",
    pedidoSeleccionado: "campodirecto_pedido_sel"
  },

  leer(clave, fallback) {
    try {
      var raw = localStorage.getItem(clave);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  },

  guardar(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
  },

  normalizarProducto(producto) {
    return {
      id: producto.id,
      nombre: producto.nombre,
      precio: Number(producto.precio) || 0,
      unidad: producto.unidad || "kg",
      descripcion: producto.descripcion || "",
      emoji: producto.emoji || "🥬",
      stock: Number(producto.stock) || 0,
      activo: producto.activo !== false,
      destacado: Boolean(producto.destacado),
      vendedorId: producto.vendedorId || TIENDA.vendedorId,
      vendedorNombre: producto.vendedorNombre || TIENDA.vendedorNombre
    };
  },

  getProductos() {
    var guardados = this.leer(this.keys.productos, null);
    if (!guardados || !guardados.length) {
      var semilla = CATALOGO_INICIAL.map(this.normalizarProducto);
      this.guardar(this.keys.productos, semilla);
      return semilla;
    }
    var normalizados = guardados.map(this.normalizarProducto);
    this.guardar(this.keys.productos, normalizados);
    return normalizados;
  },

  getProductosActivos() {
    return this.getProductos().filter(function (producto) {
      return producto.activo;
    });
  },

  getProducto(id) {
    var numero = Number(id);
    return this.getProductos().find(function (producto) {
      return producto.id === numero;
    }) || null;
  },

  setProductos(productos) {
    this.guardar(this.keys.productos, productos.map(this.normalizarProducto));
  },

  getCarrito() {
    return this.leer(this.keys.carrito, []);
  },

  setCarrito(carrito) {
    this.guardar(this.keys.carrito, carrito);
  },

  cantidadCarrito() {
    return this.getCarrito().reduce(function (suma, item) {
      return suma + (Number(item.cantidad) || 0);
    }, 0);
  },

  agregarAlCarrito(idProducto, cantidad) {
    var producto = this.getProducto(idProducto);
    if (!producto || !producto.activo) {
      return { ok: false, mensaje: "Este producto no está disponible." };
    }

    var unidades = Number(cantidad) || 1;
    var carrito = this.getCarrito();
    var existente = carrito.find(function (item) {
      return item.id === producto.id;
    });

    if (existente) {
      existente.cantidad += unidades;
    } else {
      carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        unidad: producto.unidad,
        cantidad: unidades,
        emoji: producto.emoji,
        vendedorId: producto.vendedorId || TIENDA.vendedorId,
        vendedorNombre: producto.vendedorNombre || TIENDA.vendedorNombre
      });
    }

    this.setCarrito(carrito);
    return { ok: true, mensaje: producto.nombre + " se agregó al carrito." };
  },

  getPedidos() {
    return this.leer(this.keys.pedidos, []);
  },

  setPedidos(pedidos) {
    this.guardar(this.keys.pedidos, pedidos);
  },

  getPedidoSeleccionado() {
    return this.leer(this.keys.pedidoSeleccionado, null);
  },

  setPedidoSeleccionado(pedido) {
    this.guardar(this.keys.pedidoSeleccionado, pedido);
  },

  getUsuario() {
    return this.leer(this.keys.usuario, null);
  },

  setUsuario(usuario) {
    this.guardar(this.keys.usuario, usuario);
  },

  cerrarSesion() {
    localStorage.removeItem(this.keys.usuario);
  }
};

function totalCarrito(carrito) {
  return (carrito || Storage.getCarrito()).reduce(function (suma, item) {
    return suma + item.precio * item.cantidad;
  }, 0);
}

function mensajeWhatsApp(pedido) {
  var lineas = [
    "Hola, quiero hacer un pedido en " + TIENDA.nombre,
    "",
    "Cliente: " + pedido.cliente.nombre,
    "Teléfono: " + pedido.cliente.telefono,
    "Dirección: " + pedido.cliente.direccion
  ];

  if (pedido.cliente.notas) {
    lineas.push("Notas: " + pedido.cliente.notas);
  }

  lineas.push("", "Pedido:");
  pedido.productos.forEach(function (item) {
    lineas.push(
      "- " + item.nombre + " x " + item.cantidad + " " + (item.unidad || "") +
      " = " + formatoPesos(item.precio * item.cantidad)
    );
  });
  lineas.push("", "Total: " + formatoPesos(pedido.total));
  return lineas.join("\n");
}

function urlWhatsApp(pedido) {
  return "https://wa.me/" + TIENDA.whatsapp + "?text=" + encodeURIComponent(mensajeWhatsApp(pedido));
}
