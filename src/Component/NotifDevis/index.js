import React from 'react'
import moment from 'moment'
import './style.css'
const NotifDevis = ({msg ,onClick,className}) => {
  return (
    <div className={className} onClick={onClick} >
     
      <div> <span className='text-primary fs-7'> {msg?.nomComplet } </span><span>A Envoyer un Devis Il ya </span><span className='text-muted fs-7'>{moment(msg?.createdAt).fromNow()}</span></div>
 
    </div>
  )
}

export default NotifDevis