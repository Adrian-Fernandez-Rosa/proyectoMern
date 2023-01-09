
# code-verifier-backend
Ejercicio 1 OpenBootCamp

** Dependencias instaladas:

express: framework web.

nodemon: utilidad que envuelve la aplicación node y reinicia automáticamente el servidor ante cambios.

dotenv: dotenv nos permite tener varios archivos de configuración aunque lo común es tener un único archivo que contenga todas las variables de entorno.

concurrently: ejecutar scripts concurrentemente, en el caso de este proyecto lo usamos en el package.json.

jest: est es una librería que nos permite escribir y ejecutar tests.

eslint: utilidad para configurar reglas y patrones para escribir código estandarizado.

serve: para visualizar la cobertura a nivel web.
webpack: nos permitira empaquetar mucho la app y hacerla mas lijera con código más ofuscado.

mongoose: 
Mongoose es una MongoDB herramienta de modelado de objetos diseñada para trabajar en un entorno asíncrono. Mongoose es compatible con Node.js y Deno (alfa)

** Scripts creados.

> "build": "npx tsc": obtiene el código de typescript y genera una solución en js.
>  "start": "node dist/index.js": arrancar server.
> "dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\"": Ejecutar concurrentemente 
  transcripción y iniciamos nodemon
>  "test": "jest",
    "serve:coverage": "npm run test && cd coverage/lcov-report && npx serve":

         Ejecutamos test, muestra coverage y lo corre en server

** Variables de entorno:
> port: puerto de server. Proximamente también habrá variables como url, valores, cifrado.

