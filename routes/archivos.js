const express = require('express');
const archivosController = require('../controlers/archivosController')
const router = express.Router();
const{ check } = require('express-validator') ; // validar los datos antes de enviar
const auth = require('../middleware/auth');




router.post('/',
  auth,
  archivosController.subirArchivo
);

router.get('/:archivo',
archivosController.descargarArchivo,
archivosController.eliminarArchivo
)


module.exports = router;