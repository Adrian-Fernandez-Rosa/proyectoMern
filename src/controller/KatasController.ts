import { Get, Delete, Post, Put, Query, Route, Tags} from "tsoa";
import { IKatasController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";
import { BasicResponse } from "./types";
import { createKata, getAllKatas, getKataByID, deleteKataByID, updateKataByID } from "../domain/orm/Kata.orm";

// ORM - Katas

@Route("/api/katas")
@Tags("KatasController")
export class KatasController implements IKatasController {
    
  
    @Get("/")
    public async getKatas(id?: string | undefined): Promise<any> {
       
        let response: any = '';

        if(id){
            LogSuccess(`[/api/katas] Get Katas By ID: ${id}`);

            response = await getKataByID(id);
        } else {
            LogSuccess(`[api/katas] Get All Katas`);
            response = await getAllKatas();
        }

        return response;
        
    }


    @Delete("/")
    public async deleteKata(@Query()id?: string): Promise<any> {
        
        let response: any = '';

        if(id){
            LogSuccess(`[/api/kata] delete Kata By ID: ${id}`);

            // Delete Kata By ID.
            await deleteKataByID(id).then((r) => {
                response = {
                    message: `Kata with id ${id} deleted successfuly`
                }
            });
        } else {
            LogWarning('[/api/users] Delete Kata Request WITHOUT ID');
            response = {
                message: 'Please, provide an ID to remove from database'
            }
          
        }
       return response;
    }

    @Post("/")
    public async createKata(kata: any): Promise<any> {
      
        let response: any = '';
        
        await createKata(kata).then((r) => {
            LogSuccess(`[api/katas] create Katas`);
            response = {
                message: `Kata created successfully: ${kata.name}`
            }
        });
        
       return response;
    }

    @Put("/")
    public async updateKata(id: string, kata: any): Promise<any> {
        let response: any = '';

        if(id){
            LogSuccess(`[/api/kata] update kata By ID: ${id} `);

            await updateKataByID(id, kata).then((r) => {
                response = {
                    message: `kata with id ${id} updated successfuly`
                }
            })
        } else {
            LogWarning('[/api/kata] Update kata Request WITHOUT ID');
            response = {
                message: 'Please, provide an ID to update an existing kata'
            }
        }
        return response;
    }

}