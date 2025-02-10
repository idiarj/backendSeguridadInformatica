import { Router } from "express";
import { applicationController } from "../controllers/business/applicationController.js";
import { authMiddleware } from "../middlewares/auth/authMiddleware.js";

export const applicationRouter = Router();

applicationRouter.get('/admin', authMiddleware, applicationController.getApplicationsAdmin);
applicationRouter.get('/user/:id', authMiddleware, applicationController.getApplicationsUser);
applicationRouter.get('/getKey', applicationController.downloadKey);