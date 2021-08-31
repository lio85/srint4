const { promiseImpl } = require('ejs');
let fs = require ('fs');
let path = require ('path');
let productListPath = path.join(__dirname, '../dataBase/productList.json');
let datos = fs.readFileSync (productListPath, 'utf-8'); 
let {validationResult} = require ('express-validator');
let db = require("../dataBase/models");
let Op = db.Sequelize.Op;
let productListOl ;
if (datos == "") {
    productListOl = [];
} 
else { 
    productListOl = JSON.parse(datos);
};
let productController = {
    list: function(req,res){
        db.product.findAll({
            where: {
                showing: { [Op.gt]: 0 }
            }
        })
        .then(function(productsStockOn){
            return res.render("products/productList", {productsStockOn});
        })
    },
    create: function(req,res){
        db.category.findAll()
            .then(function(category){
                res.render('products/createProduct', {category})
            })
    },
    processForm: function(req,res){
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(req.body);
            db.category.findAll()
            .then(function(category){ 
                return res.render('products/createProduct', {category, mensajeError: errors.mapped(), old:req.body})
            })
        }
        else {       
            let imageProduct;
            if(req.files!=null){
                const objImages= req.files.productImage;
                imageProduct= Date.now() + path.extname(objImages.name);
                objImages.mv(__dirname+'../../../public/imagenes/productImages/'+imageProduct,(err)=>{
                    if (err) {
                        // aqui deberia redirigir a la pagina de error
                        return res.send("Hubo un error");
                    }
                });              
            }
            else {
                imageProduct='';
            }
            let showing;
            if(req.body.showing=='on'){
                showing= 1;
            } else{
                showing= 0;
            }
            db.product.create(
                {
                name: req.body.name,
                id_category: req.body.category,
                description: req.body.description,
                stock: req.body.stock,
                price: req.body.price,
                image_product: imageProduct,
                showing: showing
            });
            res.redirect("/product")
        }
    },
    detail: function(req,res){
        db.product.findAll()
        .then(function(product){
            let validUrl= false;
            if(req.params.id>=1 && req.params.id<=product.length){
                validUrl=true
            }
            if(validUrl==true){
                let productD = product.find(products=>
                    products.id==req.params.id,
                    );
                let related_product_list = product.filter(products => {return products.id_category == productD.id_category})
                if(productD.showing==1){
                    let related_product_list_less_productD = related_product_list.filter(products => {return products.id != productD.id})
                let relatedProduct=[];
                if(related_product_list_less_productD.length>=3){               
                    for (let i=0; i<3;i++){
                        let relatedProduct_random_position= Math.floor(Math.random()*related_product_list_less_productD.length);
                        if(relatedProduct.length==0){
                            relatedProduct.push(related_product_list_less_productD[relatedProduct_random_position]);
                        } else {
                            let is_inside= relatedProduct.find(product_founded=>
                                product_founded.id==related_product_list_less_productD[relatedProduct_random_position].id
                            )
                            if(is_inside){
                                i--
                            } else {
                                relatedProduct.push(related_product_list_less_productD[relatedProduct_random_position]);
                            }
                        }
                    }
                } else {
                    relatedProduct= related_product_list_less_productD;  
                }
                    res.render('products/productDetail', {productD , relatedProduct , user:req.session.userLogged})
                }
                else {
                    let msjNotFound = "El producto no existe, maldito."
                    res.redirect("/")
                }
            }
            else {
                let msjNotFound = "El producto no existe, maldito."
                res.redirect("/")
            }
        })    
    },
    edit: function(req,res){
        let product = db.product.findByPk(req.params.id);
        let category = db.category.findAll(); 
        Promise.all([product, category])
        .then(function([product, category]){
            res.render('products/editProduct', {product, category})
        })
    },   
    update:(req,res)=>{
        let errors = validationResult(req);
        if(!errors.isEmpty()){ 
            console.log(req.body);
            let product = db.product.findByPk(req.params.id);
            let category = db.category.findAll(); 
            Promise.all([product, category])
                .then(function([product, category]){
                    return res.render('products/editProduct', {product, category, mensajeError: errors.mapped(), old: req.body})
                })
        }
        else {  
            let imageProduct;
                if(req.files!=null){
                    const objImages= req.files.productImage;
                    imageProduct= Date.now() + path.extname(objImages.name);
                    objImages.mv(__dirname+'../../../public/imagenes/productImages/'+imageProduct,(err)=>{
                        if (err) {
                            // aqui deberia redirigir a la pagina de error
                            return res.send("Hubo un error");
                        }
                    });              
                }        
            if(imageProduct){
                db.product.update({
                name: req.body.name,
                id_category: req.body.category,
                description: req.body.description,
                stock: req.body.stock,
                price: req.body.price,
                image_product: imageProduct,
                }, {
                    where: {id:req.params.id}
                })            
            }        
            else if (req.body.deleteImage) {
                db.product.update({ 
                    name: req.body.name,
                    id_category: req.body.category,
                    description: req.body.description,
                    stock: req.body.stock,
                    price: req.body.price,
                    image_product: "",
                    },
                    {
                        where: {id:req.params.id}
                    })
            }
            else  {
                db.product.update({ 
                name: req.body.name,
                id_category: req.body.category,
                description: req.body.description,
                stock: req.body.stock,
                price: req.body.price,
                },
                {
                    where: {id:req.params.id}
                })          
            }
            res.redirect('/product')
        }
    },
    destroy: function(req,res){
        db.product.update({
            showing: 0
            }, 
            { where : {id: req.params.id}})
        res.redirect('/product');
    }
}

module.exports = productController;


