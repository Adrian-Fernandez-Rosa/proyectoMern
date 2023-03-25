/**
 * Root Router
 * Redirections to Routers
 */

import express, { Request, Response } from 'express';
import helloRouter from './HelloRouter';
import goodbyeRouter from './GoodbyeRouter';
import { LogInfo } from '../utils/logger';
import userRouter from './UserRouter';

// Server instance
let server = express(); //acceder a determinadas rutas y que rutas seran redirigidas hacia un lado o otro

// Router instance
let rootRouter = express.Router();

// Activate for request to http://localhost:8000/api

rootRouter.get('/', (req: Request, res: Response) => {
    LogInfo('GET: http://localhost:8000/api')
    res.send('Welcome to my API restfull: Express + Jest + TS + Swagger + Mongoose (by AdrianCodifica)')
});

// Redirections to Routers & Controllers
server.use('/', rootRouter); // http://localhost:8000/api
server.use('/hello', helloRouter) // http://localhost:8000/api/hello --> Hello Router
server.use('/goodbye', goodbyeRouter) // http://localhost:8000/api/goodbye --> Goodbye Router
server.use('/users', userRouter) // http://localhost:8000/api/users --> UserRouter
// param 1: route, param 2: manager
// Add more routes to the app 

export default server; 
