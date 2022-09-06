
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator')
require('dotenv').config({path : 'variables.env'})


exports.autenticarUsuario = async (req, res, next) =>{
  // revisar si hay errores
  const errores = validationResult(req);

  if(!errores.isEmpty()){
    return res.status(400).json({errores: errores.array()})
}
  

  // Buscar el usuario para ver si esta registrao
const{ email, password } = req.body
let usuario = await Usuario.findOne({ email })
 if (!usuario){
    res.status(401).json({msg:'Usuario no encontrado'})
    return next()
 }
    // Verificar el password y autenticar el usuario

    if (bcrypt.compareSync(password,usuario.password)){
        // Generar un jsonWebToken
        const token = jwt.sign({
            id:usuario._id,
            nombre : usuario.nombre,
            email: usuario.email
        },
           process.env.SECRETA,{
            expiresIn: '8H'
           }
        );
  res.json({token})

    }else{
        res.status(401).json({msg:'**El password es incorrecto**'})
    }
    
   
}


exports.usuarioAutenticado =  async (req, res, next) =>{
  

res.json({usuario : req.usuario})

}