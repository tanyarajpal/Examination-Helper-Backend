const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../schemas/Auth/auth');
const authModel = mongoose.model(auth.name);
const path = require("path");
const bcrypt = require('bcryptjs');


function createInstance(input){
    const passwordHash = bcrypt.hashSync(input.Password);
    input.Password = passwordHash;
    const authInstance = new authModel(input);
    return authInstance.save();
}



router.post('/register',async (req,res)=>{
    console.log("here",req.body);
    const {
        Email,Password
    } = req.body;
    const user = await authModel.findOne({Email:Email});
    if(!user){
       createInstance(req.body).then(async (user)=>{
            res.status(200).send({message:"user Signin successfully"});
       }).catch((err) =>{
            res.json({message:"invalid credentials"})
       })
    }
    else{
        res.json({message:"email already registered"});
    }
   
})

router.post('/login',async (req,res)=>{
    console.log("here",req.body);
    const {
        Email,Password
    } = req.body;

    const user = await authModel.findOne({Email:Email});
    //const temp = authModel.find();
    //console.log(temp);
    console.log("user",user);
    
    if(user){
        const isMatch = await bcrypt.compareSync(Password,user.Password);
        // console.log("ismatch",isMatch);
        if(!isMatch){
            res.status(400).json({error:"password doesn't match"});
        }
        else{
            const token = await user.generateAuthToken(user);
            // console.log("ismatch",isMatch);
            // console.log("token",token);
            res.cookie('jwt',token,{
                expires: new Date(Date.now() + 100000000),
                httpOnly:true
            })
            console.log("authentication successfull");
            res.send("login successfull");
            // res.redirect('http://localhost:3000/home');
        }
    }
    else{
        res.json({message:"email not registered"});
    }

   
})

module.exports = router;