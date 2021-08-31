const path = require ('path');
const {body} = require ('express-validator');
const validations = [
    body('user').notEmpty().withMessage('Ingresá tu nombre'),
    body('lastNameUser').notEmpty().withMessage('Ingresá tu apellido'),
    body('userImage').custom((value , {req}) => {
        if(req.files!=null){
            const objImages= req.files.userImage;
            if(objImages.mimetype!="image/gif"&&objImages.mimetype!="image/png"&&objImages.mimetype!="image/jpeg"&&objImages.mimetype!="image/bmp"&&objImages.mimetype!="image/webp"){
               throw new Error ('El archivo debe ser formato imagen'); 
            }
            else if (objImages.size>30000){
                throw new Error ('El tamaño del archivo supera el máximo permitido. Puedes intentar nuevamente. Recuerda que la imagen de perfil no es obligatoria.'); 
            }
            return true
            } else {
                return true
            }
        })
]

module.exports = validations