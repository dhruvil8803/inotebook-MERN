import React from 'react'
import {Link,useLocation, useNavigate} from "react-router-dom";
export default function Navbar(props) {
  let location = useLocation();
  let navigate = useNavigate();
  let logout = ()=>{
    localStorage.removeItem('authtoken');
    localStorage.removeItem('name');
    navigate('/login');
  }
  return (
    <nav className="navbar navbar-expand-lg bg-light">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">iNotebook</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link" aria-current="page">{localStorage.getItem('name') ? localStorage.getItem('name'): ""}</Link>
          </li>
        </ul>
        {!localStorage.getItem('authtoken') ? 
        <><Link to="/login" className="btn btn-primary mx-1">Login</Link>
        <Link to="/signup" className="btn btn-primary mx-1">Signup</Link></> : 
         <button type="button" className="btn btn-primary" onClick={logout}>Logout</button>
        }
      </div>
    </div>
  </nav>
  )
}
