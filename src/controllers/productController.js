const { promiseImpl } = require('ejs');
let fs = require ('fs');
let path = require ('path');
let productListPath = path.join(__dirname, '../dataBase/productList.json');
let datos = fs.readFileSync (productListPath, 'utf-8'); 
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
    create: function(req,res){
        db.category.findAll()
            .then(function(category){
                res.render('products/createProduct', {category})
            })
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





                    //console.log(productD);
                    //return res.send(relatedProduct)

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
    
         // let idProd = req.params.id
        // let productD = ''

        // for(let i=0; i<productListOl.length; i++){
        //     if(productListOl[i].id == idProd){
        //         productD = productListOl[i]
        //     }
        // }

        //     let relatedProduct = productListOl.filter((e)=>{
        //         return e.category == productD.category
        // })

    edit: function(req,res){
        let product = db.product.findByPk(req.params.id);
        let category = db.category.findAll(); 
        Promise.all([product, category])
        .then(function([product, category]){
            res.render('products/editProduct', {product, category})
        })
        // let idProduct= req.params.id;
        // let product= productListOl.find(element=>element.id==idProduct);
        // //console.log(product);
        // //let product= productListOl[idProduct-1]
        // res.render('products/editProduct',{product});
    },

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
    processForm: function(req,res){
       
        let imageProduct;
        if(req.file){
            imageProduct=req.file.filename;
        } else{
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
    },
    update:(req,res)=>{
        let imageProduct;
        if(req.file){
            imageProduct=req.file.filename;
        };
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

        },
    //     idProduct= req.params.id;
    //     let productToMidyfy= productListOl.find(element=>element.id==idProduct);
    //     let modifiedProduct={
    //         id: idProduct,
    //         name: req.body.name,
    //         category: req.body.category,
    //         price: req.body.price,
    //         payWay: req.body.payWay,
    //         cuotas: req.body.cuotas,
    //         interest: req.body.interest,
    //         description: req.body.description
    //     }
    //     if(req.file){
    //         modifiedProduct.productImage=req.file.filename;
    //     } else if (req.body.deleteImage=='on'){
    //         modifiedProduct.productImage='';
    //     } else{
    //         modifiedProduct.productImage=productToMidyfy.productImage;
    //     }
    //     modifiedProduct.inStock= true;
    //     //splice sirve si no se borra nunca ningun producto del json
    //     //productListOl.splice((idProduct-1),1,modifiedProduct);
    //     //splice sirve si no se borra nunca ningun producto del json
    //     for(let i=0; i<productListOl.length;i++){
    //         if(productListOl[i].id==modifiedProduct.id){
    //             productListOl[i]=modifiedProduct;
    //             break;
    //         }
    //     }
    //     console.log(req.body.deleteImage);
    //     let productListOlupdated= JSON.stringify(productListOl, null, " ");
    //     fs.writeFileSync(productListPath, productListOlupdated)
    //     res.redirect('/product');
    // },
    destroy: function(req,res){
    db.product.update({
        showing: 0
    }, {where : {id: req.params.id}

    })
    res.redirect('/product');

}
    
    
    // function(req,res){
    //     let id= req.params.id;
    //     for(let i=0; i<productListOl.length; i++){
    //         if(productListOl[i].id==id){
    //             productListOl[i].inStock= false;

    //             // bloque de codigo para borrar fisicamente el registro en el json
    //             /*if(productListOl[i].productImage){
    //                 var imageToDelete= productListOl[i].productImage;
    //             }
    //             productListOl.splice(i,1);*/
    //             // bloque de codigo para borrar fisicamente el registro en el json
                
    //         }
    //         break;
    //     };

    //     // bloque de codigo para borrar la imagen fisicamente
    //     /*if(imageToDelete){
    //         fs.unlinkSync(path.join(__dirname, '../../public/imagenes/productImages/')+imageToDelete);
    //     }*/
    //     // bloque de codigo para borrar la imagen fisicamente

    //     fs.writeFileSync(productListPath,  JSON.stringify(productListOl, null, " "));
    //     res.redirect('/product');   
    // }
}

module.exports = productController;


/*
let fs = require ('fs');
let path = require ('path');
let productListPath = path.join(__dirname, '../dataBase/productList.json');
let datos = fs.readFileSync (productListPath, 'utf-8');
let productListOl ;
if (datos == "") {
    productListOl = [];
} 
else { 
    productListOl = JSON.parse(datos);
};

let productController = {
    create: function(req,res){
        res.render('products/createProduct');
    },
    detail: function(req,res){
        res.render('products/productDetail');
    },

    edit: function(req,res){
        res.render('products/editProduct');
    },

    list: function(req,res){
        res.render('products/productList', {productListOl});
    },
    processForm: function(req,res){
        let newProduct= {
            id: productListOl.length+1,
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            payWay: req.body.PayWay,
            cuotas: req.body.cuotas,
            interest: req.body.interest,
            description: req.body.description
        };
        
        if(req.file){
            newProduct.productImage=req.file.filename;
        }
        console.log(req.file)
        productListOl.push(newProduct);
        let productListOlupdated= JSON.stringify(productListOl, null, " ");
        fs.writeFileSync(productListPath, productListOlupdated)
        res.redirect('/')
        
        
    }
}

module.exports = productController;
*/