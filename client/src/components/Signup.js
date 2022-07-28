import React, { useContext, useState } from "react";
import Notecontext from "../contextApi/Notecontext";
export default function Signup() {
    let context = useContext(Notecontext);
   const [data, setData] = useState({name:"", email: "", password:""});
   let handleClick = (e)=>{
    e.preventDefault();
    context.signupUser(data.name, data.email, data.password);
   }
   let onChange = (e)=>{
    setData({...data, [e.target.name] : e.target.value});
   }
  return (
    <div className='container'>
        <h1>Signup here</h1>
      <form>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="exampleInputPassword1" required onChange={onChange} name="name"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required onChange={onChange} name="email"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" required onChange={onChange} name="password"/>
  </div>
  
  <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
</form>
    </div>
  )
}
