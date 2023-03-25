

comandos mongo shell 


use <db_name>

```javascript
db.Users.find().pretty()
```
Muestra la coleccion en formato JSON

ahora si queremos buscar

```javascript
db.Users.find({ name: "adrian"}).pretty()
```
. para agregar de a varios:
```javascript
db.amigos.insertMany([{nombre:"Martín", apellidos:"San José", nacimiento:
{lugar:"Canarias", fecha: {dia: 14, mes: "Septiembre", año: 1991}}, aficiones:
["programar", "viajar", "beber"], mascotas: 6}, {nombre:"Andrés", apellidos:"San
José", nacimiento: {lugar:"Ucrania", fecha: {dia: 11, mes: "Septiembre", año: 1997}},
aficiones: ["descansar", "viajar", "deporte"], mascotas: 1}])
```

Para buscar al primero que haya nacido en Valencia.

```javascript
db.amigos.findOne({"nacimiento.lugar": "Valencia"})
```

* En la colección amigos busca todos los documentos que hayan nacido Valencia o Madrid.

```javascript
db.amigos.find({"nacimiento.lugar": {$in: ["Madrid", "Valencia"]}})
```

* En la colección amigos busca todos los documentos que tengan “beber” como afición
```javascript
db.amigos.find({"aficiones": "beber"})
```

*  En la colección amigos busca todos los documentos que tengan “beber” como única afición
```javascript
db.amigos.find({"aficiones": ["beber"]})
```

* En la colección amigos busca todos los documentos que solo tengan UNA afición.

```javascript
db.amigos.find({"aficiones": {$size: 1}})
```

* En la colección amigos busca todos los documentos que no hayan nacido en Valencia
```javascript
db.amigos.find({"nacimiento.lugar": {$ne: "Valencia"}})
```

* En la colección amigos devuelve solo los nombres de los documentos.

```javascript
db.amigos.find({}, {_id: false, nombre: 1})
```

* En la colección amigos devuelve solo los DOS PRIMEROS ordenados por nombre (ascendente)

```javascript
 db.amigos.find().sort({nombre: 1}).limit(2)
```

* En la colección amigos devuelve todos los documentos ordenados por edad (descendente) y luego nombre (ascendente).

```javascript
db.amigos.find({}).sort({"nacimiento.fecha.año": 1, "nacimiento.fecha.mes": 1, "nacimiento.fecha.dia": 1, nombre: 1})
```

* En la colección amigos devuelve todos los elementos pero solo muestra el nombre y su primera afición.
```javascript
db.amigos.find({}, {nombre: 1, aficiones: {$slice: 1}})
```

* En la colección amigos actualiza todas las ocurrencias de Valencia por València.
 
```javascript
db.amigos.updateMany({"nacimiento.lugar": "Valencia"}, {$set: {"nacimiento.lugar":
"València"}})
```


*  En la colección amigos decrementa todos los años de nacimiento en 1.

```javascript
db.amigos.updateMany({}, {$inc: {"nacimiento.fecha.año": -1}})
```

* En la colección amigos aumenta todos los años de nacimiento al año 1990 exceptuando aquellos
que son superiores a 1990.
```javascript
db.amigos.updateMany({}, {$max: {"nacimiento.fecha.año": 1990}})
```

 * En la colección amigos multiplica el número de mascotas por 2

```javascript
db.amigos.updateMany({}, {$mul: {mascotas: 2}})
```

* En la colección amigos renombra el campo aficiones por hobbies.
```javascript
db.amigos.updateMany({}, {$rename: {aficiones: "hobbies"}})
```

* En la colección amigos añade un hobbie nuevo a cada documento, sin modificar los anteriores

Esto podemos hacerlo con $addToSet o con $push
```javascript
db.amigos.updateMany({}, {$addToSet: {hobbies: "Tennis"}})
```

```javascript
db.amigos.updateMany({}, {$push: {hobbies: "Futbol"}})
```
* En la colección amigos borra el primer documento con más de 4 mascotas

```javascript
db.amigos.deleteOne({mascotas: {$gte: 4}})
```

se puede verificar con:

```javascript
db.amigos.count()
```

* En la colección amigos borra todos los documentos cuya ciudad de nacimiento sea Argentina.
```javascript
db.amigos.deleteMany({"nacimiento.lugar": "Argentina"})
```

* Clona la colección amigos a amigosDesechables.

// Da error - Está deprecado -> $out se usa en en cambio
```javascript
db.amigos.copyTo("amigosDesechables")
```

* Elimina la Colleción números de la base de datos

show collections;

db.numeros.drop();

show collections

* Para eliminar una base de datos haremos uso de dropDatabase()

```javascript
db.dropDatabase()
```

** Ejercicios de Agregación


1. Sobre la colección amigos realiza una proyección, convirtiendo la fecha a un formato
DD-MM-AAAA. La nueva variable será fechaNacimiento

```javascript
db.amigos.aggregate([
    { $project: {
        _id: 0,
        fechaNacimiento:
        { $concat: [
        {$toString: "$nacimiento.fecha.dia"},
        "-",
        {$toString: "$nacimiento.fecha.mes"},
        "-",
        {$toString: "$nacimiento.fecha.año"}
    ]
    }}}
])
```

2. Sobre la colección amigos realiza un match y una proyección.

En el match, seleccionaremos los documentos con más de una mascotas y la proyección nos
devolverá el nombre, la última afición y el número de mascotas.

```javascript
 db.amigos.aggregate([
{ $match: {mascotas: {$gt: 1}}},
{ $project: {_id: 0, nombre: 1, mascotas: 1, ultimaAficion: {$slice: ["$aficiones",
-1]}}}
])
```

3. Sobre la colección amigos realiza una agrupación por el lugar de nacimiento y el número de
personas nacidas en cada lugar. Después, ordena por el mayor número de personas nacidas en los
lugares.

```javascript
db.amigos.aggregate([
{ $group: {_id: "$nacimiento.lugar", cuenta: {$sum: 1}}},
{ $sort: { cuenta: -1 }}
])
```


4. Sobre la colección amigos realiza una proyección que devuelva el número de aficiones de cada documento

```javascript
 db.amigos.aggregate([
    { $project: {_id: 0, nombre: 1, cantidadAficiones: {$size: "$aficiones"}}}
])

```

5. En la colección amigos realiza una consulta que te devuelva un documento por cada ciudad y que sea único, ordenado por el nombre de la ciudad. Debes usar el operador $unwind
```javascript
db.amigos.aggregate([
    { $group: { _id: "arrayCiudades", nombreCiudad: {$addToSet: "$nacimiento.lugar"
}}},
    { $unwind: "$nombreCiudad" },
    { $sort: { nombreCiudad: 1 }}
])
```

6.  En la colección amigos realiza las siguientes operaciones:

   - Un match para todos aquellos documentos con año de nacimiento igual o superior a 1990.
   - Una proyección para elegir el nombre y crea un campo derivado llamado fechaNacimiento,que  convierta a fecha los campos año, mes y día de nacimiento.fecha.
   - Una ordenación de manera ascendente por el campo derivado fechaNacimiento.
   - Un límite para quedarnos con los 5 primeros.


La conversión a Date requiere de valores válidos para día, mes y año. Por lo que esta agregación fallará si disponemos de los meses de cada documento como cadenas de texto. Para ello, actualizaremos su valor a un valor numérico y así asegurarnos de que podemos realizar la agrupación correctamente.

Por ejemplo, vamos a poner todos los meses a 9:
```javascript
 db.amigos.updateMany({}, {$set: {"nacimiento.fecha.mes": 9}})

```

Ahora ya podremos hacer uso de $toDate para crear la fecha por la cual después ordenar:

```json
db.amigos.aggregate([
  {
    $match: { "nacimiento.fecha.año": { $gte: 1990 } },
  },
  {
    $project: {
      _id: 0,
      nombre: 1,
      "nacimiento.fecha.año": 1,
      fechaNacimiento: {
        $toDate: {
          $concat: [
            { $toString: "$nacimiento.fecha.año" },
            "-",
            { $toString: "$nacimiento.fecha.mes" },
            "-",
            { $toString: "$nacimiento.fecha.dia" },
          ],
        },
      },
    },
  },
  { $sort: { fechaNacimiento: 1 } },
  { $limit: 5 },
]);
```

7. En la colección amigos y sobre el ejercicio 6, almacena los documentos en una colección llamada top5.

```javascript

db.amigos.aggregate([
  {
    $match: { "nacimiento.fecha.año": { $gte: 1990 } },
  },
  {
    $project: {
      _id: 0,
      nombre: 1,
      "nacimiento.fecha.año": 1,
      fechaNacimiento: {
        $toDate: {
          $concat: [
            { $toString: "$nacimiento.fecha.año" },
            "-",
            { $toString: "$nacimiento.fecha.mes" },
            "-",
            { $toString: "$nacimiento.fecha.dia" },
          ],
        },
      },
    },
  },
  { $sort: { fechaNacimiento: 1 } },
  { $limit: 5 },
  { $out: "top5" },
]);

```
7. Podemos consultar la colección top5 y ver cómo se han introducido los documentos resultantes de la agregación:
```javascript
db.top5.find();
```

8. En la colección amigos muestra todas las aficiones ordenadas de mayor a menor ocurrencias. Se
busca un resultado similar al que sigue:

Podemos realizar este ejercicio de dos maneras

```javascript
db.amigos.aggregate([
    { $unwind: "$aficiones"},
    { $group: {"_id": "$aficiones", count: {$sum: 1}}},
    { $sort: {count: -1}}
])
```

```javascript
db.amigos.aggregate([
{ $unwind: "$aficiones"},
{ $sortByCount: "$aficiones"}
])
```

9. Edita la colección amigos, añadiendo una edad a cada documento. Sobre esta colección amigos
crea un bucket, agrupando por edad y que separe en 3 segmentos.
Además, debe devolver el número de personas que pertenecen al grupo y las ciudades (valores
únicos) a las que pertenecen las personas
```javascript
db.amigos.updateMany({}, {$set: {edad:Math.floor(Math.random() * 30) + 12}})
```
```javascript
db.amigos.find().forEach(function(amigo){db.amigos.update({_id:amigo._id}, {$set:
{edad:Math.floor(Math.random() * 30) + 12}})})
```
```json
db.clientes.aggregate([
    { $bucketAuto: {
    groupBy: '$edad',
    buckets: 4,
    output: {
        numPersonas: { $sum: 1},
        ciudades: { $addToSet: "$direccion.ciudad" }
    }
    }
  }
])
```


** EJERCICIOS DIAPOSITIVAS

Creación de la colección Frutas

```javascript
db.frutas.insertMany([{fruta: "platano", cantidad: 12, precio: 3.30},{fruta:
"manzana", cantidad: 12, precio: 2},{fruta:"sandia", cantidad: 9, precio:4},
{fruta:"manzana", cantidad: 20, precio: 1.50},{fruta:"sandia", cantidad: 16, precio:
2.45}, {fruta:"sandia", cantidad: 13, precio:3}])
```
Vamos ahora a agrupar las frutas por tipo de fruta y sacar la cantidad total y la media de sus precios.
Haremos uso de $sum para calcular la cantidad total y $avg para calcular la media.

```javascript
db.frutas.aggregate([{$group: {_id: "$fruta", cantidad: {$sum: "$cantidad"}, precio:
{$avg: "$precio"}}}])
```

Ahora queremos listar todas las cantidades y precios de las sandías, pero que no se nos muestre ni el _id ni el tipo de fruta. Para ello haremos uso de $match y $project:

```javascript
db.frutas.aggregate([{$match: {fruta: "sandia"}},{$project: {_id:0, cantidad:1,
precio:1}}])
```

A continuación vamos a trabajar con Map Reduce

Debemos agregar todas frutas cuyo tipo sea manzana a una nueva colección que solo contenga
manzanas, cada una con su precio único y la cantidad.

```javascript
db.frutas.mapReduce(function(){ emit(this.cantidad, this.precio);}, function(key,values){return $values},
{query:{fruta : "manzana"}, out : "manzanas" })
```

Ahora queremos conocer todas las frutas que son manzanas, sandías o plátanos:

```javascript
 db.frutas.count({fruta: "manzana"})
```

```javascript
 db.frutas.count({fruta: "sandia"})
```

```javascript
db.frutas.count({fruta: "platano"})
```


