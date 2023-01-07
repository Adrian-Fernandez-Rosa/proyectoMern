import express, { Express, Request, Response } from "express"; 
import dotenv from 'dotenv';

// Configuration the .env file 

dotenv.config();

// Create Express APP
const app: Express = express();
const port: string | number = process.env.PORT || 8000;

// Define the firs Route of APP
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to my API restfull: Express + Jest + TS + Swagger + Mongoose (by AdrianCodifica)')
})

app.get('/hello', (req: Request, res: Response) => {
    // Send Hello World
  //  res.send(`Welcome to get Route: ¡Hello ${req.params.name} ! `)
    return res.status(200).json({
        data: {message: `Hola, ${req.query.name}` }
    })
})


app.get('/goodbye', (req: Request, res: Response) => {
    res.send('Goodbye, world');
})

app.listen(port, () => {
    console.log(`Express server: Running at http://localhost:8000`)
})