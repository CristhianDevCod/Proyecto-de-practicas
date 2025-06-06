import { Router } from "express";
import {
   getSectorClientes,
   getSectorClienteById,
   createSectorCliente,
   updateSectorCliente,
   deleteSectorCliente,
} from "../controllers/sectorCliente.controller.js";
import { authenticateToken } from "../../Auth/AuthMiddleware.js";

const router = Router();

router.get("/sectorClientes", authenticateToken, getSectorClientes);
router.get("/sectorClientes/:id", authenticateToken, getSectorClienteById);
router.post("/sectorClientes", authenticateToken, createSectorCliente);
router.put("/sectorClientes/:id", authenticateToken, updateSectorCliente);
router.delete("/sectorClientes/:id", authenticateToken, deleteSectorCliente);

export default router