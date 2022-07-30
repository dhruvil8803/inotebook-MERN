const express = require('express');
const router = express.Router();
const Notes = require("../Models/Notes.js");
const middleware = require('../MiddleWare/middleware.js')
router.post("/addnotes", middleware, async (req, res)=>{
    let id = req.user;
    if(!req.body.desc || !req.body.title) return res.send("Enter some more line in description");
    let note = await Notes.create({
        user: id,
        title: req.body.title,
        desc : req.body.desc,
        tag: req.body.tag
    });
    res.send({
        success: true,
        message: "Note added successfully",
    });
})
router.get("/shownotes", middleware,async (req, res)=>{
    let id = req.user;
    let result = await Notes.find({user: id});
    res.send(result);
})
router.put("/updatenote/:id", middleware, async (req, res)=>{
    let id = req.user;
    let result = await Notes.findOne({_id: req.params.id})
    if(!result) return res.send("Not Allowed");
    if(id !== result.user.toString()) return res.send("Not Allowed");
    let {title, desc, tag} = req.body;
    let newNote = {};
    if(title) newNote.title = title;
    if(desc) newNote.desc = desc;
    if(tag) newNote.tag = tag;
    let store = await Notes.updateOne({_id: req.params.id}, {$set : newNote});
    res.send(store);
})
router.delete("/deletenote/:id", middleware, async (req, res)=>{
  let id = req.user;
  let result = await Notes.findOne({_id: req.params.id})
  if(!result) return res.send("Not Allowed");
  if(id !== result.user.toString()) return res.send("Not Allowed");
  let store = await Notes.deleteOne({_id: req.params.id});
    res.send(store);
})

module.exports = router;