
Descarga el JSON de 5000 contactos (Carpeta de MOCKS del Repo del proyecto (https://gitlab.com/masajo/code-verifier-backend/-/tree/main/mocks))

JSON obtenido de la API Rest Pública (https://randomuser.me/api/?results=5000)

Crea una base de datos en Mongo con Mongo Compass llamada “Pruebas”

Importa el JSON a una colección llamada Contacts

Hacer peticiones al servidor de Mongo desde Mongo Compass & Mongo Shell para hacer los siguientes ejercicios:

1 Listar todos los contactos.

```javascript
    db.Contacts.find()
```

Busca el primer contacto que sea de Alemania (Germany).

```javascript
  db.Contacts.findOne({"location.country": 'Germany'});
```

Busca todos los contactos que tengan Blake como nombre (first).

```javascript
   db.Contacts.find({ "name.first" : "Blake"});
```
Busca los primeros 5 contactos que tengan como género (gender) hombre (male)
```javascript
   db.Contacts.find({"gender": "male"}).limit(5)
```
Devuelve los 4 primeros contactos ordenados por nombre (name) de manera descendente.

```javascript
  db.Contacts.find().sort({"name.first": 1}).limit(4)
```
Clona la colección de Contacts a CopiaContacts y luego bórrala.

```javascript
    db.Contacts.aggregate([{ $out: "CopiaContacts"}]);
```
Eliminando:
```javascript
    db.CopiaContacts.drop();
```
Renombra el campo de name por nombre.
```javascript
db.Contacts.updateMany({}, {$rename: {name: "nombre"}})
```

Borra todos los contactos que tengan como estado (state) Florida.
```javascript
db.CopiaContacts.deleteMany({"location.state": "Florida"})
```

** Ejercicios mongo parte B. 

Muestra las primeras 5 ciudades que empiecen por A ordenadas de manera ascendente, las soluciones deben ser únicas.

```json
db.Contacts.aggregate([
    {
        $match: { "location.city":  /^A/    }
    }, 
    {
        $project: { _id: 0,"location.city":1}
        },
       
        { $group: {_id: "$location.city" }},
        { $sort: {_id: 1}},
         { $limit: 5}
])
```


Crea una colección a parte, que solo contenga a los contactos de Francia (France) y que tengan entre 18 y 50 años. Usa una agregación para ello.

```json

db.Contacts.aggregate([
    {
        $match: { "location.country": "France", "dob.age": {$gte:18},"dob.age": {$lt:50}  }
        },
        {
         $out: "franceses"
        }
])



```

Añade un número favorito a cada contacto, luego crea un bucket agrupando por número favorito que separe en 5 segmentos.

```javascript

db.Contacts.updateMany({}, {$set: { favoriteNumber: Math.floor(Math.random() *50000)}} )

db.Contacts.find().forEach(
        function(contacto) { 
        db.Contacts.update({_id: contacto._id}, {$set: {favoriteNumber: Math.floor(Math.random() *50000)} })
        }
)

db.Contacts.aggregate([ 
    {
    $bucketAuto: {
        groupBy: '$favoriteNumber',
        buckets: 6,
        output: {
            numpersonas: { $sum: 1}
        }
    }
    
    }
    ])

```

En la colección de Contatcs, haz una proyección la cual tiene que devolver solo el name y username del contacto.

```javascript
db.Contacts.aggregate([
        { $project: {_id:0 ,nombre: 1, "login.username": 1 } }

])
```



Haz una proyección convirtiendo la fecha (date) a un formato DD-MM-AAAA, la nueva variable será fechaNacimiento

```javascript
db.Contacts.aggregate([
  {
    $project: {
      _id: 0,
      nombreCompleto: {
        $concat: [
          '$name.first', ' ','$name.last'
        ]
      },
      fechaNacimiento: {
        $dateToString: {
          format: '%d-%m-%Y',
          date: {
            $dateFromString: {
              dateString: '$dob.date'
            }
          }
        }
      }
    }
  }
])
```