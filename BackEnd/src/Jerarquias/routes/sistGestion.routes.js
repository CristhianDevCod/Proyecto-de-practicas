import { Router } from "express";
import {
   getSistGestion,
   getSistGestionActivos,
   getSistGestionById,
   createSistGestion,
   updateSistGestion,
   deleteSistGestion,
} from "../controllers/sistGestion.controller.js";
import { authenticateToken } from "../../Auth/AuthMiddleware.js";

const router = Router();

router.get("/sistemasGestion", authenticateToken, getSistGestion);
router.get("/sistemasGestionactivos", authenticateToken, getSistGestionActivos);
router.get("/sistemasGestion/:id", authenticateToken, getSistGestionById);
router.post("/sistemasGestion", authenticateToken, createSistGestion);
router.put("/sistemasGestion/:id", authenticateToken, updateSistGestion);
router.delete("/sistemasGestion/:id", authenticateToken, deleteSistGestion);

export default router