import mongoose from "mongoose";


export const KataEntity = () => {

    let kataSchema = new mongoose.Schema(
        {
            name: String,
            description: String,
            level: Number, // Debes poder filtrar las Katas disponibles por nivel de dificultad
            creator: String, // id of user
            date: Date,
            stars: Number, 
            intents: Number, // Debes poder encontrar las Katas ordenadas por intentos
            numberOfReviews: Number,
            averageStars: Number // Debes poder valorar una Kata con una nueva nota y debe almacenarse la media
        }
    )
    return mongoose.models.Kata || mongoose.model('Kata', kataSchema);
}
