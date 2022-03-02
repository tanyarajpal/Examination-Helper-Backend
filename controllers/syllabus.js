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

exports.getSyllabus =async (req,res)=>{
    readAll().then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(400).json({message:"error fetching all syllabus",error:err});
    });
}

exports.getSubSyllabus = async (req,res)=>{
    read(req.params.id).then((data)=>{
        res.json(data);
    }).catch((err)=>{
       res.status(400).json("error fetching data "+ err);
    });
}

exports.addSyllabus =async (req,res) =>{
     createInstance(req.body).then((data)=>{
        res.status(200).json({message:"syllabus added successfully"});
    }).catch((err)=>{
        res.status(400).json({message:"error adding syllabus",error:err})
    });
}

exports.deleteSyllabus = async(req, res) => {
    remove(req.params.id).then(() => {
       res.status(200).json({message:"syllabus deleted successfully"});
    }).catch((err) => {
        res.status(400).json({
            message: `Error occurred while deleting an item with id ${req.params.id}`,
            error:err
        });
    });
}

exports.updateSyllabus = async(req,res) =>{
    update(req.params.id,req.body).then(()=>{
        res.status(200).json({message:"syllabus updated successfully",data:req.body});
    }).catch((err)=>{
        res.status(400).json({message:"error updating data",error:err.message});
    })
}
