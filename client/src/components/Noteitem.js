import React, { useContext} from 'react'
import Notecontext from '../contextApi/Notecontext';
export default function Noteitem(props) {
    const {note} = props;
    const context = useContext(Notecontext);
  return (
    <>
    <div className="col-md-3 my-2">
    <div className="card">
    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{zIndex: 1}}>
    {note.tag}
  </span>
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.desc}</p>
    <i className="fa-solid fa-trash mx-2" onClick={() => context.deleteNote(note._id)}></i>
    <i className="fa-solid fa-pen mx-2" data-bs-toggle="modal" onClick={()=>props.updateNote(note)}></i>
  </div>
</div>
</div>
</>
  )
}
