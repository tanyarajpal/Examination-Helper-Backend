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
    return timeTableModel.find({Semester:semester,Branch:branch,ExaminationName:examinationName}).exec();
}
function readAll(){
    return timeTableModel.find({}).exec();
}

exports.addTimetable = (req,res)=>{
    const { 
        Semester,Branch,ExaminationName,TimeTable
    } = req.body

    findTimetable(Semester,Branch,ExaminationName)
        .then(async (response)=>{
            if(response.length == 0){
                createInstance(req.body).then((data)=>{
                res.status(200).json({message:"timtable added successfully",data:data});
                }).catch((err)=>{
                    res.status(200).json({message:"error adding timetable",error:err});
                }
            )
            }
            else {
            await timeTableModel.updateOne(
                            {
                                _id:response[0]._id
                            },
                            { $push: { TimeTable: TimeTable} },
                        ).exec();           
                const data = await timeTableModel.findById(response[0]._id).exec();
                res.status(201).json({message:"updated existing timetable",data:data});
            }
    })
}

exports.getTimetable =  async (req,res)=>{
    const {
        Semester,Branch,ExaminationName
    } = req.body
    const data = await findTimetable(Semester,Branch,ExaminationName)
    res.status(200).json({message:"timtable data fetched successfully",data});
}


exports.deleteTimetable = async (req,res)=>{
    const {
        outerid,id 
    } = req.params
 await timeTableModel.findByIdAndUpdate(
        outerid, { $pull: { "TimeTable": { _id: id } } }, { safe: true, upsert: true },
       async function(err, node) {
           if (err) { return handleError(res, err); }
            const data = await timeTableModel.findById(outerid).exec();
            return res.status(200).json({message :"deleted",data:data});
        }).exec();
}

exports.editTimetable =async (req,res) =>{
    console.log(req)
    update(req.params.id,req.body).then(()=>{
        console.log("timetable successfully updated");
    }).catch((err)=>{
        console.log("error updating timetable");
    })
}