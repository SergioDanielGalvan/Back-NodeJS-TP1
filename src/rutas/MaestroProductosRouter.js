// src/rutas/ProductosRouter.js
import { Router } from "express";

const router = Router();

import {
  getAllProductos,
  getProductoById,
  getProductoByNombre,
  getAllProductosByCategoria,
  getProductoByEAN,
  createProducto,
  deleteProductoById,
} from "../controladores/MaestroproductosControlador.js";
  
// Rutas de productos Públicas
router.get("/maestroproductos", getAllProductos);
router.get("/maestroproductos/:id", getProductoById);
router.get("/maestroproductos/nombre/:nombre", getProductoByNombre);
router.get("/maestroproductos/categoria", getAllProductosByCategoria);
//router.get('/maestroproductos/:ean([0-9]{13})', getProductoByEAN );
router.get("/maestroproductos/:ean", getProductoByEAN );

// Rutas de productos Privadas
router.post("/maestroproductos", createProducto);
// Privada y Admin
router.delete("/maestroproductos/:id", deleteProductoById);

export default router;