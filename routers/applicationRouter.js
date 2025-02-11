import { Router } from "express";
import { applicationController } from "../controllers/business/applicationController.js";
import { authMiddleware } from "../middlewares/auth/authMiddleware.js";

export const applicationRouter = Router();

applicationRouter.get('/admin/:id_user/:user_type', applicationController.getApplicationsAdmin);
applicationRouter.get('/user/:id',  applicationController.getApplicationsUser);
applicationRouter.get('/getKey', applicationController.downloadKey);
applicationRouter.get('/download/:id', applicationController.downloadApplication);
applicationRouter.put('/update/:id',  applicationController.updateApplicationStatus);