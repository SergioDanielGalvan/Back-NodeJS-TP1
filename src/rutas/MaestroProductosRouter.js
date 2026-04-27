// src/rutas/MaestroProductosRouter.js
import { Router } from "express";

/*
router.get('/', (req, res) => {
  res.json({ mensaje: 'API de productos funcionando' });
});
*/

import {
  getAllProductos,
  getProductoById,
  getProductoByNombre,
  getAllProductosByCategoria,
  getProductoByEAN,
  createProducto,
  deleteProductoById,
} from "../controladores/MaestroProductosControlador.js";

const router = Router();


// Rutas de productos Públicas
router.get('/', getAllProductos);   // Esto hará que la raíz devuelva todos los productos
router.get("/:id", getProductoById);
router.get("/maestroproductos/nombre/:nombre", getProductoByNombre);
router.get("/maestroproductos/categoria", getAllProductosByCategoria);
//router.get('/maestroproductos/:ean([0-9]{13})', getProductoByEAN );
router.get("/maestroproductos/:ean", getProductoByEAN );

// Rutas de productos Privadas
router.post("/maestroproductos", createProducto);
// Privada y Admin
router.delete("/maestroproductos/:id", deleteProductoById);

export default router;