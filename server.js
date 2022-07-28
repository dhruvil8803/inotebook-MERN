require('dotenv').config();
const express = require('express');
const path = require('path');
const connect = require('./db.js');
const PORT = process.env.PORT || 5000;
var cors = require("cors")
connect();
var app = express()
app.use(cors())
app.use(express.json());
    app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("/test", (req,res)=>{
    res.send("Welcome");
})
app.use('/api/notes', require('./Routes/Notes.js'))
app.use('/api/user', require('./Routes/User.js'))

app.listen(PORT, ()=>{
    console.log("Listening to port 5000");
})