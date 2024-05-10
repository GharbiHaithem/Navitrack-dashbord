import React from 'react'
import './style.css'
import moment from 'moment'
const Message = ({own,data}) => {
  return (
    <div className='messages-wrapper '>
    
    <div className={`${own ? 'top-message own' : 'top-message'}`}>
         <img src={"https://img.freepik.com/psd-gratuit/personne-celebrant-son-orientation-sexuelle_23-2150115662.jpg?w=740&t=st=1702767991~exp=1702768591~hmac=46a7309ab2b7216bb0723395c764d8bb9f2155dab629a5cdc9b95ca540d75d93"} alt='' />
         <div className='body-message'>
          <p>{data?.text}</p>
<span className='text-end fs-7' style={{fontSize:'10px' , fontWeight:200}}>{moment(data?.createdAt).fromNow()}</span>
      </div>
      </div>
     
  
     
     
  </div>
  )
}

export default Message