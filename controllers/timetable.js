const mongoose = require('mongoose');
const timeTable = require('../schemas/timeTable');
const timeTableModel = mongoose.model(timeTable.name);

function createInstance(input){
    const timeTableInstance = new timeTableModel(input);
    return timeTableInstance.save();
}
function read(id){
    console.log(id)
    console.log("read data")
    const data = timeTableModel.findById(id).exec();
    console.log("read", data);
    return timeTableModel.findById(id).exec();
}
 function findTimetable(semester,branch,examinationName){
    console.log("in findtimetable function : ", semester, branch,examinationName);
    
    return timeTableModel.find({Semester:semester,Branch:branch,ExaminationName:examinationName}).exec();
}
function readAll(){
    return timeTableModel.find({}).exec();
}

exports.addTimetable = (req,res)=>{
    const { 
        Semester,Branch,ExaminationName,TimeTable
    } = req.body
    var id ="";

    findTimetable(Semester,Branch,ExaminationName)
    .then(async (response)=>{
        console.log("response",response);
        if(response.length == 0){
            console.log(response);
            createInstance(req.body).then((data)=>{
                res.status(200).json({message:"timtable added successfully"});
            }).catch((err)=>{
                res.status(200).json({message:"error adding timetable",error:err});
            }
        )
        }
        else{
        await timeTableModel.updateOne(
                    {
                        _id:response[0]._id
                    },
                    { $push: { TimeTable: TimeTable} },
                  ).exec();
        
           res.status(201).json({message:"updated existing timetable"});
            // id = response[0]._id;
        }
    })
}

exports.getTimetable =  async (req,res)=>{
    console.log("req body ",req.body);
    const {
        Semester,Branch,ExaminationName
    } = req.body
    const data = await findTimetable(Semester,Branch,ExaminationName)
    res.send(data);
}

exports.deleteTimetable = async (req,res)=>{
    const {
        outerid,id 
    } = req.params
    timeTableModel.findByIdAndUpdate(
        outerid, { $pull: { "TimeTable": { _id: id } } }, { safe: true, upsert: true },
        function(err, node) {
            if (err) { return handleError(res, err); }
            return res.status(200).json({message :"deleted"});
        });
}

exports.editTimetable =async (req,res) =>{
    console.log(req)
    update(req.params.id,req.body).then(()=>{
        console.log("timetable successfully updated");
    }).catch((err)=>{
        console.log("error updating timetable");
    })
}