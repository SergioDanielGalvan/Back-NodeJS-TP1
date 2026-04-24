// app.js
import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import maestroProductosRouter from "./src/rutas/MaestroProductosRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());

// Configuración de Pug
// app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "src/views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Rutas (se irán agregando)
app.get("/", (req, res) => {
  res.json({ titulo: "TodoStock S.A." });
});

// app.use("/productos", productosRouter);
app.use("/maestroproductos", maestroProductosRouter);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ titulo: "Página no encontrada" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`),
);
