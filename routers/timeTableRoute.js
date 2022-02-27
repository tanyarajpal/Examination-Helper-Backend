const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const timeTable = require('../schemas/timeTable');
const timeTableModel = mongoose.model(timeTable.name);
const path = require("path");


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

// function remove (outerid, id) {
//     timeTableModel.findByIdAndUpdate(
//         outerid, { $pull: { "TimeTable": { _id: id } } }, { safe: true, upsert: true },
//         function(err, node) {
//             if (err) { return handleError(res, err); }
//             console.log("deleted",node);
            
//             // return {message:"deleted"};
//             return res.status(200).json({message :"deleted"});
//         });
// };

router.post('/timetable/getTimetable', async (req,res)=>{
    // console.log(req);
    console.log("req body ",req.body);
    const {
        Semester,Branch,ExaminationName
    } = req.body
    const data = await findTimetable(Semester,Branch,ExaminationName)
    console.log(data);
    res.send(data);
    }
)


router.post('/timetable',(req,res)=>{
    console.log("here",req.body);
    createInstance(req.body).then((data)=>{
        console.log("tanya",data);
        return (res.json(data));
    }).catch((err)=>{
        console.log(`error posting timetable data:${err}`);
    }
    )
})
router.post('/timetable/addtimetable',(req,res)=>{
    console.log("update",req.body);
    const {
        Semester,Branch,ExaminationName,SubjectCode,SubjectName,Date,Time
    } = req.body
    var id ="";
    findTimetable(Semester,Branch,ExaminationName)
    .then(async (response)=>{
        console.log(response);
        if(response.length == 0){
            //add
            var obj = {
                Semester:Semester,
                Branch:Branch,
                ExaminationName:ExaminationName,
                TimeTable:[]
            }
           await createInstance(obj).then((data)=>{
                console.log("tanya",data);
                id = data._id;
                // return (res.json(data));
            }).catch((err)=>{
                console.log(`error posting timetable data:${err}`);
            }
            )
        }
        else{
            id = response[0]._id;
        }
    }).then(()=>{
        //insert a subject in timetable
        console.log("id : ",id);
        timeTableModel.updateOne(
            {
                _id:id
                // Semester:Semester,
                // Branch:Branch,
                // ExaminationName:ExaminationName
            },
            { $push: { TimeTable: [{
                SubjectCode:SubjectCode,
                SubjectName:SubjectName,
                Date:Date,
                Time:Time
                }]
            } },
            function(err, result) {
              if (err) {
                res.send(err);
              } else {
                  console.log("result",result);
                res.send(result);
              }
            }
          );
    })
    // res.send();
    
})

router.delete('/timetable/:outerid/:id', async (req,res)=>{
    console.log("inside delete router in backend");
    console.log(req.body);
    const {
        outerid,id 
    } = req.params
    timeTableModel.findByIdAndUpdate(
        outerid, { $pull: { "TimeTable": { _id: id } } }, { safe: true, upsert: true },
        function(err, node) {
            if (err) { return handleError(res, err); }
            console.log("deleted",node);
            return res.status(200).json({message :"deleted"});
        });
})

router.post('/timetable/:id',(req,res) =>{
    console.log(req)
    update(req.params.id,req.body).then(()=>{
        console.log("timetable successfully updated");
    }).catch((err)=>{
        console.log("error updating timetable");
    })
})

module.exports = router;
