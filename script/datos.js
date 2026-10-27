const TIENDA = {
  nombre: "CampoDirecto",
  slogan: "Del campesino a tu mesa",
  whatsapp: "573000000000",
  adminClave: "campo2026",
  vendedorId: "plataforma",
  vendedorNombre: "CampoDirecto"
};

const CATALOGO_INICIAL = [
  {
    id: 1,
    nombre: "Papa criolla",
    precio: 3000,
    unidad: "kg",
    descripcion: "Papa criolla fresca, cultivada sin intermediarios para llegar directo a tu mesa.",
    emoji: "🥔",
    stock: 50,
    activo: true,
    destacado: true,
    vendedorId: "plataforma",
    vendedorNombre: "CampoDirecto"
  },
  {
    id: 2,
    nombre: "Tomate chonto",
    precio: 2500,
    unidad: "kg",
    descripcion: "Tomate chonto maduro, ideal para salsas y ensaladas del día.",
    emoji: "🍅",
    stock: 40,
    activo: true,
    destacado: true,
    vendedorId: "plataforma",
    vendedorNombre: "CampoDirecto"
  },
  {
    id: 3,
    nombre: "Cebolla larga",
    precio: 1800,
    unidad: "atado",
    descripcion: "Cebolla larga fresca, lista para guisos, hogao y ajiaco.",
    emoji: "🧅",
    stock: 30,
    activo: true,
    destacado: true,
    vendedorId: "plataforma",
    vendedorNombre: "CampoDirecto"
  },
  {
    id: 4,
    nombre: "Plátano hartón",
    precio: 2200,
    unidad: "kg",
    descripcion: "Plátano verde de finca, para patacones, sancocho o tajadas.",
    emoji: "🍌",
    stock: 35,
    activo: true,
    destacado: false,
    vendedorId: "plataforma",
    vendedorNombre: "CampoDirecto"
  },
  {
    id: 5,
    nombre: "Yuca",
    precio: 2000,
    unidad: "kg",
    descripcion: "Yuca blanca, recién cosechada, suave al cocinar.",
    emoji: "🌿",
    stock: 25,
    activo: true,
    destacado: false,
    vendedorId: "plataforma",
    vendedorNombre: "CampoDirecto"
  },
  {
    id: 6,
    nombre: "Cilantro",
    precio: 1200,
    unidad: "atado",
    descripcion: "Cilantro aromático del día, para sopas y ají.",
    emoji: "🌱",
    stock: 20,
    activo: true,
    destacado: false,
    vendedorId: "plataforma",
    vendedorNombre: "CampoDirecto"
  }
];

function formatoPesos(valor) {
  return "$" + Number(valor || 0).toLocaleString("es-CO");
}

function siguienteId(lista) {
  if (!lista.length) return 1;
  return Math.max.apply(null, lista.map(function (item) { return Number(item.id) || 0; })) + 1;
}
