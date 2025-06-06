import { Router } from "express";
import {
   getCanalesAtencion,
   getCanalesAtencionActivos,
   getCanalAtencionById,
   createCanalAtencion,
   updateCanalAtencion,
   deleteCanalAtencion,
} from "../controllers/canalAtencion.controller.js";
import {  authenticateToken } from "../../Auth/AuthMiddleware.js";

const router = Router();

router.get("/canalesAtencion", authenticateToken, getCanalesAtencion);
router.get("/canalesAtencionActivos", authenticateToken, getCanalesAtencionActivos);
router.get("/canalesAtencion/:id", authenticateToken, getCanalAtencionById);
router.post("/canalesAtencion", authenticateToken, createCanalAtencion);
router.put("/canalesAtencion/:id", authenticateToken, updateCanalAtencion);
router.delete("/canalesAtencion/:id", authenticateToken, deleteCanalAtencion);

export default router