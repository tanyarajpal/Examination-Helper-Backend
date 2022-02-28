const express = require('express');
const router = express.Router();
const { getTimetable, addTimetable, updateTimetable, deleteTimetable, editTimetable } = require('../controllers/timetable');
const authenticate = require('../middleware/authenticate');

router.post('/add-timetable',authenticate,addTimetable);    //ok add or/and update timetable

router.get('/get-timetable',authenticate,getTimetable); //ok

router.delete('/delete-timetable/:outerid/:id',authenticate, deleteTimetable);

// router.post('/:id',authenticate,editTimetable);

module.exports = router;
