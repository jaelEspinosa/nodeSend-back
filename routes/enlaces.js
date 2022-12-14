const express = require('express');
const enlacesController = require('../controlers/enlacesController')
const archivosController = require('../controlers/archivosController')
const router = express.Router();
const{ check } = require('express-validator')  // validar los datos antes de enviar
const auth = require('../middleware/auth')



router.post('/',
[
  check('nombre' , 'Sube un archivo').not().isEmpty(),
  check('nombre_original' , 'Sube un archivo').not().isEmpty(),
],
   auth,
   enlacesController.nuevoEnlace

)

router.get('/',
  enlacesController.todosEnlaces
)
router.get('/:url',
  enlacesController.tienePassword,
  enlacesController.obtenerEnlace,
  
)

router.post('/:url',
 enlacesController.verificarPassword,
 enlacesController.obtenerEnlace,
)

module.exports = router;
