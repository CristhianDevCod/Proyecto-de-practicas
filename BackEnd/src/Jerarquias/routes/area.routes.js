import { Router } from "express";
import {
   getAreas,
   getAreaById,
   createArea,
   updateArea,
   deleteArea
} from "../controllers/area.controller.js";
import { authenticateToken } from "../../Auth/AuthMiddleware.js";

const router = Router();

router.get("/areas", authenticateToken, getAreas);
router.get("/areas/:id", authenticateToken, getAreaById);
router.post("/areas", authenticateToken, createArea);
router.put("/areas/:id", authenticateToken, updateArea);
router.delete("/areas/:id", authenticateToken, deleteArea);

export default router;
