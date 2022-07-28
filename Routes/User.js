const express = require('express');
const User = require('../Models/User.js');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY;
const router = express.Router();
const middleware = require('../MiddleWare/middleware.js')
let isEmail = (e) => {
    let regex = /^[A-z0-9.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return regex.test(e);
}
let isPassword = (e)=>{
    if(e.length < 8) return false;
     if(!(/[A-Z]/).test(e)) return false;
     if(!(/[a-z]/).test(e)) return false;
     if(!(/[0-9]/).test(e)) return false;
     if(!(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(e)) return false;
     return true;
}
let isName = (e)=>{
     if(e.length <= 1) return false;
     return (/^[A-Za-z]+$/).test(e);
}
router.post("/signup", async (req, res)=>{
    if(!isName(req.body.name)) return res.send({
        success: false,
        message: "Please enter valid name"
    });
    if(!isEmail(req.body.email)) return res.send({
        success: false,
        message: "Please Enter Valid Email"
    });
    if(!isPassword(req.body.password)) return res.send({
        success: false,
        message: "Password must have length 8 and have one lower, upper and special character"
    });
    let result = await User.findOne({email: req.body.email});
    if(result) return res.send({
        success: false,
        message: "Account already exist with this mail try to login instead"
    });
    let password = await bcrypt.hash(req.body.password, 10);
    req.body.password = password;
    let user = await User.create(req.body);
    let data = {
        user: user._id
    }
    const authToken = jwt.sign(data , SECRET_KEY);
    res.json({
        success: true,
        message: "Sign up successfull",
        authtoken : authToken
    });
})

router.post("/login", async(req, res)=>{
    if(!isEmail(req.body.email)) { res.json({
        success: false,
        message: "Invalid Credantials"
    });
    return;
}
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.send({
        success: false,
        message: "Invalid Credantials"
    });
    let result = await bcrypt.compare(req.body.password, user.password);
    if(!result) {
       return res.send({
        success: false,
        message: "Invalid Credantials"
    });
    }
    let data = {
        user: user._id
    }
    let authtoken = jwt.sign(data, SECRET_KEY);
    res.send({
        success: true,
        message: "Login Successfull",
        authtoken: authtoken
    });
})

router.get("/userdata", middleware, async (req, res)=>{
 let id = req.user;
 let data = await User.findOne({_id: id},{password: 0});
 res.send(data);
}); 

module.exports = router;