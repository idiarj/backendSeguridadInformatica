import { Router } from "express";
import { AuthController } from "../controllers/auth/authController.js";
import { authMiddleware } from "../middlewares/auth/authMiddleware.js";


export const authRouter = Router();

authRouter.post('/login', authMiddleware, AuthController.login);
authRouter.post('/register', AuthController.register);
authRouter.post('/logout',  AuthController.logout);