// require("dotenv").config();
const {TOKEN_SECRET,PORT,DB_URL} = require('../configuration');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const auth = require("../schemas/Auth/auth");
const user = mongoose.model(auth.name);

//require("dotenv").config({ path: `${__dirname}/.env` });
const authenticate = async(req,res,next) =>{
    try{
        // const TOKEN_SECRET = await process.env.TOKEN_SECRET;
        const token = req.cookies.jwt;
        console.log("token",token);

        // console.log(req.cookies);
        console.log("token_secret",process.env.TOKEN_SECRET);
        // console.log("port",PORT);
        const verifyToken = jwt.verify(token,TOKEN_SECRET);
        const rootUser =await user.findOne({_id:verifyToken._id , "Tokens.token":token});
        if(!rootUser){
            throw new Error('User not found');
         
        }
        req.token = token;
        req.rootUser = rootUser;
        next();
    }catch(err){
        res.status(401).send('unauthorized:No token provided');
        console.log(err)
    }
    
}
module.exports = authenticate