const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

const guestUser = require('../middlewares/guestUser');

router.get('/' , indexController.index);

router.get('/cart/:id', guestUser, indexController.cart);

router.get('/faqs' , indexController.faqs);

router.get('/nosotros' , indexController.nosotros);

module.exports = router;