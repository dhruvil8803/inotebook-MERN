import React, { useContext, useState } from "react";
import Notecontext from "../contextApi/Notecontext";

export default function Login() {
    let context = useContext(Notecontext);
   const [data, setData] = useState({email: "", password:""});
   let handleClick = (e)=>{
    e.preventDefault();
    context.loginUser(data.email, data.password);
   }
   let onChange = (e)=>{
    setData({...data, [e.target.name] : e.target.value});
   }
    return (
        <div className="container">
            <h1>Login here</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        required
                        onChange={onChange}
                        value={data.email}
                        name="email"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Password
                    </label>
                    <input
                        required
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        name="password"
                        onChange={onChange}
                        value={data.password}
                    />
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleClick}>
                    Submit
                </button>
            </form>
        </div>
    );
}
