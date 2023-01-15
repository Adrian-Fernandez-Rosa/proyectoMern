import express, { Request, Response} from "express";
import { GoodbyeController } from "../controller/GoodbyeController";
import { LogInfo } from "../utils/logger";

let goodbyeRouter = express.Router();


// GET http://localhost:800/api/goodbye?name=Adrian
goodbyeRouter.route('/')
    .get(async (req: Request, res: Response) => {
        // Obtain a Query Param 
        let name: any = req?.query?.name;
        LogInfo(`Query param: ${name}`);

        let fecha: Date = new Date(String(req.query.fecha));

        console.log(fecha.toUTCString());
       
        if (fecha.toUTCString() === 'Invalid Date'){
            LogInfo(`Fecha invalida, se pondra la fecha de hoy`);
            fecha =  new Date();
        }
        
       // let fecha2: Date = new Date(String(fecha)); 
        // Controller Instance to execute method
        const controller: GoodbyeController = new GoodbyeController();
        // Obtain Response
        const response = await controller.getMessage(name, fecha);
        // Send to the client response
        return res.send(response);
    });

    export default goodbyeRouter;