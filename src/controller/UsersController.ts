import { Delete, Get, Post, Put, Query, Route, Tags} from "tsoa";
import { IUserController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";

// ORM - Users Collection
import { createUser, deleteUserByID, getAllUsers, getUsersByID, updateUserByID } from "../domain/orm/User.orm";
import { BasicResponse } from "./types";

@Route("/api/users")
@Tags("UserController")
export class UserController implements IUserController {
    
    /**
    * Endpoint to retreive the Users in the Collection "Users" of DB
    * @param (string) id  Id of user to retreive (optional)
    * @returns All user o user found by ID
    */
    @Get("/")
    public async getUsers(@Query()id?: string): Promise<any> {

        let response: any = '';
        
        if(id){
            LogSuccess(`[/api/users] Get User By ID: ${id} `)

           response = await getUsersByID(id);
        }else {
            LogSuccess('[/api/users] Get All Users Request')
            response = await getAllUsers();
        }

        return response;       
    }


    /**
     * Endpoint to delete the Users in the Collection "Users" of DB
     * @param (string) id  Id of user to delete (optional)
     * @returns message informing if deletion was correct
    */
    @Delete("/")
    public async deleteUsers(@Query()id?: string): Promise<any> {

        let response: any = '';
        
        if(id){
            LogSuccess(`[/api/users] Delete User By ID: ${id} `)

            await deleteUserByID(id).then((r) => {
                response = {
                    message: `User with id ${id} deleted successfuly`
                }
            })
        }else {
            LogWarning('[/api/users] Delete User Request WITHOUT ID')
            response = {
                message: 'Please, provide an ID to remove from database'
            }
        }

        return response;       
    }

    
    @Post("/")
    public async createUser(user: any): Promise<any> {
      
       let response: any = '';

       await createUser(user).then((r) => {
        LogSuccess(`[/api/users] Create User: ${user} `)
        response = {
            message: `User created successfully: ${user.name}`
        }
       })
       return response;
    }  
    
    @Put("/")
    public async updateUser(@Query()id: string, user: any): Promise<any> { 
        let response: any = '';
        
        if(id){
            LogSuccess(`[/api/users] update User By ID: ${id} `)

            await updateUserByID(id, user).then((r) => {
                response = {
                    message: `User with id ${id} updated successfuly`
                }
            })
        }else {
            LogWarning('[/api/users] Update User Request WITHOUT ID')
            response = {
                message: 'Please, provide an ID to update an existing user'
            }
        }

        return response;  
    }

}