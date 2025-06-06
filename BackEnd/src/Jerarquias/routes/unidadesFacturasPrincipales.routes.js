import { Router } from "express";
import {
   getUnidadesFacturasPrincipalesActivas
} from "../controllers/unidadesFacturasPrincipales.controller.js";
 import { authenticateToken } from "../../Auth/AuthMiddleware.js";

const router = Router();

router.get("/unidades_facturas", authenticateToken, getUnidadesFacturasPrincipalesActivas);

export default router