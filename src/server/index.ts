import express, { Express, Request, Response } from "express";

// Security
import cors from 'cors';
import helmet from 'helmet';

// TODO HTTPS

// Root Router
import rootRouter from '../routes'; //no hace falta poner /index.ts
import { request } from "http";

// Configuration the env file , No hace falta aqui
// dotenv.config();

// Create Express APP
const server: Express = express();
// const port: string | number = process.env.PORT || 8000;

// Define Server to use "/api" and use rootRouter from 'index.ts' in routes
// From this point onover: http://localhost:8000/api/
server.use('/api',
    rootRouter );

// TODO Mongoose Connection

// Security Config
server.use(helmet());
server.use(cors());

// Content Type config
server.use(express.urlencoded({ extended: true, limit: '50mb'}));
server.use(express.json({limit: '50mb'}));

// http://localhost:8000/ debe redireccionar a /apu
server.get('/', (req: Request, res: Response) => {
    res.redirect('/api');
})

// Static server
// Ahora, puede cargar los archivos que hay en el directorio public desde el prefijo de vía de acceso /static.
// no estoy seguro del comentario anterior. verificar https://expressjs.com/es/starter/static-files.html
server.use(express.static('public'));

export default server;