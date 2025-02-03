import { Router } from "express";
import { applicationController } from "../controllers/business/applicationController.js";

export const applicationRouter = Router();

applicationRouter.get('/:id', applicationController.getApplication);
applicationRouter.get('/', applicationController.ApplicationsGET);
applicationRouter.put('/file/:id', applicationController.updateApplication);