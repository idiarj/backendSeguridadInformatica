import { Router } from "express";
import { SenderController } from "../controllers/business/senderController.js";


export const senderRouter = Router();

senderRouter.post('/docx', SenderController.sendDocx);
