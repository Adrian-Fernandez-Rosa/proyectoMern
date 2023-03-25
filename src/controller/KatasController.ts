import { Get, Delete, Post, Put, Query, Route, Tags} from "tsoa";
import { IKatasController } from "./interfaces";
import { LogSuccess, LogError } from "src/utils/logger";
import { BasicResponse } from "./types";

// ORM - Katas

@Route("/api/katas")
@Tags("KatasController")
export class KatasController implements IKatasController {
    
    /**
     * 
     * @param id 
     */
    getKatas(id?: string | undefined): Promise<any> {
        throw new Error("Method not implemented.");
    }


    deleteKata(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    createKata(kata: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    updateKata(id: string, kata: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

}