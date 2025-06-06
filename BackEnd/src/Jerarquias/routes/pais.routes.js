import { Router } from "express";
import {
   getPaises,
   getPaisesActivos,
   getPaisById,
   createPais,
   updatePais,
   deletePais,
} from "../controllers/pais.controller.js";
import { authenticateToken } from "../../Auth/AuthMiddleware.js";

const router = Router();

router.get("/paises", authenticateToken, getPaises);
router.get("/paisesActivos", authenticateToken, getPaisesActivos);
router.get("/paises/:id", authenticateToken, getPaisById);
router.post("/paises", authenticateToken, createPais);
router.put("/paises/:id", authenticateToken, updatePais);
router.delete("/paises/:id", authenticateToken, deletePais);

export default router