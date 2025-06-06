import { Router } from "express";
import {
  createAsignacionBase,
  getBasesByIds,
  generateTemplate,
  uploadAndValidate,
  generarCSV,

} from "../controllers/bases.controller.js";
import { authenticateToken } from "../../Auth/AuthMiddleware.js";

const router = Router();

router.post("/bases", authenticateToken, createAsignacionBase);
router.get("/bases/:id", authenticateToken, getBasesByIds);
router.post("/bases/generate-template", generateTemplate);
router.post("/bases/upload-file", uploadAndValidate);
router.get("/bases/download-csv/:id", generarCSV);

export default router;
