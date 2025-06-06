import { Router } from "express";
import {
   getTipoServicios,
   getTipoServiciosActivos,
   getTipoServicioById,
   createTipoServicio,
   updateTipoServicio,
   deleteTipoServicio,
} from "../controllers/tipoServicio.controller.js";
import { authenticateToken } from "../../Auth/AuthMiddleware.js";

const router = Router();

router.get("/tipoServicios", authenticateToken, getTipoServicios);
router.get("/tipoServiciosActivos", authenticateToken, getTipoServiciosActivos);
router.get("/tipoServicios/:id", authenticateToken, getTipoServicioById);
router.post("/tipoServicios", authenticateToken, createTipoServicio);
router.put("/tipoServicios/:id", authenticateToken, updateTipoServicio);
router.delete("/tipoServicios/:id", authenticateToken, deleteTipoServicio);

export default router