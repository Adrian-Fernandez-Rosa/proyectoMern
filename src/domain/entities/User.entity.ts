import mongoose from "mongoose";


export const userEntity = () => {

    let userSchema = new mongoose.Schema(
        {
            name: String,
            email: String,
            age: Number
        }
    )

    return mongoose.models.Users || mongoose.model('Users', userSchema);
        //En caso de que exista un modelo User utilizaremos ese, sino lo crea
}