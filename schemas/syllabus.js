const mongoose = require('mongoose');
const name = 'Syllabus';

const syllabusSchema = new mongoose.Schema({
    Semester:{
        type:Number,
        required:true
    },
    Branch:{
        type:String,
        required:true
    },
    SubjectCode:{
        type: String, 
        required:true
    },
    SubjectName:{
         type:String,
         required:true
    },
    Description: {
        type:String,
        required:true
    }
});

mongoose.model(name,syllabusSchema);

module.exports = {name};