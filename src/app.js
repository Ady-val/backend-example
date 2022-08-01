const express = require('express');
const jwt = require('jsonwebtoken');
const Password = require('./services')
const bcrypt = require('bcrypt')

const saltRounds = 10

const app = express.Router(); //se crea el obtejo que contendra todas las rutas para que sean llamadas en la API

/* Esta ruta sirve para probar si nuestra API esta funcionando correctamente Lo puedes correr en el navegador como https://localhost:3000/test. */
app.get('/test', (req, res) => {
  res.send({
    message: 'Mensaje recibido',
    success: true
  })
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body; //se obtiene el correo y la contra que se mandaron en la peticion de la ruta
  
  const userEmail = 'prueba@correo.com' //correo de prueba
  const userName = 'pablo'
  const userPassword = '$2b$10$z8u/XP5DXrjCYfJAtDkHS.bN5cyna2KLKAtp4mQAAkm8SArB5nKa.' //hash de la contra Alex123#@! 

  if (email !== userEmail) {
      return res.status(409).json({ success: false, message: "Invalid credentials" }); //si el usuario no existe esta es lamanera en que se envia una respuesta de error ya no continua con el resto del codigo
  }

  const passwordMatch = await Compare(userPassword, password)

  if (passwordMatch) {
    //se crea token de acceso
    const token = await jwt.sign(
      //el token de acceso contendra la informacion del usuario
      {
        id: email, 
        role: 'user'
      }, 
      //esta es la palabra clave con la que se encripta el token y tambien se usa para desencriptar para obtener la informacion que contiene del usuario
      'asdfasdf'
    );

    res.status(200).send({user: email, token, userName});// se envia un success para que el cliente sepa que ya tiene acceso junto con el token que debe envar en cada momento

  } else {
    //en caso de que la contras no coincidan se envia el error de la siguiente manera
    return res.status(401).json({ success: false, message: "Invalid password" });
  }
  
  //si se trabaja con una base de datos de mongo, esta es la forma en la que se consulta a la base de datos si el usuario existe en el sistema
  // const existingUser = await User.findOne({ email }); 
  // if (!existingUser) {
  //   return res.status(409).json({ success: false, message: "Invalid credentials" });
  // }
  //y en esta parte se compara la contra del usuario que esta en la base de datos y la contra que se mando
  // const passwordsMatch = await Password.compare(
  //   existingUser.password,
  //   password,
  // );
})

const Compare = async (storedPassword, suppliedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(suppliedPassword, storedPassword, (err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}

module.exports = app; //se exporta el objeto que contiene todas las rutas