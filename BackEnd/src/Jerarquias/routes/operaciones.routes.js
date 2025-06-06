import { Router } from "express";
import {
   getOperaciones,
   getOperacionesTotals,
   getOperacionByIdCliente,
   getOperacionByIdClienteSelected,
   getOperacionByIdClienteSelectedNew,
   getOperacionesById,
   createOperaciones,
   updateOperaciones,
   deleteOperaciones,
} from "../controllers/operaciones.controller.js";
import { authenticateToken } from "../../Auth/AuthMiddleware.js";

const router = Router();

router.get("/operaciones", authenticateToken, getOperaciones);
router.get("/operacionesTotales", authenticateToken, getOperacionesTotals);
router.get("/operacionesByIdCliente/:id/:idOper/:idServicio", authenticateToken, getOperacionByIdCliente);
router.get("/operacionesByIdClienteSelected/:id", authenticateToken, getOperacionByIdClienteSelected);
router.get("/operacionesByIdClienteSelectedNew/:id", authenticateToken, getOperacionByIdClienteSelectedNew);
router.get("/operaciones/:id", authenticateToken, getOperacionesById);
router.post("/operaciones", authenticateToken, createOperaciones);
router.put("/operaciones/:id", authenticateToken, updateOperaciones);
router.delete("/operaciones/:id", authenticateToken, deleteOperaciones);

export default router