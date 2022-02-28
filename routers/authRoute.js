const express = require('express');
const router = express.Router();
const {register,login} = require('../controllers/auth');


router.post('/register',register);  //ok

router.post('/login',login);    //ok

module.exports = router;