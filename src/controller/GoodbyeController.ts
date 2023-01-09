import { DateResponse } from "./types";
import { IGoodbyeController } from "./interfaces";
import { LogSuccess } from "../utils/logger";

export class GoodbyeController implements IGoodbyeController {
    
    public async getMessage(name?: string | undefined): Promise<DateResponse> {
        LogSuccess('[/api/goodbye] Get Request');
        return {
            message: `Goodbye, ${name || "World!"}`,
            Date: new Date()
        }
    }
    
}