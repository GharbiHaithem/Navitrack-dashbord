import React from 'react'
import './style.css'
const MessageType = ({messageText,styled}) => {
  return (
    <div className='message-wrapper'>
        <div className='triangle'></div>
        <span style={styled}>{messageText}</span>
    </div>
  )
}

export default MessageType