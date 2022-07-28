import Notecontext from "./Notecontext.js";
import React, { useState} from "react";
import {useNavigate} from "react-router-dom"
const host = "";
const Notestate = (props) => {
  const navigate = useNavigate();

  let [notes, setNotes] = useState([]);
  let [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });
  // Fetch All Notes
  let fetchAllNotes = async () => {
    if(!localStorage.getItem('authtoken')){
     return navigate("/login");
    }
    else{
    const response = await fetch(`${host}api/notes/shownotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken:
          localStorage.getItem('authtoken'),
      },
    });
    const json = await response.json();
    setNotes(json);
  }
  };
  // Showing Alert
  let showAlert = (type, message) => {
     setAlert({
      status: true,
      type: type,
      message: message,
    });
    setTimeout(()=>{
      setAlert({
        status: false,
        type: "",
        message: "",
      }, 1500);
    })
  };
  // Add Data
  let addNote = async (title, desc, tag) => {
    await fetch(`${host}api/notes/addnotes `, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken:
          localStorage.getItem('authtoken'),
      },
      body: JSON.stringify({
        title,
        desc,
        tag,
      }),
    });
    fetchAllNotes();
    showAlert('success', "Note added Successfully");
  };
  // Delete Note
  let deleteNote = async (id) => {
    await fetch(`${host}api/notes/deletenote/${id} `, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authtoken:
          localStorage.getItem('authtoken'),
      }
    });
    fetchAllNotes();
    showAlert('success', "Note Deleted Successfully");
  };
  // UpdateNote
  let updateNote = async (title, desc, tag, id)=>{
    await fetch(`${host}api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authtoken:
          localStorage.getItem('authtoken'),
      },
      body: JSON.stringify({
        title,
        desc,
        tag
      }),
    });
    fetchAllNotes();
    showAlert('success', "Note Updated Successfully");
  }
  let loginUser = async (email , password)=>{
    let response = await fetch(`${host}api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    let json = await response.json();
    if(json.success){
      localStorage.setItem('authtoken', json.authtoken);
      let response1 = await fetch(`${host}api/user/userdata`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authtoken": localStorage.getItem('authtoken'),
        }
      });
      let json1 = await response1.json();
      localStorage.setItem('name', json1.name);
      showAlert('success', json.message);
      navigate('/');
    }
    else {
      showAlert('danger', json.message);
    }
  }
  let signupUser = async(name, email , password)=>{
    let response = await fetch(`${host}api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      }),
    });
   let json = await response.json();
    if(json.success){
      localStorage.setItem('authtoken', json.authtoken);
      localStorage.setItem('name', name);
      showAlert('success', json.message);
      navigate('/');
    }
    else {
      showAlert('danger', json.message);
    }
  }
  return (
    <Notecontext.Provider
      value={{
        notes,
        setNotes,
        alert,
        setAlert,
        showAlert,
        addNote,
        deleteNote,
        updateNote,
        fetchAllNotes,
        loginUser,
        signupUser
      }}
    >
      {props.children}
    </Notecontext.Provider>
  );
};

export default Notestate;
