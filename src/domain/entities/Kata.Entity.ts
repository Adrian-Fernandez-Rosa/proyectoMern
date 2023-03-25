import mongoose from "mongoose";


export const KataEntity = () => {

    let kataSchema = new mongoose.Schema(
        {
            Name: String,
            Description: String,
            Level: Number,
            intents: Number,
            stars: Number,
            creator: String, // id of user
            solution: String,
            participants: []
        }
    )
    return mongoose.models.Kata || mongoose.model('Kata', kataSchema);
}
