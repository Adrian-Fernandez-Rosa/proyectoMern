import { DateResponse } from "./types";
import { IGoodbyeController } from "./interfaces";
import { LogSuccess } from "../utils/logger";

export class GoodbyeController implements IGoodbyeController {
    
    //test adicional, quiero saber como se recibe date por parametro 1999/03/12
    /**
     * 
  

pass the date with ISO format 'yyyy-mm-dd':

const date = new Date();
http.get(`url/test?date=${date.toISOString()}`

on the Express side:

app.get('/test', async function(req, res) {
  const date = new Date(req.query.date);
});


     */
    public async getMessage(name?: string | undefined, fecha: Date= new Date()): Promise<DateResponse> {
        LogSuccess('[/api/goodbye] Get Request');
       // const fecha = new Date();
        
        
        return {
            message: `Goodbye, ${name || "World!"}`,
            date: fecha || new Date()
        }
    }
    
}