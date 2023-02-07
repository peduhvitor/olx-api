import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import fileupload from 'express-fileupload';
import apiRoutes from './routes';
import { mongoConnect } from './database/mongo';

dotenv.config();
mongoConnect();

const server = express();

server.use(cors());
server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));
server.use(fileupload());

server.use(apiRoutes);

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});

server.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em: ${process.env.BASE}`);
});