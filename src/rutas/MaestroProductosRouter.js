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
  updateProductoWithPrecio  
} from "../controladores/MaestroproductosControlador.js";
  
// Rutas de productos Públicas
router.get("/maestroproductos", getAllProductos);
router.get("/maestroproductos/:id", getProductoById);
router.get("/maestroproductos/nombre/:nombre", getProductoByNombre);
router.get("/maestroproductos/categoria", getAllProductosByCategoria);
router.get('/maestroproductos/:ean([0-9]{13})', getAllProductosByEAN );

// Rutas de productos Privadas
router.post("/maestroproductos", createProducto);
// Privada y Admin
router.delete("/maestroproductos/:id", deleteProductoById);
router.put("/maestroproductos/stock/:id", updateProductoWithStock);
router.put("/maestroproductos/precio/:id", updateProductoWithPrecio);

export default router;