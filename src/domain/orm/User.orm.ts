import { userEntity } from "../entities/User.entity";

import { LogSuccess, LogError } from "@/utils/logger";

// CRUD

/**
 * Method to obtain all Users from COllection "Users" in Mongo Server
 */
export const GetAllUsers = async () => {

    try {
        let userModel = userEntity();

        // Search all users
        return await userModel.find({isDelete: false}) 
    }catch (error){
        LogError(`[ORM ERROR]: Getting All Users: ${error}`);
    }

}

// TODO: 
// - Get User By ID
// - Get User By Email
// - Delete User By ID
// - Create new User
// - Update User