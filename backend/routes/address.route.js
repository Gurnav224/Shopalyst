const express = require('express');
const { createAddress, getAddress, updateAddress, deletetAddress } = require('../controllers/address.controller');
const router = express.Router();
const auth = require('../middlewares/auth');


router.post('/address', auth , createAddress);
router.get('/address',auth,getAddress);
router.put('/address/:addressId', auth, updateAddress);
router.delete('/address/:addressId',auth,deletetAddress);


module.exports = router;