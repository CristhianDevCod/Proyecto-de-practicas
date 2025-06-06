import { Router } from "express";
import {
   getOperacion,
   getOperacionById,
   createOperacion,
   updateOperacion,
   deleteOperacion,
} from "../controllers/operacion.controller.js";
import { authenticateToken } from "../../Auth/AuthMiddleware.js";

const router = Router();

router.get("/operacion", authenticateToken, getOperacion);
router.get("/operacion/:id", authenticateToken, getOperacionById);
router.post("/operacion", authenticateToken, createOperacion);
router.put("/operacion/:id", authenticateToken, updateOperacion);
router.delete("/operacion/:id", authenticateToken, deleteOperacion);

export default router