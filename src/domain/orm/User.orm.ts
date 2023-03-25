import { userEntity } from "../entities/User.entity";

import { LogSuccess, LogError } from "../../utils/logger";

// CRUD

/**
 * Method to obtain all Users from COllection "Users" in Mongo Server
 */
export const getAllUsers = async () => {

    try {
        let userModel = userEntity();

        // Search all users
       // return await userModel.find({isDelete: false}) //que busquen todo los que no estan borrados
        return await userModel.find() //que busquen todo los que no estan borrados
    }catch (error){
        LogError(`[ORM ERROR]: Getting All Users: ${error}`);
    }

}

// - Get User By ID
export const getUsersByID = async (id: string) : Promise<any | undefined> => {

    try {

        let userModel = userEntity();

        // Search User By ID
        return await userModel.findById(id);

    } catch (error) {
        LogError(`[ORM ERROR]: Getting User By ID: ${error}`);
    }
}
// - Delete User By ID

export const deleteUserByID = async (id: string): Promise<any | undefined> => {

    try {
        let userModel = userEntity();

        // Delete User BY ID.
        return await userModel.deleteOne({ _id: id})
    } catch (error) {
        LogError(`[ORM ERROR]:Deleting User By ID: ${error}`);
    }
}
// - Create new User
export const createUser = async (user: any): Promise<any | undefined> => {//debemos usar un tipo
    
    try {
        let userModel = userEntity();

        // Obviamente faltan comprobaciones.

        return await userModel.create(user);

    } catch (error) {
        LogError(`[ORM ERROR]:Creating User : ${error}`);
    }
}
// - Update User By ID
export const updateUserByID = async (id: string, user: any): Promise<any | undefined> => {

    try {
        
        let userModel = userEntity();

        // Update User
        return await userModel.findByIdAndUpdate(id, user);
    } catch (error) {
        LogError(`[ORM ERROR]:Updating User ${id}: ${error}`);
    }
}




// TODO: 
// - Get User By Email