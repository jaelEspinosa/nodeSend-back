const multer = require('multer');
const shortid = require('shortid')
const fs = require ('fs')
const Enlaces = require('../models/Enlace')




exports.subirArchivo = async (req, res, next)=>{ 

    const configuracionMulter = {
        limits : { fileSize : req.usuario ? 1024*1024*10 : 1024*1024},
        storage : fileStorage = multer.diskStorage({
            destination: (req, file, cb) =>{
              cb(null,__dirname+'/../uploads')
            },
        filename: (req, file, cb)=>{
            const extension = file.originalname.substring(file.originalname.lastIndexOf('.'),file.originalname.length) // cortamos desde el último punto hasta el final del string
                                                                                                                       // por ej. '.jpg'
            cb(null, `${shortid.generate()}${extension}`);
        },
    
        })       
    }
    
    
    const upload = multer(configuracionMulter).single('archivo')
    upload(req, res, async (error)=>{
        console.log(req.file)

        if(!error){
            res.json({archivo: req.file.filename})
            
        }else{
            console.log(error)

            return next()
        }
    });

}


exports.eliminarArchivo = async (req, res, next)=>{
    console.log('vamos a eliminar el Archivo..',req.archivo)
    try {
        fs.unlinkSync(__dirname+`/../uploads/${req.archivo}`)
        console.log('eliminado correctamente')
    } catch (error) {
        console.log(error)
    }
}

// descarga un archivo


exports.descargarArchivo = async (req, res, next)=>{

// obtiene el enlace
const enlace = await Enlaces.findOne({nombre : req.params.archivo})

  const archivoDescarga = __dirname +'/../uploads/'+req.params.archivo
    
  res.download(archivoDescarga)
 // si las descargas son iguales a 1 -Borrar entrada y archivo  
   console.log( 'el enlace es....',enlace)
  
 const {descargas, nombre} = enlace
    // Eliminar el archivo y la entrada de la DB
    if (descargas === 1){
    
        // eliminar archivo
        
        req.archivo = nombre
    
        //eliminar la entrada de la DB
        await Enlaces.findOneAndRemove(enlace.id)
         next()
    
       }else{
         // si las descargas son mayores que 1 -hay que restar 1
        enlace.descargas--;
        await enlace.save()
       }
}

