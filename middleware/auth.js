const jwt = require('jsonwebtoken');
require('dotenv').config({path : 'variables.env'})


module.exports = (req, res, next) =>{
    const authHeader = req.get('authorization')
if(authHeader){
   // Obtener Token

   const token = authHeader.split(' ')[1]

   // comprobar el JWT
   try {
   const usuario = jwt.verify(token, process.env.SECRETA)
   req.usuario = usuario;
   return next();
   } catch (error) {
    console.log(error);
    res.json({msg:'Sesión Expirada, inicia sesión nuevamente'})
    return   // TODO ************************************************************ no se si es correcto
   }
   
}

    return next()
}