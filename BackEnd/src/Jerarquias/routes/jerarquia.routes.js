import { Router } from "express";
import {
   getJerarquias,
   getJerarquiaById,
   createJerarquia,
   updateJerarquiaModified,
   updateJerarquia,
   deleteJerarquia,
   checkJerarquiaByOperacion,
   getJerarquiaByOperacionId,
} from "../controllers/jerarquia.controller.js";
import { authenticateToken } from "../../Auth/AuthMiddleware.js";

const router = Router();

router.get("/jerarquias", authenticateToken, getJerarquias);
router.get("/jerarquias/:id", authenticateToken, getJerarquiaById);
router.get("/jerarquias/check/:id_operacion", authenticateToken, checkJerarquiaByOperacion);
router.get("/jerarquias/operacion/:id_operacion", authenticateToken, getJerarquiaByOperacionId); // Nueva ruta para obtener jerarquías por operación
router.post("/jerarquias", authenticateToken, createJerarquia);
router.put("/jerarquias/modified/:id", authenticateToken, updateJerarquiaModified); // Nueva ruta para updateJerarquiaModified
router.put("/jerarquias/:id", authenticateToken, updateJerarquia);
router.delete("/jerarquias/:id", authenticateToken, deleteJerarquia);

export default router;
