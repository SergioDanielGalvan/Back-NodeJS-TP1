// src/controladores/MaestroproductosControlador.js

// Simulamos una base de datos en memoria mientras no tengas el repositorio JSON
let productos = [
  { id: 1, nombre: 'Lavandina 1L', categoria: 'Limpieza', stockMinimo: 10 },
  { id: 2, nombre: 'Detergente 500ml', categoria: 'Limpieza', stockMinimo: 5 },
];

export const getAllProductos = (req, res) => {
  res.json(productos);
};

export const getProductoById = (req, res) => {
  const producto = productos.find(p => p.id == req.params.id);
  if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(producto);
};

export const getProductoByNombre = (req, res) => {
  const filtrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(req.params.nombre.toLowerCase())
  );
  res.json(filtrados);
};

export const getAllProductosByCategoria = (req, res) => {
  const { categoria } = req.query;
  if (!categoria) return res.status(400).json({ error: 'Falta parámetro categoria' });
  const filtrados = productos.filter(p => p.categoria === categoria);
  res.json(filtrados);
};

export const getProductoByEAN = (req, res) => {
  // Simulación: como no tenemos EAN, devolvemos 404 o un mensaje
  res.status(404).json({ error: 'Búsqueda por EAN no implementada aún' });
};

export const createProducto = (req, res) => {
  const nuevo = { id: Date.now(), ...req.body };
  productos.push(nuevo);
  res.status(201).json(nuevo);
};

export const deleteProductoById = (req, res) => {
  const index = productos.findIndex(p => p.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });
  productos.splice(index, 1);
  res.json({ mensaje: 'Producto eliminado' });
};