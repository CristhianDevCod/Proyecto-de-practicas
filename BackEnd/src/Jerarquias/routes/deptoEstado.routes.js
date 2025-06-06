import { Router } from "express";
import {
   getDeptoEstados,
   getDeptoEstadosActivos,
   getDeptoEstadosActivosPaises,
   getDeptoEstadoById,
   getDeptoEstadoByIdNombrePais,
   createDeptoEstado,
   updateDeptoEstado,
   deleteDeptoEstado,
} from "../controllers/deptoEstado.controller.js";
import { authenticateToken } from "../../Auth/AuthMiddleware.js";

const router = Router();

router.get("/deptoEstados", authenticateToken, getDeptoEstados);
router.get("/deptoEstadosActivos", authenticateToken, getDeptoEstadosActivos);
router.get("/deptoEstadosActivosPaises/:id", authenticateToken, getDeptoEstadosActivosPaises);
router.get("/deptoEstados/:id", authenticateToken, getDeptoEstadoById);
router.get("/deptoEstadosPais/:id", authenticateToken, getDeptoEstadoByIdNombrePais);
router.post("/deptoEstados", authenticateToken, createDeptoEstado);
router.put("/deptoEstados/:id", authenticateToken, updateDeptoEstado);
router.delete("/deptoEstados/:id", authenticateToken, deleteDeptoEstado);

export default router
