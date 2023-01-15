import { BasicResponse, DateResponse } from "../types";


export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>; // Método para saludar
}

export interface IGoodbyeController {
    getMessage(name?:string, date?:Date): Promise<DateResponse>;
}