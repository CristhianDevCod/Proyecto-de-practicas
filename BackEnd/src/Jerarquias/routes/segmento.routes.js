import { Router } from "express";
import {
   getSegmentos,
   getSegmentoById,
   createSegmento,
   updateSegmento,
   deleteSegmento,
} from "../controllers/segmento.controller.js";
import { authenticateToken } from "../../Auth/AuthMiddleware.js";

const router = Router();

router.get("/segmentos", authenticateToken, getSegmentos);
router.get("/segmentos/:id", authenticateToken, getSegmentoById);
router.post("/segmentos", authenticateToken, createSegmento);
router.put("/segmentos/:id", authenticateToken, updateSegmento);
router.delete("/segmentos/:id", authenticateToken, deleteSegmento);

export default router