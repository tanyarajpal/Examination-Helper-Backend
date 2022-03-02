const mongoose = require('mongoose');
const auth = require('../schemas/Auth/auth');
const authModel = mongoose.model(auth.name);
const bcrypt = require('bcryptjs');


const createInstance = (input)=>{
    const passwordHash = bcrypt.hashSync(input.Password);
    input.Password = passwordHash;
    const authInstance = new authModel(input);
    return authInstance.save();
}

exports.register = async (req,res)=>{
    console.log("here");
    const {
        Email,Password
    } = req.body;
    const user = await authModel.findOne({Email:Email});
    if(!user){
       createInstance(req.body).then(async (user)=>{
            res.status(200).send({message:"user Signin successfully"});
       }).catch((err) =>{
            res.status(404).json({message:"invalid credentials",error:err})
       })
    }
    else{
        res.json({message:"email already registered"});
    }
}

exports.login = async (req,res)=>{
    const {
        Email,Password
    } = req.body;

    const user = await authModel.findOne({Email:Email});
    if(user){
        const isMatch = await bcrypt.compareSync(Password,user.Password);
        if(!isMatch){
            res.status(400).json({error:"password doesn't match"});
        }
        else{
            const token = await user.generateAuthToken(user);
            res.cookie('jwt',token,{
                expires: new Date(Date.now() + 100000000),
                httpOnly: false,
                
            })
            console.log("authentication successfull");
            res.status(200).send("login successfull");
        }
    }
    else{
        res.status(400).json({message:"email not registered"});
    }
}

exports.logout = async(req,res)=>{
    console.log(req.cookies.jwt)
    res.clearCookie('jwt');
    res.status(200).json({message:'User logged out'});
}

exports.checkLogin = async (req,res)=>{
    res.status(200).json({message:'already logged in'});
}
