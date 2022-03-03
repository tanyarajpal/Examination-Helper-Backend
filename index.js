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


app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        
        // origin:'*',
        credentials: true,
        // origin: 'http://localhost:3000'
      origin:'https://examination-helper-frontend.vercel.app'
 }));
// app.use(cors());

app.get('/',(req,res)=>{
    res.send("welcome");
})

// app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin', ['https://examination-helper-frontend.vercel.app']);
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append('Access-Control-Allow-Headers', 'Content-Type');
//     res.append('Access-Control-Allow-Credentials', 'true');
//     next();
// });

app.use('/api/examination-helper/syllabus',syllabusRoutes);
app.use('/api/examination-helper/timetable',timeTableRoutes);
app.use('/api/examination-helper/auth',authRoutes);

mongoose.connect(url,{serverSelectionTimeoutMS:10000}).then(()=> console.log("Database connected"));


app.listen(PORT_APP, (err) => {
    
    if(err) {
        console.log(`An error occurred connecting server ${PORT_APP} `);
        console.log(err);
        return;
    }
    console.log(`server started at PORT_APP ${PORT_APP}`);
})

