const express = require('express');
const { register, login , user} = require('../controllers/user.controller');
const auth = require('../middlewares/auth')
const router = express.Router();



router.post('/signup', register);
router.post('/login', login);
router.get('/users', auth, user);


module.exports = router;