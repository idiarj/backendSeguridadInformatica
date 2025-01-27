import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { FsUtils } from '../utils/fsUtils.js';
import { authRouter } from '../routers/authRouter.js';
import { senderRouter } from '../routers/senderRouter.js';
import { applicationRouter } from '../routers/applicationRouter.js';
import cors_config from '../config/cors_config.json';
console.log(cors_config);
const cors1 = FsUtils.readJsonFile(cors_config);
console.log(cors1);
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use('/auth', authRouter);
app.use('/send', senderRouter);
app.use('/application', applicationRouter);