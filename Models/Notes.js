const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    title:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true,
    },
    tag:{
        type: String,
        default: "General"
    }

});
module.exports = new mongoose.model("Notes", schema);