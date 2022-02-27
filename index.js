// require("dotenv").config();
const {TOKEN_SECRET,PORT,DB_URL} = require('./configuration');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const route = require('./routers/syllabusRoute');
const timeTableRoutes = require('./routers/timeTableRoute');
const authRoutes = require('./routers/authRoute');
const cookieParser = require("cookie-parser");
const routes = require('./routes/routes')
var cors = require('cors');

const app = express();

app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
 }));
// app.all('*', (req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "https://localhost:3000");
//     next();
// });

app.use(bodyParser.json());
    // parse various different custom JSON types as JSON
    app.use(bodyParser.json({ type: 'application/*+json' }));
    // parse some custom thing into a Buffer
    app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
    // parse an HTML body into a string
    app.use(bodyParser.text({ type: 'text/html' }));
    // parse an text body into a string
    app.use(bodyParser.text({ type: 'text/plain' }));
    // create application/x-www-form-urlencoded parser
    app.use(bodyParser.urlencoded({ extended: false }));

  
app.use(cookieParser());

app.use('/',route.router);
app.use('/',timeTableRoutes);
app.use('/',authRoutes);
app.use('/',routes)

const url = DB_URL;
mongoose.connect(url,{serverSelectionTimeoutMS:10000}).then(()=> console.log("Database connected"));

app.get('/',(req,res)=>{
    res.send("welcome");
})
// console.log("process.env.port",process.env.TOKEN_SECRET);
// console.log("proceess.env",process.env);
const PORT_APP = PORT || 4000;
app.listen(PORT_APP, (err) => {
    
    if(err) {
        console.log(`An error occurred connecting server ${PORT_APP} `);
        console.log(err);
        return;
    }
    console.log(`server started at PORT_APP ${PORT_APP}`);
})

