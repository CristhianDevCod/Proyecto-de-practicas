import { Router } from "express";
import {
   getIdiomas
} from "../controllers/idioma.controller.js";
 import { authenticateToken } from "../../Auth/AuthMiddleware.js";

const router = Router();

router.get("/idiomas", authenticateToken, getIdiomas);

export default router