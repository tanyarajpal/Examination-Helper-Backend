const mongoose = require('mongoose');
const name = 'TimeTable';

const timeTableSchema = new mongoose.Schema({
    Semester:{
        type:Number,
        required:true
    },
    Branch:{
        type:String,
        required:true
    },
    ExaminationName:{
        type:String,
        required:true
    },
    TimeTable:[{
        SubjectCode:{
            type:String, 
            required:true
        },
        SubjectName:{
            type:String,
            required:true
        },
        Date:{
            type:String,
            required:true
        },
        Time:{
            type:String,
            required:true
        }
    }]

});

mongoose.model(name,timeTableSchema);

module.exports = {name};