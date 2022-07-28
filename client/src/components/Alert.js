import React,{useContext, useEffect} from 'react'
import Notecontext from '../contextApi/Notecontext'

export default function Alert() {
    let context = useContext(Notecontext);
  return (
    context.alert.status && <div className={`alert alert-${context.alert.type}`} role="alert">
        {context.alert.message}
  </div>
  )
}
