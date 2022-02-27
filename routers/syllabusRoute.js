const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const syllabus = require('../schemas/syllabus');
const syllabusModel = mongoose.model(syllabus.name);
const path = require("path");

function createInstance(input){
    const syllabus_instance = new syllabusModel(input);
    return syllabus_instance.save();
}
function read(id){
    return syllabusModel.findById(id).exec();
}
function remove(id){
    return syllabusModel.findByIdAndDelete(id);
}
function readAll(){
    return syllabusModel.find({}).exec();
}
function update(id,newData){
    return syllabusModel.findByIdAndUpdate(id,newData).exec();

}
router.get('/syllabus',function(req,res){
    readAll().then((data)=>{
        res.json(data);
    }).catch((err)=>{
        console.log("error fetching all data" + err);
    });
})
router.get('/syllabus/:id',(req,res)=>{
    console.log("tanya",req.params);
    read(req.params.id).then((data)=>{
        res.json(data);
    }).catch((err)=>{
        console.log("error fetching data "+ err);
    });
});

router.post('/syllabus',function(req,res){
    // console.log(req);
     createInstance(req.body).then((data)=>{
        console.log(data);
        res.redirect('//localhost:3000/syllabus/showSyllabus');
        
    }).catch((err)=>{
        console.log("error posting data\n "+ err.message);
    });
});

router.delete('/syllabus/:id', (req, res) => {
    console.log(`Deleted an item with id: ${req.params.id}`);

    remove(req.params.id).then(() => {
        //res.redirect('//localhost:3000/syllabus/showSyllabus');
       res.send();
    }).catch((err) => {
        console.log(` Error occurred while deleting an item with id ${req.params.id}`);
        console.log(err);
        res.json({
            'error': `Error occurred while deleting an item with id ${req.params.id}`
        });
    });
});

router.post('/syllabus/:id',(req,res) =>{
    console.log(req)
    //console.log("adarsh");
    update(req.params.id,req.body).then(()=>{
        console.log("syllabus successfully updated");
        res.redirect('//localhost:3000/syllabus/showSyllabus/'+req.params.id);
    }).catch((err)=>{
        console.log("error updating data");
    })
})

module.exports = {router};