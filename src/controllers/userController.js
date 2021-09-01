let fs = require('fs');
let path = require('path');
let userListPath = path.join(__dirname,"../dataBase/userList.json");
let userDatos = fs.readFileSync (userListPath, 'utf-8');
let {validationResult} = require ('express-validator');
const bcryptjs = require('bcryptjs');
//const userLogin = require('../models/User')

let db = require("../dataBase/models");
let Op = db.Sequelize.Op;

let userListOl ;
if (userDatos == "") {
    userListOl = [];
} 
else { 
    userListOl = JSON.parse(userDatos);
};

let userController = {
    register: function(req,res){
        res.render('users/register');
    },
    profile: function(req,res){       
    //comprobacion de como funcionan las cookies
    // if(req.cookies.userEmail){
    //     console.log(req.cookies.userEmail);
    // } else {
    //     console.log('No hay cookie');
    // }
    //comprobacion de como funcionan las cookies
        res.render('users/profile',{user:req.session.userLogged}); 
    },
    login: function(req,res){
        res.render('users/login'); 
    },
    loginProcess: function(req,res){   
    let errorMessage= 'Las credenciales son inválidas';

    db.user.findOne( {
        where: {
            email: req.body.email
        }
    })
    .then(function(userToLog){
        let passwordOk= bcryptjs.compareSync(req.body.password , userToLog.password)
               if(passwordOk){ 
                    req.session.userLogged= userToLog;   
               } else { 
                    res.render('users/login',{errorMessage})
               }})
    .then(function(){
        res.redirect('/users/profile')
    })         
    .catch(function(e){
        return res.render('users/login',{errorMessage})
    })
    },
    storeRegister: function(req,res){
        //console.log(req.files);
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render('users/register' , {mensajeError : errors.array() , old:req.body})
        };
        db.user.findOne( {
            where: {
                email: req.body.email
            }
        })
        .then(function(user){
            if(user){
                return res.render('users/register' , {mensajeError: [{msg:"Ya existe un usuario registrado con este email."}]})
            } else {
                let userImage;
                if(req.files){
                    const objImages= req.files.userImage;
                    userImage= Date.now() + path.extname(objImages.name);
                    objImages.mv(__dirname+'../../../public/imagenes/userImages/'+userImage,(err)=>{
                        if (err) {
                            // aqui deberia redirigir a la pagina de error
                            return res.send("Hubo un error");
                        }
                    });
                } 
                else {
                    userImage='';
                }
                db.user.create(
                    {
                        email: req.body.email,
                        password: bcryptjs.hashSync(req.body.password , 10),
                        user_name: req.body.user,
                        lastName_user: req.body.lastNameUser,
                        user_image: userImage                         
                    });
                res.redirect("/users/profile")
            }      
        })
    },
    logout: function(req , res){
        //res.clearCookie('userEmail');
        req.session.destroy()
        res.redirect('/')
    },

    editProfile: function(req,res){
        db.user.findByPk(req.params.id)
            .then(function(user){
                return res.render('users/editProfile',{user});
            })       
    },
    updateProfile: function(req,res){
        db.user.findByPk(req.params.id)
            .then(function(user){
                let userImages_path= path.join(__dirname+'../../../public/imagenes/userImages/');
                let errors = validationResult(req);
                if(!errors.isEmpty()){
                    return res.render('users/editProfile', {user, mensajeError: errors.array(), old:req.body})    
                }
                else if(req.files){
                    if(user.user_image!=""){
                        let imageToDelete_path= userImages_path + user.user_image;
                        fs.unlinkSync(imageToDelete_path); 
                    }
                    const objNewImage= req.files.userImage;
                    let imageUser_name= Date.now() + path.extname(objNewImage.name);
                    objNewImage.mv(userImages_path + imageUser_name,(err)=>{
                        if (err) {
                            // aqui deberia redirigir a la pagina de error
                            return res.send("Hubo un error");
                        }
                    });
                    db.user.update({
                        user_name: req.body.user,
                        lastName_user: req.body.lastNameUser,
                        user_image: imageUser_name             
                    },{
                        where: {id:req.params.id}
                    })
                }    
                else if (req.body.deleteImage) {
                    let imageToDelete_path= userImages_path + user.user_image;
                    fs.unlinkSync(imageToDelete_path); 
                    db.user.update({ 
                        user_name: req.body.user,
                        lastName_user: req.body.lastNameUser,
                        user_image: "",
                        },
                        {
                            where: {id:req.params.id}
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
                }   
                req.session.destroy()
                return res.redirect('/users/login');    
            })       
    }   
}

module.exports = userController;