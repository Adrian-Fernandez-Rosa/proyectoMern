import mongoose from "mongoose";
import { userEntity } from "./User.entity";


export const KataEntity = () => {

    let kataSchema = new mongoose.Schema(
        {
            Name: String,
            Description: String,
            Level: Number,
            User: userEntity,
            Date: Date,
            Valoration: Number,
            Chances: Number
        }
    )
    return mongoose.model('Kata', kataSchema )
}
