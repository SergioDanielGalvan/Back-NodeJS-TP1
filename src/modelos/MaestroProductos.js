import fs from "fs/promises";
import path from "path";

const __dirname = import.meta.dirname;
const filePath = path.join(__dirname, "MaestroProductos.json");

const obtenerTodos = async () => {
  return await leerArchivo();
};

const obtenerPorId = async (id) => {
  const productos = await leerArchivo();
  return productos.find((p) => String(p.idProducto) === String(id));
};

const guardar = async (producto) => {
  const productos = await leerArchivo();

  productos.push(producto);

  await escribirArchivo(productos);

  return producto;
};

const actualizar = async (id, productoActualizado) => {
  const productos = await leerArchivo();

  const index = productos.findIndex((p) => String(p.idProducto) === String(id));

  if (index === -1) return null;

  productos[index] = {
    ...productos[index],
    ...productoActualizado,
  };

  await escribirArchivo(productos);

  return productos[index];
};

const eliminar = async (id) => {
  const productos = await leerArchivo();

  const index = productos.findIndex((p) => String(p.idProducto) === String(id));

  if (index === -1) return null;

  productos.splice(index, 1);

  await escribirArchivo(productos);

  return true;
};

const leerArchivo = async () => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

const getAllProductos = async ( categoria ) => {
  try {
    const data = await fs.readFile( path.join( __dirname, "Productos.json"), "utf-8" );

    var productos = JSON.parse(data);

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

const escribirArchivo = async (data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

export default {
  obtenerTodos,
  obtenerPorId,
  guardar,
  actualizar,
  eliminar,
  getAllProductos
};
