const bcrypt = require('bcrypt')

const saltRounds = 10
  
/* Esta funcion sirve para hacer un hash de un password para que despues sea guardada en la base de datos */
export const ToHash = async (password) => {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, ((err, hash) => {
      if (err) reject(err);
      resolve(hash)
    }))
  })
  return hashedPassword;
}

/* Esta funcion sirve para comparar el hash de un password (storedPassword) y el password que manda el cliente (suppliedPassword) el cual devuelve un true si hicieron match y un false si no fue asi */
export const ComparePass = async (storedPassword, suppliedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(suppliedPassword, storedPassword, (err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}
