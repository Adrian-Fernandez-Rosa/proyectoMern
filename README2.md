Apuntes para mis mentoreados

instalaremos dependencias con 

npm i --save para produccion.
y npm i --save-dev para desarrollo 

esto genero un package.json


instalando express.


npm i express dotenv (instalaciones orientadas al desarrollo)
//dotenv para instalar variables de entorno

 ** extensiones a instalar 

Version Lens
babel javascript (coloree palabras claves, etc)
Better Comments 
EditorConfig for VS Code (para que el proyecto estandarice los saltos de lineas etc)
ES7+ React/Redux/React-Native snippets.
GitLab Workflow
Material Icon Theme
Test Explorer UI
TODO Highlight
ESLint
Express Snippets (opcional)

creamos archivo index.js y .env

, CREAMOS script start en package.json 

"start": "node index.js"

(para ejecutarlo luego, npm run start)
instalamos nodemon (es como el devtools)
npm i -D nodemon
(-D = dev)

modificamos el script start con 

"start:local": "npx nodemon index.js",



ahora instalaremos typescript con los @types

npm i -D typescript @types/express @types/node

también generaremos el tsconfig.json con:

npx tsc --init

descomentamos 
```typescript
"experimentalDecorator": true,
"emitDecoratorMetadata": true,
"baseUrl": "./", 
"paths": {
    "@/*": [
        "src/*"
    ]
}, // Esto sustituye src por @ en los import , etc

  "sourceMap": true,   //que el archivo original también quede persistido

      "outDir": "./dist",   // que lo transpilado este en la carpeta dist
```

luego de codear el index.ts
istalamos 
npm i -D concurrently (Ejecuta comandos de manera concurrente)

crearemos otros script en package json

```json
"build": "npx tsc",
"start": "node dist/index.js",
"dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\"",
```
-q, --quiet .............. minimise nodemon messages to start/stop only

eliminamos el index.js que teniamos de prueba
recordar tener instalado global npm

```
npm install -g npm
npm i -D webpack webpack-cli webpack-node-externals webpack-shell-plugin
```
**  QUE ES WEBPACK

Se trata de un software capaz de crear los bundles de código Javascript, es decir, los paquetes de código necesarios para poder llevar a producción un proyecto frontend, realizando la transpilación del código y el empaquetado de los módulos en uno o varios archivos compactados, minimizados y por tanto optimizados.

Además de crear los bundles, Webpack es capaz de realizar diversas tareas necesarias para la etapa de desarrollo del proyecto, como convertir el código de Javascript en versiones actuales a código soportado por todos los navegadores comunes, convertir el código de los preprocesadores CSS (como Sass) a CSS estándar, optimizar imágenes, crear y levantar un servidor de desarrollo para ejecutar el proyecto durante su construcción, etc. Para todo ello Webpack se organiza en torno a un módulo central que se puede expandir con una serie de plugins, que se escogerán dependiendo de las necesidades del sitio web que se está desarrollando.


Ahora instalaremos 

``` 
    npm i -D eslint jest ts-jest @types/jest supertest
```

GENERANDO Configuración de eslint

```
    npx eslint --init
```
Generar configuración JEST

```
npx jest --init
```
configuración 

```
√ Would you like to use Jest when running "test" script in "package.json"? ... yes
√ Would you like to use Typescript for the configuration file? ... yes
√ Choose the test environment that will be used for testing » node
√ Do you want Jest to add coverage reports? ... yes
√ Which provider should be used to instrument code for coverage? » babel
√ Automatically clear mock calls, instances, contexts and results before every test? ... yes
```

Creamos la carpeta __tests__ en la raiz del proyecto
y el archivo example.spec.ts

para poder hacer npm run test debemos instalar 

```
npm i -D ts-node
```

para poder servir nuestro coverage a nivel web instalaremos:

```
npm i -D serve
```

agregamos script en package.json

```typescript
"serve:coverage": "npm run test && cd coverage/lcov-report && npx serve"
```
Lo que hace es hacer es concurrentemente ejecutar test y servirlo.
an faltas retoques en el archivo jest.config.ts

cuando pusheamos a git lab se corren los test configurados en el archivo .gitlab-ci.yml

ya con una estructura básica de proyecto instalaremos y configuraremos cors

```
npm i cors helmet
```
helmet da más seguridad en determinadas peticiones
también instalaremos el type

```
npm i -D @types/cors
```

Instalando mongoose 
```
npm i mongoose
```


** como es el camino de un get de un controlador en código

1. hacer un tipo si devolvemos una respuesta (se encuentra en src/controller/types/index.t)

    ```typescript
    export type DateResponse = {
    message: string,
    Date: Date
    }
    ```

2. Codear la Interfaz del controller.
En este caso y a diferencia de java hay 2 interface en un mismo archivo (src/controller/interfaces/index.ts)

En nuestro caso se encuentra en controller/types

```typescript
export interface IGoodbyeController {
    getMessage(name?:string): Promise<DateResponse>;
}
```

3. Codear el controlador (src/controller/GoodbyeController.ts)

```typescript
import { DateResponse } from "./types";
import { IGoodbyeController } from "./interfaces";
import { LogSuccess } from "../utils/logger";

export class GoodbyeController implements IGoodbyeController {
    
    public async getMessage(name?: string | undefined): Promise<DateResponse> {
        LogSuccess('[/api/goodbye] Get Request');
        return {
            message: `Goodbye, ${name || "World!"}`,
            Date: new Date()
        }
    }
    
}
```

4. Codear routes (src/routes/GoodbyeRouter.ts)

```typescript
import express, { Request, Response} from "express";
import { GoodbyeController } from "../controller/GoodbyeController";
import { LogInfo } from "../utils/logger";

let goodbyeRouter = express.Router();


// GET http://localhost:800/api/goodbye?name=Adrian
goodbyeRouter.route('/')
    .get(async (req: Request, res: Response) => {
        // Obtain a Query Param 
        let name: any = req?.query?.name;
        LogInfo(`Query param: ${name}`);

        // Controller Instance to execute method
        const controller: GoodbyeController = new GoodbyeController();
        // Obtain Response
        const response = await controller.getMessage(name);
        // Send to the client response
        return res.send(response);
    });

    export default goodbyeRouter;
```

5 agregar ruta en src/routes/index.ts

```typescript
server.use('/goodbye', goodbyeRouter) // http://localhost:8000/api/goodbye --> Goodbye Router
```

<br>
<br>
<br>
    ** WEBPACK

ahora configuraremos web pack para que quede un código más ofuscado y ligero y con menos archivos luego de hacer la transpilación.

Crear archivo webpack.config.js en la raiz del proyecto.

necesitaremos instalar
```
npm i -D ts-loader
```

se ha creado el archivo webpack.config.js

// TODO: poner directorio

luego de codear la configuración de webpack haremos scripts en package json

"prueba:webpack":"npx webpack",

este script es de dev.

por lo tanto ahora haremos modificaciones, sobre el para que sea de producción

```typescript
"prueba:webpack":"npx webpack --mode production"
```

Luego de chequear que el script de prueba funcione asi debería quedar nuestros scripts

```typescript
"scripts": {
    "dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\"",
    "test": "jest",
    "serve:coverage": "npm run test && cd coverage/lcov-report && npx serve",
    "build": "npx webpack --mode development",
    "start": "node dist/index.js",
    "build:prod": "npx webpack --mode production"
  },
```

Ahora instalaremos TSOA que sera uno de los que nos ayudara a documentar swagger
```typescript
npm i -D @types/swagger-jsdoc @types/swagger-ui-express
npm i --save swagger-jsdoc swagger-ui-express
npm i tsoa //que sirve para utilizar swagger con typescript
```

generamos otro archivo de configuración en la raiz llamado tsoa.json

en el archivo tsconfig.json se descomento la linea
4

```javascript
     "typeRoots": ["./node_modules/@types"], 
```

modificando nuestro script dev
```javascript
 "dev": "concurrently \"npx tsc --watch\" \"npm run swagger\" \"nodemon -q dist/index.js\"",
 ```

-- continuación 18/03/2023

ahora haremos crud de users
datos a tener en cuenta:
nuestra base de datos actual es codeverification.
Nuestra colección es Users
en el index.ts del server cambiamos localhost por 127.0.0.1 ya que rompia la conexión 
con mongo en dev (en node 17 y posterior). quizas otra solución màs elegante sea actualizar la dependencia dev de mongoose



1 Comenzaremos con la interfaces, recordar que tenemos un index.ts
en controller/interfaces donde actualmente estan las siguientes interfaces:

```typescript
import { BasicResponse, DateResponse } from "../types";


export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>; // Método para saludar
}

export interface IGoodbyeController {
    getMessage(name?:string, date?:Date): Promise<DateResponse>;
}
// le agregamos:

export interface IUserController {

    // Read all users from database 
    getUsers(): Promise<any>
    
}

```

Luego creamos el controlador UsersController.ts

```typescript

import { Get, Route, Tags} from "tsoa";
import { IUserController } from "./interfaces";
import { LogSuccess, LogError } from "@/utils/logger";

// ORM - Users Collection
import { getAllUsers } from "../domain/orm/User.orm";
import { BasicResponse } from "./types";

@Route("/api/users")
@Tags("UserController")
export class UserController implements IUserController {
    /**
     * Endpoint to retreive the User in the Collection "Users" of DB
     */
    public async getUsers(): Promise<any> {
        LogSuccess('[/api/users] Get All Users Request')

        const response = await getAllUsers();
        return response;
        
    }
}

```
repasando
tenemos la entity de users, Luego la ORM,  Luego el controller (puede que incluya types antes)
Luego creamos la ruta para Users
```typescript

import express,{ Request, Response } from "express";
import { UserController } from "@/controller/UsersController";
import { LogInfo } from "../utils/logger";

// Router from express
let userRouter = express.Router();

// GET http://localhost:8000/api/users
userRouter.route('/')
    .get(async (req: Request, res: Response) => {
    
        // Controller Instance to execute method
        const controller: UserController = new UserController();
        // Obtain Response
        const response: any = await controller.getUsers();
        // Send to the client the response
        return res.send(response);


    }); //también se puese continuar con .post o .delete para borrar algo

// Export Hello Router
export default userRouter;

```
Una vez logrado esto agregaremos userRouter a la raiz del proyecto
que se ubica en routes/index.ts

```typescript
// colocar donde correspona
server.use('/users', userRouter); // recordar importarlo
```

Ahora modificamos el return de nuestro entity /src/domain/entities/User.entity.ts

```typescript
return mongoose.models.Users || mongoose.model('Users', userSchema);
//En caso de que exista un modelo User utilizaremos ese, sino lo crea
```

nota, las colecciones crearlas con minuscula.


recordar que tenemos nuestro orm en 
domain/orm/User.orm.ts

```typescript

import { userEntity } from "../entities/User.entity";

import { LogSuccess, LogError } from "../../utils/logger";

// CRUD

/**
 * Method to obtain all Users from COllection "Users" in Mongo Server
 */
export const getAllUsers = async () => {

    try {
        let userModel = userEntity();

        // Search all users
       // return await userModel.find({isDelete: false}) //que busquen todo los que no estan borrados
        return await userModel.find()
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

```

Continuando con el crud seguiremos con buscar user por id
en nuestra interfaz controller/interfaces/index.ts
para ello refactozaremos el código de la ruta getallUsers para que reciba
el id opcionalmente

```typescript
    export interface IUserController {
      // Read all users from database or Find User by ID (ObjectID)
    getUsers(id?: string): Promise<any>

    }
```

en domain/orm/User.orm.ts :

```typescript

// - Get User By ID
export const getUsersByID = async (id: string) : Promise<any | undefined> => {

    try {

        let userModel = userEntity();

        // Search User By ID
        return await userModel.findById(id);

    } catch (error) {
        LogError(`[ORM ERROR]: Getting User By ID: ${error}`);
    }
}
```

en controlador controller/UsersController.ts

```typescript

 /**
     * Endpoint to retreive the User in the Collection "Users" of DB
     * or get User By ID
     */
    @Get("/")
    public async getUsers(@Query()id?: string): Promise<any> {

        let response: any = '';
        
        if(id){
            LogSuccess(`[/api/users] Get User By ID: ${id} `)

            return {
                message: `Obtaining User with ID: ${id}`
            }
        }else {
            LogSuccess('[/api/users] Get All Users Request')
            response = await getAllUsers();
        }

        return response;       
    }
```

ahora al igual como se codeo en su momento en routes/HelloRouter.ts
es obtener el QueryParam

```typescript

import express,{ Request, Response } from "express";

import { UserController} from "../controller/UsersController"
import { LogInfo } from "../utils/logger";

// Router from express
let userRouter = express.Router();

// GET http://localhost:8000/api/users?id=6415df526b3caca0a78acdcb
userRouter.route('/')
    .get(async (req: Request, res: Response) => {
    
        // Refactorización:
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`)


        // Controller Instance to execute method
        const controller: UserController = new UserController();
        // Obtain Response
        const response: any = await controller.getUsers(id); //modificamos agregando id
        // Send to the client the response
        return res.send(response);


    }); //también se puese continuar con .post o .delete para borrar algo

// Export Hello Router
export default userRouter;

```

*********************************************************************************
Ahora haremos que elimine todos los usuarios o uno por id.
En UserRouter.ts continuando el UserRouter.route('/'):

```typescript
  .delete(async (req: Request, res: Response) => {
        // Obtain a Query Param (ID)
        let id: any = req?.query?.id;
        LogInfo(`Query Param in method Delete: ${id}`)
        // Controller Instance to execute method
        const controller: UserController = new UserController();
        // Obtain Response
        const response: any = await controller.deleteUsers(id); //modificamos agregando id
        // Send to the client the response
        return res.send(response);


    });
```

en UsersController.ts

```typescript

   @Delete("/")
    public async deleteUsers(@Query()id?: string): Promise<any> {

        let response: any = '';
        
        if(id){
            LogSuccess(`[/api/users] Delete User By ID: ${id} `)

            await deleteUserByID(id).then((r) => {
                response = {
                    message: `User with id ${id} deleted successfuly`
                }
            })
        }else {
            LogWarning('[/api/users] Delete User Request WITHOUT ID')
            response = {
                message: 'Please, provide an ID to remove from database'
            }
        }

        return response;       
    }

```

En la interfaz:

```typescript
 // delete User By ID
    deleteUsers(id: string): Promise<any>
```

TODO: Queda pendiente comprobar que el id exista.

** Ahora crearemos new User.

1) Como ya es costumbre comenzamos por la interfaz
controller/interfaces/index.ts

```typescript

  // Create new User
    createUser(user: any): Promise<any>

```
2) seguir con el domain/orm/User.orm.ts

```typescript
export const createUser = async (user: any): Promise<any | undefined> => {//debemos usar un tipo
    
    try {
        let userModel = userEntity();

        // Obviamente faltan comprobaciones.

        return await userModel.create(user);

    } catch (error) {
        LogError(`[ORM ERROR]:Creating User : ${error}`);
    }
}
```

3) Seguir con el controller

```typescript
 // @Post("/")
    public async createUser(user: any): Promise<any> {
      
       let response: any = '';

       await createUser(user).then((r) => {
        LogSuccess(`[/api/users] Create User: ${user} `)
        response = {
            message: `User created successfully: ${user.name}`
        }
       })
       return response;
    }  

```
```typescript
4) Codeando el routes/UserRouter.ts

   // POST:
    .post(async (req: Request, res: Response) => {

        let name: any = req?.query?.name;
        let age: any = req?.query?.age;
        let email: any = req?.query?.email;

        // Controller Instance to execute Method
        const controller: UserController = new UserController();

        let user = {
            name: name || 'default',
            email: email || 'default email',
            age: age || 18
        }

        // Obtain Response
        const response: any = await controller.createUser(user);
        // Send to the client the response
        return res.send(response);
    }); //también se puese continuar con .post o .delete para borrar algo
```

** Finalizado el create con query params

** Continuando con update de users

1) domain/orm/User.orm.ts

```typescript
    export const updateUser = async (id: string, user: any): Promise<any | undefined> => {

    try {
        
        let userModel = userEntity();

        // Update User
        return await userModel.findByIdAndUpdate(id, user);
    } catch (error) {
        LogError(`[ORM ERROR]:Updating User ${id}: ${error}`);
    }
}

```

2) interface ( controller/interfaces/index.ts)


```typescript
// Update user
    updateUser(id: string, user: any): Promise<any>
```

3) controller/UserController.ts

```typescript

 @Put("/")
    public async updateUser(@Query()id: string, user: any): Promise<any> { 
        let response: any = '';
        
        if(id){
            LogSuccess(`[/api/users] update User By ID: ${id} `)

            await updateUserByID(id, user).then((r) => {
                response = {
                    message: `User with id ${id} updated successfuly`
                }
            })
        }else {
            LogWarning('[/api/users] Update User Request WITHOUT ID')
            response = {
                message: 'Please, provide an ID to update an existing user'
            }
        }

        return response;  
    }

```

4) routes/userRouter.ts


```typescript

 .put(async (req: Request, res: Response) => {
        let id: any = req?.query?.id;
        

        const controller: UserController = new UserController();

        let name: any = req?.query?.name;
        let age: any = req?.query?.age;
        let email: any = req?.query?.email;
        LogInfo(`Query Param: ${id}, ${name}, ${age}, ${email}`);
        let user = {
            name: name,
            email: email,
            age: age
        }

        // Obtain Response
        const response: any = await controller.updateUser(id, user);

        return res.send(response);
    });
```

// problemas con swagger
quitamos swagger de dev
\"npm run swagger\"

** Ejercicio.

Crear un nuevo modelo y endpoints para gestionar peticiones CRUD para la colección de Katas. Además:

Debes poder filtrar las Katas disponibles por nivel de dificultad

Debes poder obtener las 5 Katas más recientes

Debes poder listar las Katas ordenadas de mejor valoradas a menos valoradas

Debes poder valorar una Kata con una nueva nota y debe almacenarse la media

Por lo que el modelo de Kata deberá tener un valor que será número de valoraciones de usuarios, para así obtener la media

Debes poder encontrar las Katas ordenadas por intentos-


** Validación de modelos, Autenticación y Autorización con JWT.

Para no tener que hacer cosas tan bizarras como la siguiente (routeKata)

```typescript

.post(async (req: Request, res: Response) => {

        let name: any = req?.query?.name;
        let description: any = req?.query?.description;
        let level: any = req?.query?.level;
        let creator: any = req?.query?.creator; // id of creator user
        let date: Date = new Date();
        let stars: any = req?.query?.stars;
        let intents: any = req?.query?.intents;
        let numberOfReviews: Number = 0;
        let averageStars: Number= 0;
      //  let idParticipants= req?.query?.participants;
     
      const controller: KatasController = new KatasController();

        let kata = {
            name: name,
            description: description,
            level: level,
            creator: creator,
            date: date,
            stars: stars,
            intents: intents,
            numberOfReviews: numberOfReviews,
            averageStars: averageStars
        }

        const response: any = await controller.createKata(kata);

        return res.status(201).send(response);
    })
```

    hay que trabajar con la interfaz de esqueba sobre user.entity.ts por ejemplo

    entonces dentro de domain creammos la carpeta de interfaces.
    podremos usar las interfaces de nuestros entitis por ejemplo
    en los orm.

domain/interfaces/IUser.interface.ts

    ```typescript
    export interface IUser {
    name: string,
    email: string,
    age: number
    }
    ```

A la entidad user la modificamos y queda de la siguiente manera:

```typescript

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
```

// en la clase de hoy quedamos pendiente de probarlo código de zoom: 1:19