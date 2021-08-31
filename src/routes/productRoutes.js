const express = require('express');
const path = require('path');
const router = express.Router();
const productController = require('./../controllers/productController');
const fileUpload = require('../middlewares/productMulter');
const adminUser = require('../middlewares/admin');
const validationProducts = require('../middlewares/validationProducts');

router.get('/' , productController.list);
router.get('/create' , adminUser , productController.create);
//router.post('/create', fileUpload.single("productImage"), productController.processForm);
router.post('/create', validationProducts, productController.processForm);
    
router.get('/detail/:id' , productController.detail);

router.get('/edit/:id' , adminUser , productController.edit);

// accion de editar un producto
//router.put('/:id', fileUpload.single("productImage"), productController.update);
router.put('/:id', validationProducts, productController.update);

// accion de eliminar un producto
router.delete('/:id', productController.destroy); 





module.exports = router;