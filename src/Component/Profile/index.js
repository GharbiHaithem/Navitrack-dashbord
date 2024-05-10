import React from 'react'
import Avatar from '../Avatar'
import { useSelector } from 'react-redux'
import Face5Icon from '@mui/icons-material/Face5';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import './style.css'
const Profile = () => {
    const {user}  = useSelector(state=>state?.auth)
  return (
    <div className='profile-wrapper container'>
      
        
         <div style={{}}> <Avatar user={user}  styled={{width:'100px',height:'100px',background:'#007fff',margin:'0 auto'}} styleT={{fontWeight:800,marginBottom:'0',color:'white',fontSize:'30px'}} /></div>
          <div  style={{background:'#eee'}} className='d-flex align-items-center gap-20 mx-4 p-3'><Face5Icon sx={{fontSize:'70px',color:'#007fff'}}/><span className='mb-0' style={{color:'#007fff',fontWeight:'400'}}>{user?.firstname}{user?.lastname}</span></div>
          <div style={{background:'#eee'}} className='d-flex align-items-center gap-20 mx-4 p-3'><AlternateEmailIcon  sx={{fontSize:'70px',color:'#007fff'}}/><span className='mb-0' style={{color:'#007fff',fontWeight:'400'}}>{user?.email}</span></div>
         
    </div>
  )
}

export default Profile