// src/rutas/ProductosRouter.js
import { Router } from "express";

const router = Router();

import {
  getAllProductos,
  getProductoById,
  getProductoByNombre,
  getAllProductosByCategoria,
  getAllProductosWithStock,
  createProducto,
  deleteProductoById,
  updateProductoWithStock,
  updateProductoWithPrecio,
  crearRegistroCompra
} from "../controladores/ProductosControlador.js";

// Rutas de productos Públicas
router.get("/productos", getAllProductos);
router.get("/api/productos/:id", getProductoById);
router.get("/api/productos/nombre/:nombre", getProductoByNombre);
router.get("/api/productos/categoria", getAllProductosByCategoria);

// Rutas de productos Privadas
router.get("/api/productos/stock", getAllProductosWithStock);
router.post("/api/productos", createProducto);
// Privada y Admin
router.delete("/api/productos/:id", deleteProductoById);
router.put("/api/productos/stock/:id", updateProductoWithStock);
router.put("/api/productos/precio/:id", updateProductoWithPrecio);
router.post("/api/productos/compra", crearRegistroCompra);

export default router;