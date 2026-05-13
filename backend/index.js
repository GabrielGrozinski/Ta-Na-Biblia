import express from 'express';
import cors from 'cors';
import router from './routes/rotas-usuario.js';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorMD } from './middlewares/erros.js';

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use('/', router);

app.use(errorMD);

const port = 3000;

app.listen(port, () => console.log(`Express rodando na porta ${port}`));