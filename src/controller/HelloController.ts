import { Get, Query, Route, Tags } from "tsoa";
import { BasicResponse } from "./types";
import { IHelloController } from "./interfaces";
import { LogSuccess } from "../utils/logger"; //recordar que en tsconfig tenemos configuración de path (@)

@Route("/api/hello") //etiqueta de tsoa
@Tags("HelloController")
export class HelloController implements IHelloController{
    /**
     * Endpoint to retrieve a Message "Hello {name} in JSON
     * @param { string | undefined } name Name of user to be greeted
     * @returns { BasicResponse } Promise of Basicresponse
     */
    @Get("/") 
    public async getMessage(@Query()name?: string): Promise<BasicResponse> {
        //<- indicamos que el name es tipo query
        LogSuccess("[api/hello] Get Request");

        return {
            message: `Hello ${name || "world"}` 
        }
        
    }


}