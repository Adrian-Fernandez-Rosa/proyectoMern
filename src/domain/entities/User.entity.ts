import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser.interface";


export const userEntity = () => {
    let userSchema = new mongoose.Schema<IUser>(
    {
        name: { type: String, required: true},
        email: { type: String, required: true},
        age: { type: Number, required: true}
    }
        
    )

    return mongoose.models.Users || mongoose.model<IUser>('Users', userSchema);
        //En caso de que exista un modelo User utilizaremos ese, sino lo crea


        //asi lo teniamos antes

           // let userSchema = new mongoose.Schema(
    //     {
    //         name: String,
    //         email: String,
    //         age: Number
    //     }
    // )
}