const mongoose = require("mongoose");
const name = 'auth';
const jwt = require("jsonwebtoken");
const {TOKEN_SECRET,PORT,DB_URL} = require('../../configuration');
// const dotenv = require('dotenv');
// dotenv.config();
// require("dotenv").config();
const authSchema = new mongoose.Schema({
    FirstName : {
        type: String,
        required:true
    },
    LastName : {
        type: String,
        required:true
    },
    Email : {
        type: String,
        required:true
    },
    Password : {
        type: String,
        required:true
    },
    Tokens:[
        {
            token:{
                type: String,
                required:true
            }
        }
    ]
})

authSchema.methods.generateAuthToken = async function(data){
    try{
       // const TOKEN_SECRET ='72e3fa688d161a31f73e5b14d2bef3a42ce4150cbee4a719f820382904f2b0f761c167feeea81983c203e7a57feb7a1166978f1eee1573b464e7dadb4ec7d4c1';
        // console.log("data in generateauth func",data);
     //   console.log("setting token",process.env.TOKEN_SECRET)
        let token = jwt.sign({_id:this._id},process.env.TOKEN_SECRET);
        this.Tokens = this.Tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log("error in setting token",err);
    }
}
mongoose.model(name,authSchema);
module.exports = {name};