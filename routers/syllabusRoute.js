const express = require('express');
const router = express.Router();
const {getSyllabus, getSubSyllabus, addSyllabus, deleteSyllabus, updateSyllabus} = require('../controllers/syllabus');
const authenticate = require('../middleware/authenticate');

router.get('/get-all-syllabus',authenticate,getSyllabus); //ok

router.get('/get-one-syllabus/:id',authenticate,getSubSyllabus);        //ok but change

router.post('/create-syllabus',authenticate,addSyllabus);       //ok

router.delete('/delete-syllabus/:id',authenticate,deleteSyllabus ); //ok

router.post('/update-syllabus/:id',authenticate,updateSyllabus);    //ok but change

module.exports = router;