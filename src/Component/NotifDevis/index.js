import React from 'react'
import moment from 'moment'
import './style.css'
const NotifDevis = ({msg ,onClick,className}) => {
  return (
    <div className={className} onClick={onClick}  >
     
      <div className='text-black'> <span className='text-primary text-sm font-semibold fs-7'> {msg?.nomComplet } </span><span className='text-xs font-medium'>A Envoyer un Devis Il ya </span><span className='text-muted text-end -translate-y-1 text-xs font-normal fs-7'>{moment(msg?.createdAt).fromNow()}</span></div>
 
    </div>
  )
}

export default NotifDevis