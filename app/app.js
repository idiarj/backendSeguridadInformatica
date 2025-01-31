import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { authRouter } from '../routers/authRouter.js';
import { senderRouter } from '../routers/senderRouter.js';
import { applicationRouter } from '../routers/applicationRouter.js';
import cors_config from '../config/cors-config.json' assert { type: "json" };

dotenv.config();

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors(cors_config));

app.use('/auth', authRouter);
app.use('/send', upload.single('file'), senderRouter);
app.use('/application', applicationRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}
);