import * as modelProductos from "../modelos/Productos.js";
import * as modelMaestro from "../modelos/MaestroProductos.js";

export const getAllProductos = async ( req, res ) => {
    try {
        const productosMaestro = await modelMaestro.getAllProductos( '', false );
        if ( !productosMaestro ) {
            return res.status(404).json({ error: "Productos en Maestro no encontrados" });
        }
        // Datos de stock para cada producto
        const productosConStock = await modelProductos.getAllProductos( '', false );
        if ( !productosConStock ) {
            return res.status(404).json({ error: "Productos en stock no encontrados" });
        }
        productosConStock.forEach( producto => {
            const productoMaestro = productosMaestro.find( item => item.id === producto.id );
            if ( productoMaestro ) {
                producto.nombre = productoMaestro.nombre;
                producto.categorias = productoMaestro.categorias;
                producto.EAN = productoMaestro.EAN;
            }
        } );
        res.status(200).json( productosConStock );
    } catch ( error ) {
        res.status(500).json({ error: "Error del servidor" });
    }
    finally {
    }
};

export const getAllProductosByCategoria = async ( req, res ) => {
    try {
        const { categoria } = req.params;
        const productosMaestro = await modelMaestro.getAllProducts( categoria, false );
        if ( !productosMaestro ) {
            return res.status(404).json({ error: "Productos en Maestro no encontrados" });
        }
        // Datos de stock para cada producto
        const productosConStock = await modelProductos.getAllProductos( categoria, false );
        if ( !productosConStock ) {
            return res.status(404).json({ error: "Productos en stock no encontrados" });
        }
        productosConStock.forEach( producto => {
            const productoMaestro = productosMaestro.find( item => item.id === producto.id );
            if ( productoMaestro ) {
                producto.nombre = productoMaestro.nombre;
                producto.categorias = productoMaestro.categorias;
                producto.EAN = productoMaestro.EAN;
            }
        } );
        res.status(200).json( productosConStock );
    } catch ( error ) {
      res.status(500).json({ error: "Error del servidor" });
    }
    finally {
    }
};

export const getProductoById = async ( req, res ) => {
  try {
    const { id } = req.params;
    const productoenStock = await modelProductos.getProductoById( id );
    if ( !productoenStock ) {
        return res.status(404).json({ error: "Producto en stock no encontrado" });
    }   
    const productoEnMaestro = await modelMaestro.getProductoById( id );
    if ( !productoEnMaestro ) {
        return res.status(404).json({ error: "Producto en Maestro no encontrado" });
    }
    productoenStock.nombre = productoEnMaestro.nombre;
    productoenStock.categorias = productoEnMaestro.categorias;
    productoenStock.EAN = productoEnMaestro.EAN;
    res.status(200).json( productoenStock );
  }
    catch ( error ) {
        res.status(500).json({ error: "Error del servidor" });
    }
    finally {

    }
};

