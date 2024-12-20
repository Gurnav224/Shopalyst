const express = require('express');
const { addToCart, viewCart, removeFromCart, updateQuantity } = require('../controllers/cart.controller');
const auth = require('../middlewares/auth');
const  router = express.Router();


router.post('/cart', auth,addToCart);
router.get('/cart', auth ,viewCart);
router.delete('/cart',auth,removeFromCart);
router.put('/cart/update',auth,updateQuantity);

module.exports = router;