import { Router } from "express";
import {
   getRoles,
   getRolById,
   createRol,
   updateRol,
   deleteRol,
} from "../controllers/rol.controller.js";
import { authenticateToken } from "../../Auth/AuthMiddleware.js";

const router = Router();

router.get("/roles", authenticateToken, getRoles);
router.get("/roles/:id", authenticateToken, getRolById);
router.post("/roles", authenticateToken, createRol);
router.put("/roles/:id", authenticateToken, updateRol);
router.delete("/roles/:id", authenticateToken, deleteRol);

export default router;
