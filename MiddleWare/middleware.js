const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY;
const middleware = (req, res, next)=>{
   if(!req.headers.authtoken) return res.send("Invalid credantials1");
   try{
   let result = jwt.verify(req.headers.authtoken, SECRET_KEY);
   req.user = result.user;
   next();
}
   catch(err){
       res.send(err.message);
   }
}
module.exports = middleware;