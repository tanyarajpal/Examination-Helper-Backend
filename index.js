const {PORT,DB_URL} = require('./configuration');
const express = require('express');
const mongoose = require('mongoose');
const syllabusRoutes = require('./routers/syllabusRoute');
const timeTableRoutes = require('./routers/timeTableRoute');
const authRoutes = require('./routers/authRoute');
const cookieParser = require("cookie-parser");
const PORT_APP = PORT || 4000;
const cors = require('cors');
const app = express();
const url = DB_URL;

app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
 }));

app.use(express.json());
app.use(cookieParser());

app.use('/api/examination-helper/syllabus',syllabusRoutes);
app.use('/api/examination-helper/timetable',timeTableRoutes);
app.use('/api/examination-helper/auth',authRoutes);

mongoose.connect(url,{serverSelectionTimeoutMS:10000}).then(()=> console.log("Database connected"));

app.get('/',(req,res)=>{
    res.send("welcome");
})



app.listen(PORT_APP, (err) => {
    
    if(err) {
        console.log(`An error occurred connecting server ${PORT_APP} `);
        console.log(err);
        return;
    }
    console.log(`server started at PORT_APP ${PORT_APP}`);
})

