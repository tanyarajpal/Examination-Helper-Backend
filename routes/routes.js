const mongoose = require('mongoose');
const express = require('express');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("hello");
})
// router.get("/",authenticate,(req,res)=>{
//     console.log("user authenticated");
//     res.send(req.rootUser);
// })

router.get("/homepage",authenticate,(req,res)=>{
    console.log("user authenticated");
    res.send(req.rootUser);
})

router.get("/syllabusPage",authenticate,(req,res)=>{
    console.log("user authenticated");
    res.send(req.rootUser);
})

router.get("/addSyllabusPage",authenticate,(req,res)=>{
    console.log("user authenticated");
    res.send(req.rootUser);
})

router.get("/showSyllabusPage",authenticate,(req,res)=>{
    console.log("user authenticated");
    res.send(req.rootUser);
})

router.get("/subSyllabusPage",authenticate,(req,res)=>{
    console.log("user authenticated");
    res.send(req.rootUser);
})

router.get("/editSyllabusPage",authenticate,(req,res)=>{
    console.log("user authenticated");
    res.send(req.rootUser);
})

router.get("/timetablePage",authenticate,(req,res)=>{
    console.log("user authenticated");
    res.send(req.rootUser);
})

router.get('/logout',(req,res)=>{
    console.log("authencation for logging out ,cleared cookie in the brrower,");
    res.clearCookie('jwt');
    res.status(200).send('User logged out');
})





module.exports = router;
