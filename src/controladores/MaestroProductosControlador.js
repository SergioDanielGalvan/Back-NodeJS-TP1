import * as model from "../modelos/MaestroProductos.js";

export const getAllProductos = async ( req, res ) => {
  try {
    const productos = await model.getAllProductos( '', false );
    if ( !productos ) {
      return res.status(404).json({ error: "Productos no encontrados" });
    }
    res.status(200).json( productos );
  } catch ( error ) {
    res.status(500).json({ error: "Error del servidor" });
  }

};

export const getAllProductosByCategoria = async ( req, res ) => {
  try {
    const { categoria } = req.params;
    const productos = await model.getAllProducts( categoria, false );
    if ( !productos ) {
      return res.status(404).json({ error: "Productos no encontrados" });
    }
    res.status(200).json( productos );
  } catch ( error ) {
    res.status(500).json({ error: "Error del servidor" });
  }
  finally {
  }
};