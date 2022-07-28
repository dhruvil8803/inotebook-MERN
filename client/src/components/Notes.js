import React, { useContext, useEffect, useRef, useState } from 'react'
import Notecontext from '../contextApi/Notecontext'
import Noteitem from './Noteitem.js'
export default function Notes() {
  let context = useContext(Notecontext);
  useEffect(()=>{
    context.fetchAllNotes();
  },[])
  let [data, setData] = useState({
    etitle: "", 
    edesc: "",
    etag: "",
    eid: ""
  })
  let ref = useRef(null);
  let handleClick = (e)=>{
      context.updateNote(data.etitle, data.edesc, data.etag, data.eid);
        ref.current.click();
    e.preventDefault();
  }
  let updateNote = async (note)=>{
    ref.current.click();
      setData({
        etitle: note.title,
        edesc: note.desc,
        etag: note.tag,
        eid: note._id
      })
  }
  let changeValue = (e)=>{
    setData({
      ...data, [e.target.name] : e.target.value
    })
  }
  return (
    <>
    <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button>
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">Update Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className="my-3">
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title1" name="etitle" value={data.etitle} onChange={changeValue}/>
  </div>
  <div className="mb-3">
    <label htmlFor="desc" className="form-label">Descreption</label>
    <input type="text" className="form-control" id="desc1" name="edesc" value={data.edesc} onChange={changeValue}/>
  </div>
  <div className="mb-3">
  <label className="form-label" htmlFor="Tag">Tag</label>
    <input type="text" className="form-control" id="tag1" name="etag" value={data.etag} onChange={changeValue}/>
    
  </div>
</form>        

      </div>
      <div className="modal-footer">
      <button disabled={data.etitle.length === 0 || 
                     data.edesc.length === 0 ||
                     data.etag.length === 0} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </div>
    </div>
  </div>
</div>
{ context.notes.length === 0 ? 'No notes to show' :
    <div className="my-3">
      <h1>Your Notes</h1>
      <div className='row'>
        {
         context.notes.map((element)=>{
          return <Noteitem key={element._id} note={element} updateNote={updateNote}/>
         })
        }
      </div>
    </div>
    }
    </>
  )
}
