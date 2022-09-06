const express = require('express');
const authController = require('../controlers/authController')
const router = express.Router();
const{ check } = require('express-validator')  // validar los datos antes de enviar
const auth = require('../middleware/auth')

router.post('/',
  authController.autenticarUsuario,
  [
    check('email','Agrega un email válido').isEmail(),
    check('password', 'El password no puede ir vacio').isEmpty()
  ]
);



router.get('/',
 auth,
 authController.usuarioAutenticado
);





module.exports = router