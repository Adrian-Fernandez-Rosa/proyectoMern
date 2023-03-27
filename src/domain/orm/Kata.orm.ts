import {  KataEntity } from "../entities/Kata.Entity";
import { LogSuccess, LogError } from "../../utils/logger";
import { response } from "express";

//CRUD


/**
 * Method to obtain all Kata from Collection "Katas" in Mongo Server
 */
export const getAllKatas = async () => {

    try {
        let kataModel = KataEntity();

        return await kataModel.find();

    } catch (error) {
        LogError(`[ORM ERROR]: Gretting all Katas`)
    }
}

// - Get Kata By ID.
export const getKataByID = async (id: string): Promise<any | undefined> => {

    try {
        let kataModel = KataEntity();

        // Search kata by ID
        return await kataModel.findById(id);
    } catch (error) {
        LogError(`[ORM ERROR]: Getting kata error by ID: ${error}`)
    }
}

export const deleteKataByID = async (id: string): Promise<any | undefined> => {

    try {
        let kataModel = KataEntity();
        // Delete Kata By ID.
        return await kataModel.findByIdAndDelete({ _id: id});
    } catch (error) {
        LogError(`[ORM ERROR]: deleting error By ID: ${error}`)
    }
}

export const createKata =async (kata: any): Promise<any | undefined> => {
    
    try {
        let kataModel = KataEntity();

        //Obviamente faltan comprobaciones.

        return await kataModel.create(kata);

    } catch (error) {
        LogError(`[ORM ERROR]:Creating Katta: ${error}`)
    }
}

export const updateKataByID = async (id: string, kata: any): Promise<any | undefined> => {

    try {
        let kataModel = KataEntity();

        // Update Kata.
        return await kataModel.findByIdAndUpdate(id, kata);
    } catch (error) {
        LogError(`[ORM ERROR]:Updating Katta: ${error}`);
    }
}