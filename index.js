const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const PORT = 3000;

const app = express(); //se crea el objeto app con el que Express hara la consulta de la API

app.use(cors()) //se le asignan los permisos cors al objeto de express
app.use(bodyParser.json()); //se le asigna la propiedad json a Express para que pueda trabajar con objetos JSON
app.use(require('./src/app.js')) //se le asignan las rutas al objeto de Express 

console.clear()
app.listen(PORT, () => console.log(`Server running on port ${PORT}!!!!!!!!`)) //corre el objeto Express para que ya se puedan hacer consultas API