import express, { Request, Response } from "express";
import { KatasController } from "../controller/KatasController";
import { LogInfo } from "../utils/logger";
import { userEntity } from "../domain/entities/User.entity";

let kataRouter = express.Router();


kataRouter.route('/')
    .get(async (req: Request, res: Response) => {

        // Refactorización pendiente
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);

        // Controller Instance to execute method
        const controller: KatasController = new KatasController();
        // Obtain Response
        const response: any = await controller.getKatas(id);

        return res.status(200).send(response);
    })
    .post(async (req: Request, res: Response) => {

        let name: any = req?.query?.name;
        let description: any = req?.query?.description;
        let level: any = req?.query?.level;
        let creator: any = req?.query?.creator; // id of creator user
        let date: Date = new Date();
        let stars: any = req?.query?.stars;
        let intents: any = req?.query?.intents;
        let numberOfReviews: Number = 0;
        let averageStars: Number= 0;
      //  let idParticipants= req?.query?.participants;
     
      const controller: KatasController = new KatasController();

        let kata = {
            name: name,
            description: description,
            level: level,
            creator: creator,
            date: date,
            stars: stars,
            intents: intents,
            numberOfReviews: numberOfReviews,
            averageStars: averageStars
        }

        const response: any = await controller.createKata(kata);

        return res.status(201).send(response);
    })
    .delete(async (req: Request, res: Response) => {
        // Obtain a Query param (ID)
        let id: any = req?.query?.id;
        LogInfo(`Query Param in method Delete: ${id}`);

        // Controller instance to execute method
        const controller: KatasController = new KatasController();
        // Obtain Response
        const response: any = await controller.deleteKata(id);

        return res.send(response);
    })
    .put(async (req: Request, res: Response) => {
        let id: any = req?.query?.id;

        const controller: KatasController = new KatasController();

        let name: any = req?.query?.name;
        let description: any = req?.query?.description;
        let level: any = req?.query?.level;
        let creator: any = req?.query?.creator; // id of creator user
        let date: Date = new Date();
        let stars: any = req?.query?.stars;
        let intents: any = req?.query?.intents;
        let numberOfReviews: Number = 0;
        let averageStars: Number= 0;

        let kata = {
            name: name,
            description: description,
            level: level,
            creator: creator,
            date: date,
            stars: stars,
            intents: intents,
            numberOfReviews: numberOfReviews,
            averageStars: averageStars
        }

        // Obtain Response
        const response: any = await controller.updateKata(id, kata);

        return res.send(response);
    });


export default kataRouter;