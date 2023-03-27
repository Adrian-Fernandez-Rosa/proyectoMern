import express,{ Request, Response } from "express";

import { UserController} from "../controller/UsersController"
import { LogInfo } from "../utils/logger";

// Router from express
let userRouter = express.Router();

// GET http://localhost:8000/api/users?id=6415df526b3caca0a78acdcb
userRouter.route('/')
    .get(async (req: Request, res: Response) => {
    
        // Refactorización: Obtain a Query Param (ID)
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`)


        // Controller Instance to execute method
        const controller: UserController = new UserController();
        // Obtain Response
        const response: any = await controller.getUsers(id); //modificamos agregando id
        // Send to the client the response
        return res.status(200).send(response);

    })
    .delete(async (req: Request, res: Response) => {
        // Obtain a Query Param (ID)
        let id: any = req?.query?.id;
        LogInfo(`Query Param in method Delete: ${id}`)
        // Controller Instance to execute method
        const controller: UserController = new UserController();
        // Obtain Response
        const response: any = await controller.deleteUsers(id); //modificamos agregando id
        // Send to the client the response
        return res.status(response.status).send(response);


    })
    // POST:
    .post(async (req: Request, res: Response) => {

        let name: any = req?.query?.name;
        let age: any = req?.query?.age;
        let email: any = req?.query?.email;

        // Controller Instance to execute Method
        const controller: UserController = new UserController();

        let user = {
            name: name || 'default',
            email: email || 'default email',
            age: age || 18
        }

        // Obtain Response
        const response: any = await controller.createUser(user);
        // Send to the client the response
        return res.status(201).send(response);
    })
    .put(async (req: Request, res: Response) => {
        let id: any = req?.query?.id;
        

        const controller: UserController = new UserController();

        let name: any = req?.query?.name;
        let age: any = req?.query?.age;
        let email: any = req?.query?.email;
        LogInfo(`Query Param: ${id}, ${name}, ${age}, ${email}`)
        let user = {
            name: name,
            email: email,
            age: age
        }

        // Obtain Response
        const response: any = await controller.updateUser(id, user);

        return res.status(response.status).send(response);
    }); //también se puese continuar con .post o .delete para borrar algo

// Export Users Router
export default userRouter;

/**
 * Get Document => 200 OK
 * Creation Documents => 201 OK
 * Deletion of Documents => 200 (entity) / 204 (No return)
 * Update of Documents => 200 (entity) / 204 (No return)
 */