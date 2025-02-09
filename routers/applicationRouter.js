import { Router } from "express";
import { applicationController } from "../controllers/business/applicationController.js";
import { authMiddleware } from "../middlewares/auth/authMiddleware.js";

export const applicationRouter = Router();

applicationRouter.get('/:id', applicationController.getApplication);
applicationRouter.get('/', authMiddleware, applicationController.ApplicationsGET);
applicationRouter.put('/file/:id', applicationController.updateApplication);
applicationRouter.get('/getKey', applicationController.downloadKey);