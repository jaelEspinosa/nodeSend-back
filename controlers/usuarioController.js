const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')


exports.nuevoUsuario = async (req, res) =>{
    // Mostrar mensajes de error de express validator

    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }


    // verificar si el usuario ya está registrado
   const {email, password} = req.body;
   let usuario = await Usuario.findOne({email});

   if(usuario){
    return res.status(400).json({msg : "El usuario ya está registrado"})
    
   }
      
   // una vez verificado creamos nuevo usuario
  
        usuario = new Usuario(req.body)
  // hasheamos el password

        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt);

 // una vez hasheado el password ya lo podemos insertar en la DB
   try {    
        await usuario.save()
        res.json({msg : 'Usuario Creado Correctamente'})  
    } catch (error) {
        console.log(error) 
        res.json(error.msg)
    }
    
} 