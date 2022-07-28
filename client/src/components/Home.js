import React from 'react'
import Notes from './Notes.js';
import Additem from './Additem.js';
export default function Home() {
  return (
   <div className="container my-3">
    <Additem/>
    <Notes/>
   </div>
  )
}
