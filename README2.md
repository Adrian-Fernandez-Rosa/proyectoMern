Apuntes para mis mentoreados

instalaremos dependencias con 

npm -i --save para produccion.
y npm -i --save-dev para desarrollo 

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
```
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

```
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

```
"serve:coverage": "npm run test && cd coverage/lcov-report && npx serve"
```
Lo que hace es hacer es concurrentemente ejecutar test y servirlo.
an faltas retoques en el archivo jest.config.ts

cuando pusheamos a git lab se corren los test configurados en el archivo .gitlab-ci.yml

