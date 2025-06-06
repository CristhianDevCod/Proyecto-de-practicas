import { Router } from "express";
import {
   getClientes,
   getClienteById,
   getClientesActivos,
   createCliente,
   updateCliente,
   updateClienteEstado,
   deleteCliente,
} from "../controllers/cliente.controller.js";
import { authenticateToken } from "../../Auth/AuthMiddleware.js";

const router = Router();

router.get("/clientes", authenticateToken, getClientes);
router.get("/clientes/:id", authenticateToken, getClienteById);
router.get("/clientesActivos", authenticateToken, getClientesActivos);
router.post("/clientes", authenticateToken, createCliente);
router.put("/clientes/:id", authenticateToken, updateCliente);
router.put("/clientesEstado/:id", authenticateToken, updateClienteEstado);
router.delete("/clientes/:id", authenticateToken, deleteCliente);

export default router;
