
const express = require('express');
const { addToWishlist, viewWishlist, removeFromWishlist } = require('../controllers/wishlist.controller');
const router = express.Router();
const auth = require('../middlewares/auth')


router.post('/wishlist',auth ,  addToWishlist);
router.get('/wishlist', auth,  viewWishlist);
router.delete('/wishlist',auth , removeFromWishlist)

module.exports = router;