const express = require('express')
const conectarDB = require('./config/db');
const cors = require('cors');
const { get } = require('mongoose');

// crear servidor

const app = express()



//conectar la DB
conectarDB();




// Habilitar cors
const opcionesCors = {
  origin : process.env.FRONTEND_URL
  
  
}
app.use(cors(opcionesCors))


// puerto de al app
const PORT = process.env.Port || 4000;

// habilitar leer los valores del body en Json
app.use(express.json())

// Habilitar la carpeta publica
app.use(express.static('uploads'));

//rutas de la app
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/enlaces', require('./routes/enlaces'))
app.use('/api/archivos', require('./routes/archivos'))

app.get('/', (req, res)=>{
  res.send('pagina de inicio de la api...')
})
// arrancar la app
app.listen(PORT, '0.0.0.0', () =>{
  console.log('servidor arrancado en el puerto: ',PORT)
})