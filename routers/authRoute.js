const express = require('express');
const router = express.Router();
const {register,login,logout, checkLogin} = require('../controllers/auth');
const authenticate = require('../middleware/authenticate');

router.post('/register',register);  //ok

router.post('/login',login);    //ok

router.get('/logout',authenticate,logout);

router.get('/login',authenticate,checkLogin);

module.exports = router;