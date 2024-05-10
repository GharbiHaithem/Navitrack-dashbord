import React from 'react'
import load from '../../assets/loading-gif.gif'
import './style.css'
const Loading = () => {
  return (
    <div className='loading-wrapper'>
        <img style={{width:'80px',height:'80px'}}  src={load} alt='load' />
    </div>
  )
}

export default Loading