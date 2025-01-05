const express = require('express');
const { createOrder, getOrderDetails } = require('../controllers/order.controller');
const auth = require('../middlewares/auth');
const router = express.Router();


router.post('/order',auth, createOrder);
router.get('/order',auth,getOrderDetails)

module.exports = router;