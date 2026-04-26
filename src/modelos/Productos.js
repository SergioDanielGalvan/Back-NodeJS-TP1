import fs from "fs/promises";
import path from "path";

// let products = [];

const __dirname = import.meta.dirname;
// console.log(path.join(__dirname, "products.json"))

// fs.readFile(path.join(__dirname, "products.json"), "utf-8", (error, data) => {
//   if (error) {
//     return console.error(error);
//   }

//   products = JSON.parse(data);

//   console.log(products);
// });

export const getAllProductos = async ( categoria, stock ) => {
  try {
    const data = await fs.readFile(
      path.join( __dirname, "Productos.json"), "utf-8"  );

    var productos = JSON.parse(data);
    if ( stock ) {
      productos = productos.filter( ( producto ) => producto.stock > 0 );
    }  

    if ( categoria ) {
      return productos.filter( ( producto ) =>
        producto.categorias.includes( categoria )
      );
    }  
    return productos;

  } catch (error) {
    console.error(error);
  }
  finally {
  }

};

export const getProductoById = async (id) => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "Productos.json"),
      "utf-8"
    );

    const productos = JSON.parse(data);

    const producto = products.find((item) => item.id == id);

    return producto;
  } catch ( error ) {
    console.error(error);
  }
    finally {
  }
};

export const getProductoByNombre = async ( nombre ) => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "Productos.json"),
      "utf-8"
    );

    const productos = JSON.parse(data);

    const producto = products.find((item) => item.nombre == nombre );

    return producto;
  } catch ( error ) {
    console.error(error);
  }
    finally {
  }
};

export const createProducto = async ( nombre, precio, categorias, stock ) => {
  // Primero busco un id único para el nuevo producto
  try { const data = await fs.readFile(
      path.join(__dirname, "Productos.json"),
      "utf-8"
    );
    const productos = JSON.parse(data);
    const ids = productos.map( ( producto ) => producto.id );
    const maxId = Math.max( ...ids );
    const newId = maxId + 1;
  }
  catch ( error ) {
    console.error(error);
  }
  finally {
    newId = newId ? newId : 1; // Si no hay productos, el primer ID será 1
  }

  // Checks para validar los datos de entrada
  if ( !nombre || typeof nombre !== "string" ) {
    throw new Error( "Nombre es requerido y debe ser una cadena de texto" );
  }
  if ( !precio || typeof precio !== "number" || precio < 0 ) {
    throw new Error( "Precio es requerido y debe ser un número positivo" );
  }
  if ( !Array.isArray( categorias ) || categorias.some( cat => typeof cat !== "string" ) ) {
    throw new Error( "Categorías debe ser un array de cadenas de texto" );
  }
  if ( stock === undefined || typeof stock !== "number" || stock < 0 ) {
    throw new Error( "Stock es requerido y debe ser un número positivo" );
  }

  // Verifico contra el maestro que el producto exista ya por nombre
  const data = await fs.readFile( path.join(__dirname, "MaestroProductos.json"), "utf-8" );
  const MaestroProductos = JSON.parse(data);
  const productoMaestro = MaestroProductos.find( item => item.nombre === nombre );
  if ( !productoMaestro ) {
    throw new Error( "El producto no existe en el maestro" );
  }
  const idProducto = productoMaestro.id;

  const product = {
    id: newId,
    precio: precio,
    stock: stock,
    idProducto: idProducto
  };

  try {
    const data = await fs.readFile( path.join(__dirname, "Productos.json"), "utf-8" );
    const productos = JSON.parse(data);

    productos.push( producto ); // Agrego el nuevo producto al array

    await fs.writeFile( path.join(__dirname, "Productos.json"),
      JSON.stringify(productos, null, 2), // Guardo el array actualizado en el archivo
      "utf-8"
    );

    return product;

  } catch (error) {
    console.error(error);
  }
  finally {
  }

};

export const deleteProductoById = async ( id ) => {
  try {
    const data = await fs.readFile( path.join(__dirname, "Productos.json"), "utf-8" );
    const productos = JSON.parse(data);
    const index = productos.findIndex( ( producto ) => producto.id === id );
    if ( index === -1 ) {
      throw new Error( "Producto no encontrado" );
    }
    productos.splice( index, 1 ); // Elimino el producto del array
    await fs.writeFile( path.join(__dirname, "Productos.json"),
      JSON.stringify(productos, null, 2), // Guardo el array actualizado en el archivo
      "utf-8"
    );
    return true;
  } catch ( error ) {
    console.error('Error al eliminar producto', error);
    throw error;
  }
  finally {
  }
};

export const getAllProductosWithStock = async ( req, res ) => {
    try {
        const dataStock = await fs.readFile( path.join(__dirname, "Productos.json"), "utf-8" );
        const productosStock = JSON.parse(dataStock);
        const productosConStock = productosStock.filter( producto => producto.stock > 0 );
        const dataMaestro = await fs.readFile( path.join(__dirname, "MaestroProductos.json"), "utf-8" );
        const productosMaestro = JSON.parse(dataMaestro);
        productosConStock.forEach( producto => {
            const productoMaestro = productosMaestro.find( item => item.id === producto.idProducto );
            if ( productoMaestro ) {
                producto.nombre = productoMaestro.nombre;
                producto.categorias = productoMaestro.categorias;
                producto.EAN = productoMaestro.EAN;
            }
        } );
        return productosConStock;
    } catch ( error ) {
        console.error('Error al obtener productos con stock', error);
        throw error;
    }
    finally {
    }
};

export const getAllProductos = async ( req, res ) => {
    try {
        const data = await fs.readFile( path.join(__dirname, "Productos.json"), "utf-8" );
        const productos = JSON.parse(data);
        const dataMaestro = await fs.readFile( path.join(__dirname, "MaestroProductos.json"), "utf-8" );
        const productosMaestro = JSON.parse(dataMaestro);
        productos.forEach( producto => {
            const productoMaestro = productosMaestro.find( item => item.id === producto.idProducto );
            if ( productoMaestro ) {
                producto.nombre = productoMaestro.nombre;
                producto.categorias = productoMaestro.categorias;
                producto.EAN = productoMaestro.EAN;
            }
        } );
        return productos;
    } catch ( error ) {
        console.error('Error al obtener todos los productos', error);
        throw error;
    }
    finally {
    }
};

export const updateProductoWithStock = async ( id, nuevoStock ) => {
  try {
    const data = await fs.readFile( path.join(__dirname, "Productos.json"), "utf-8" );
    const productos = JSON.parse(data);
    const index = productos.findIndex( ( producto ) => producto.id === id );
    if ( index === -1 ) {
      throw new Error( "Producto no encontrado" );
    }
    productos[index].stock = nuevoStock; // Actualizo el stock del producto
    await fs.writeFile( path.join(__dirname, "Productos.json"),
      JSON.stringify(productos, null, 2), // Guardo el array actualizado en el archivo
      "utf-8"
    );
    return productos[index];
  } catch ( error ) {
    console.error('Error al actualizar stock del producto', error);
    throw error;
  }
  finally {
  }
};

export const updateProductoWithPrecio = async ( id, nuevoPrecio ) => {
  try {
    const data = await fs.readFile( path.join(__dirname, "Productos.json"), "utf-8" );
    const productos = JSON.parse(data);
    const index = productos.findIndex( ( producto ) => producto.id === id );
    if ( index === -1 ) {
      throw new Error( "Producto no encontrado" );
    }
    productos[index].precio = nuevoPrecio; // Actualizo el precio del producto
    await fs.writeFile( path.join(__dirname, "Productos.json"),
      JSON.stringify(productos, null, 2), // Guardo el array actualizado en el archivo
      "utf-8"
    );
    return productos[index];
  } catch ( error ) {
    console.error('Error al actualizar precio del producto', error);
    throw error;
  }
  finally {
  } 
};

export const getAllProductosByCategoria = async ( req, res ) => {
    try {
        const { categoria } = req.query;
        const data = await fs.readFile( path.join(__dirname, "Productos.json"), "utf-8" );
        const productos = JSON.parse(data);
        const productosFiltrados = productos.filter( producto => producto.categorias.includes( categoria ) );
        const dataMaestro = await fs.readFile( path.join(__dirname, "MaestroProductos.json"), "utf-8" );
        const productosMaestro = JSON.parse(dataMaestro);
        productosFiltrados.forEach( producto => {
            const productoMaestro = productosMaestro.find( item => item.id === producto.idProducto );
            if ( productoMaestro ) {
                producto.nombre = productoMaestro.nombre;
                producto.categorias = productoMaestro.categorias;
                producto.EAN = productoMaestro.EAN;
            }
        } );
        return productosFiltrados;
    } catch ( error ) {
        console.error('Error al obtener productos por categoría', error);
        throw error;
    }
    finally {
    }
};
