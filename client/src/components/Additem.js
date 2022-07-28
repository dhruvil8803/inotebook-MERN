import React, { useContext, useState } from 'react'
import Notecontext from '../contextApi/Notecontext'

export default function Additem() {
    let context = useContext(Notecontext);
    let [data, setData] = useState({
      title: "", 
      desc: "",
      tag: "",
    })
    let handleClick = (e)=>{
        context.addNote(data.title, data.desc, data.tag);
      e.preventDefault();
      setData({
        title: "", 
        desc: "",
        tag: "",
      })
    }
    let changeValue = (e)=>{
      setData({
        ...data, [e.target.name] : e.target.value
      })
    }
  return (
   <>
       <h1>Add Notes</h1>
     <form className="my-3">
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" value={data.title} onChange={changeValue} />
  </div>
  <div className="mb-3">
    <label htmlFor="desc" className="form-label">Descreption</label>
    <input type="text" className="form-control" id="desc" name="desc" value={data.desc} onChange={changeValue}/>
  </div>
  <div className="mb-3">
  <label className="form-label" htmlFor="Tag">Tag</label>
    <input type="text" className="form-control" id="tag" name="tag" value={data.tag} onChange={changeValue} />
    
  </div>
  <button disabled={data.title.length === 0 || 
                     data.desc.length === 0 ||
                     data.tag.length === 0} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
</>
  )
}
