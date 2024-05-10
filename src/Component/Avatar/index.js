import React from 'react'
import './style.css'
const Avatar = ({user,styled,styleT}) => {
  return (
    <div className='avatar-wrapper' style={styled}>
        <span style={styleT}>{user?.firstname[0]+user?.lastname[0]}</span>
    </div>
  )
}

export default Avatar