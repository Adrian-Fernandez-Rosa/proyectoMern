import express, { Express, Request, Response } from "express";
// Swagger

import swaggerUi from 'swagger-ui-express';


// Security
import cors from 'cors';
import helmet from 'helmet';

// TODO HTTPS

// Root Router
import rootRouter from '../routes'; //no hace falta poner /index.ts
import { request } from "http";
import mongoose from "mongoose";

// Configuration the env file , No hace falta aqui
// dotenv.config();

// Create Express APP
const server: Express = express();
// const port: string | number = process.env.PORT || 8000;

// * Swagger Config and route
server.use(
    '/docs',
    swaggerUi.serve,
    // aca vendria el swagger doc para personalizar, por lo pronto undefined
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
            explorer: true //nos permitira hacer búsquedas como diferentes versiones de api 
        }
    }) 
)

// Define Server to use "/api" and use rootRouter from 'index.ts' in routes
// From this point onover: http://localhost:8000/api/
server.use('/api',
    rootRouter );

// TODO Mongoose Connection
mongoose.set('strictQuery',false)
mongoose.connect('mongodb://localhost:27017/codeverification');

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