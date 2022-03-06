const {TOKEN_SECRET} = require('../configuration');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const auth = require("../schemas/Auth/auth");
const user = mongoose.model(auth.name);

const authenticate = async(req,res,next) =>{
    try{
        // const token = req.cookies.jwt;
        const token = req.headers["x-access-token"]?.split(' ')[1];
      //  console.log("token   ",req.cookies);
        const verifyToken = jwt.verify(token,process.env.TOKEN_SECRET);
        const rootUser =await user.findOne({_id:verifyToken._id , "Tokens.token":token});
        if(!rootUser){
            throw new Error('User not found');
         
        }
        req.token = token;
        req.rootUser = rootUser;
        console.log("user authenticated successfully");
        next();
    }catch(err){
        res.status(400).json({message:'token not found'});
        console.log("token not found ")
    }
    
}
module.exports = authenticate