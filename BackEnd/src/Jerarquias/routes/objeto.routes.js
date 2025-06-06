import { Router } from "express";
import {
   getObjetos,
   getObjetoById,
   createObjeto,
   updateObjeto,
   deleteObjeto,
} from "../controllers/objeto.controller.js";
import { authenticateToken } from "../../Auth/AuthMiddleware.js";

const router = Router();

router.get("/objetos", authenticateToken, getObjetos);
router.get("/objetos/:id", authenticateToken, getObjetoById);
router.post("/objetos", authenticateToken, createObjeto);
router.put("/objetos/:id", authenticateToken, updateObjeto);
router.delete("/objetos/:id", authenticateToken, deleteObjeto);

export default router