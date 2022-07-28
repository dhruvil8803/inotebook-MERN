const mongoose = require('mongoose');
let DATABASE = process.env.DATABASE;
let connectDataBase = ()=>{
    mongoose.connect(DATABASE,{
      useNewUrlParser:true,
      useUnifiedTopology: true
    })
    .then(()=>{
      console.log("Connection Successfull");
    })
    .catch((err)=>{
      console.log(err);
    })
}
module.exports = connectDataBase;