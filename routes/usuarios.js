const express = require('express');
const usuaControler = require('../controlers/usuarioController')
const router = express.Router();
const{ check } = require('express-validator')  // validar los datos antes de enviar


router.post('/',
[
  check ('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check ('email', 'El Email no válido').isEmail(),
  check ('password', 'El password debe ser al menos de 6').isLength({min: 6}),
  

], 
  usuaControler.nuevoUsuario
       
);


module.exports = router;