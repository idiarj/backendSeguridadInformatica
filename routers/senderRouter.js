import { Router } from "express";
import { SenderController } from "../controllers/business/senderController.js";
import { authMiddleware } from "../middlewares/auth/authMiddleware.js";

export const senderRouter = Router();

senderRouter.post('/txt', authMiddleware, SenderController.sendTxt);
