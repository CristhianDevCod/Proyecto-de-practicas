import { Router } from "express";
import {
   getServicios,
   getServicioById,
   createServicio,
   updateServicio,
   deleteServicio,
   postEjemploFormGen,
   createServicioCampanaFormGen,
   getServicioCampanaFormGenById
} from "../controllers/servicio.controller.js";
 import { authenticateToken } from "../../Auth/AuthMiddleware.js";

const router = Router();

router.get("/servicios", authenticateToken, getServicios);
router.get("/servicios/:id", authenticateToken, getServicioById);
router.post("/servicios", authenticateToken, createServicio);
router.put("/servicios/:id", authenticateToken, updateServicio);  
router.delete("/servicios/:id", authenticateToken, deleteServicio);
router.post("/servicios/ejemploFormGen", authenticateToken, postEjemploFormGen);
router.post("/servicios/servicios_campanas", authenticateToken, createServicioCampanaFormGen);
router.get("/servicios/servicios_campanas/:id", getServicioCampanaFormGenById);

export default router