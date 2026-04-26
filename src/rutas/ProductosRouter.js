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
router.get("/productos/:id", getProductoById);
router.get("/productos/nombre/:nombre", getProductoByNombre);
router.get("/productos/categoria", getAllProductosByCategoria);

// Rutas de productos Privadas
router.get("/productos/stock", getAllProductosWithStock);
router.post("/productos", createProducto);
// Privada y Admin
router.delete("/productos/:id", deleteProductoById);
router.put("/productos/stock/:id", updateProductoWithStock);
router.put("/productos/precio/:id", updateProductoWithPrecio);
router.post("/productos/compra", crearRegistroCompra);

export default router;