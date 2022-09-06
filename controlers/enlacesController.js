const Enlaces = require('../models/Enlace');
const shortid = require ('shortid');
const bcrypt =require('bcrypt');
const {validationResult} = require('express-validator');

exports.nuevoEnlace = async (req, res, next) =>{
    
    // revisar si hay errores
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    // Crear un objeto de Enlace

    const { nombre_original, nombre } = req.body;


    const enlace = new Enlaces()
    enlace.url = shortid.generate()
    enlace.nombre = nombre
    enlace.nombre_original = nombre_original;
    
    
    // si el usuario esta autenticado
     if(req.usuario){
        const {password, descargas}=req.body
        // asignar a enlace el Nº de descargas
        if(descargas){
            enlace.descargas = descargas;
        }
        // asignar password
        if(password){
            const salt = await bcrypt.genSalt(10);

            enlace.password = await bcrypt.hash(password, salt);
        }
        // Asignar el autor

        enlace.autor=req.usuario.id
     }

    // almacenar enlace en la DB

    

  try {
    await enlace.save();
    return res.json({msg: `${enlace.url}`});
    next()
  } catch (error) {
    console.log(error)
  }
   
}

//obtener listado de todos los enlaces

exports.todosEnlaces = async (req, res)=>{
  try {
    const enlaces = await Enlaces.find({}).select('url -_id')
    res.json({enlaces})
  } catch (error) {
    console.log(error)
  }
}
// comprobar si tiene password

exports.tienePassword = async(req, res, next) =>{
 
  const {url} = req.params
 
  // verificar si el enlace existe

  const enlace = await Enlaces.findOne({url})
  if(!enlace){
    res.status(404).json({msg:'Este enlace no Existe'})
    return next()
  }
  if(enlace.password){
    return res.json({password: true,enlace: enlace.url})
  }
  next();
}

// verifica el password del archivo

exports.verificarPassword = async (req, res, next) =>{
  const {url} = req.params
  const {password}= req.body

  // consultamos por el enlace

  const enlace = await Enlaces.findOne({url});

  // verificar password

  if (bcrypt.compareSync(password, enlace.password)){
    // permitimos descarga 
    next()
  }else{
    res.status(401).json({msg:'Password Incorrecto'})
  }
}

// obtener enlaces

exports.obtenerEnlace = async (req, res, next)=>{
  const {url} = req.params
 
  // verificar si el enlace existe

  const enlace = await Enlaces.findOne({url})
  if(!enlace){
    res.status(404).json({msg:'Este enlace no Existe'})
    return next()

  }// si existe
    res.status(200).json({archivo: enlace.nombre, password:false})

    
   next()                                                             
   


  



 

}