import { BasicResponse, DateResponse } from "../types";


export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>; // Método para saludar
}

export interface IGoodbyeController {
    getMessage(name?:string, date?:Date): Promise<DateResponse>;
}

export interface IUserController {

    // Read all users from database or Find User by ID (ObjectID)
    getUsers(id?: string): Promise<any>
    // Delete User By ID
    deleteUsers(id: string): Promise<any>
    // Create new User
    createUser(user: any): Promise<any>
    // Update user
    updateUser(id: string, user: any): Promise<any>
}

export interface IKatasController {

    // Read all katas from database or dind katas by ID ( ObjetctID)
    getKatas(id?: string): Promise<any>
    // Delete Kata by ID
    deleteKata(id: string): Promise<any>
    // Create new Kata
    createKata(kata: any): Promise<any>
    // Update Kata
    updateKata(id: string, kata: any): Promise<any>
}