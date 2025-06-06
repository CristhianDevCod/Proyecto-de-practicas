import { Router } from "express";
import {
   getPersonsByCargo,
} from "../controllers/persona.controller.js";
import { authenticateToken } from "../../Auth/AuthMiddleware.js";

const router = Router();

router.get("/personas/personasByCargo/:cargo", authenticateToken, getPersonsByCargo);

export default router;
