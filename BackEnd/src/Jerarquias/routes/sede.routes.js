import { Router } from "express";
import {
   getSedes,
   getSedesActivasCiudades,
   getSedeById,
   getSedeByIdNombreCiudad,
   createSede,
   updateSede,
   deleteSede,
} from "../controllers/sede.controller.js";
import { authenticateToken } from "../../Auth/AuthMiddleware.js";

const router = Router();

router.get("/sedes", authenticateToken, getSedes);
router.get("/sedesActivasCiudades/:id", authenticateToken, getSedesActivasCiudades);
router.get("/sedes/:id", authenticateToken, getSedeById);
router.get("/sedesCiudades/:id", authenticateToken, getSedeByIdNombreCiudad);
router.post("/sedes", authenticateToken, createSede);
router.put("/sedes/:id", authenticateToken, updateSede);
router.delete("/sedes/:id", authenticateToken, deleteSede);

export default router