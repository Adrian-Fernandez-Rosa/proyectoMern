
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

