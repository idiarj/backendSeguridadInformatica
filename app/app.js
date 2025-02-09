import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import multer from 'multer';
import { FsUtils } from '../utils/fsUtils.js';
import { authRouter } from '../routers/authRouter.js';
import { senderRouter } from '../routers/senderRouter.js';
import { applicationRouter } from '../routers/applicationRouter.js';

const cors_config = await FsUtils.readJsonFile('./config/cors-config.json');
console.log(cors_config);
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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true')
  next(); 
})

app.use('/auth', authRouter);
app.use('/send', upload.array('file'), senderRouter);
app.use('/application', applicationRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}
);