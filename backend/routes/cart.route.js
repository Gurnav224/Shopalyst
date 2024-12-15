const express = require('express');
const { addToCart, viewCart, removeFromCart, updateCart } = require('../controllers/cart.controller');
const  router = express.Router();


router.post('/cart',addToCart);
router.get('/cart',viewCart);
router.delete('/cart/:productId',removeFromCart);
router.put('/cart', updateCart)

module.exports = router;