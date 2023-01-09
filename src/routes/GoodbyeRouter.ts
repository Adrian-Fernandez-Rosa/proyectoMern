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

        // Controller Instance to execute method
        const controller: GoodbyeController = new GoodbyeController();
        // Obtain Response
        const response = await controller.getMessage(name);
        // Send to the client response
        return res.send(response);
    });

    export default goodbyeRouter;