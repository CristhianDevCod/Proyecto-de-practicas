import { Router } from "express";
import {
   getCiudades,
   getCiudadesActivas,
   getCiudadesActivasDeptos,
   getCiudadById,
   getCiudadByIdDepartamento,
   createCiudad,
   updateCiudad,
   deleteCiudad,
} from "../controllers/ciudad.controller.js";
import { authenticateToken } from "../../Auth/AuthMiddleware.js";


const router = Router();

router.get("/ciudades", authenticateToken, getCiudades);
router.get("/ciudadesActivas", authenticateToken, getCiudadesActivas);
router.get("/ciudadesActivasDeptos/:id", authenticateToken, getCiudadesActivasDeptos);
router.get("/ciudades/:id", authenticateToken, getCiudadById);
router.get("/ciudadesDepartamentos/:id", authenticateToken, getCiudadByIdDepartamento);
router.post("/ciudades", authenticateToken, createCiudad);
router.put("/ciudades/:id", authenticateToken, updateCiudad);
router.delete("/ciudades/:id", authenticateToken, deleteCiudad);

export default router