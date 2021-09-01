let updateProfile= function(req,res){
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        db.user.findByPk(req.params.id)
        .then(function(user){
            return res.render('users/editProfile', {user, mensajeError: errors.array(), old:req.body})
        })     
    }
    else {
        if(req.files){
            db.user.findByPk(req.params.id)
            .then(function(user){
                if(user.user_image!=""){
                    console.log("Esta foto se va a eliminar: "+ user.user_image);
                    let oldImageRoute= path.join(__dirname+'../../../public/imagenes/userImages/'+user.user_image);
                    console.log("Esta es su ubicacion: "+ oldImageRoute);
                    fs.unlinkSync(oldImageRoute); 
                }
                const objImages= req.files.userImage;
                let new_image= Date.now() + path.extname(objImages.name);
                objImages.mv(__dirname+'../../../public/imagenes/userImages/'+new_image,(err)=>{
                console.log("Se creó la "+ new_image);
                if (err) {
                    // aqui deberia redirigir a la pagina de error
                    return res.send("Hubo un error");
                }
                db.user.update({
                    user_name: req.body.user,
                    lastName_user: req.body.lastNameUser,
                    user_image: new_image             
                },{
                    where: {id:req.params.id}
                })
                req.session.destroy()
                return res.redirect('/users/login'); 
                })     
            });                        
        }
        else if (req.body.deleteImage) {
            db.user.findByPk(req.params.id)
                .then(function(user){
                    console.log("Esta foto se va a eliminar: "+ user.user_image);
                    let oldImageRoute= path.join(__dirname+'../../../public/imagenes/userImages/'+user.user_image);
                    console.log("Esta es su ubicacion: "+ oldImageRoute);
                    fs.unlinkSync(oldImageRoute); 
                    db.user.update({ 
                        user_name: req.body.user,
                        lastName_user: req.body.lastNameUser,
                        user_image: "",
                        },
                        {
                            where: {id:req.params.id}
                        })
                    req.session.destroy()
                    return res.redirect('/users/login');
                })       
        }
        else  {
            db.user.update({ 
                user_name: req.body.user,
                lastName_user: req.body.lastNameUser,
            },
            {
                where: {id:req.params.id}
            })           
            req.session.destroy()
            return res.redirect('/users/login');
        }       
    }    
}