import React, { useState } from 'react'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import { Outlet, useNavigate } from 'react-router-dom';
import './style.css'
import {IoAddCircle} from 'react-icons/io5'
import { FaCarAlt } from "react-icons/fa";
import {FaClipboardList} from 'react-icons/fa'
import {TbGps} from 'react-icons/tb' 
import {BsBuildingGear,BsBuildingAdd,BsBuildingCheck} from 'react-icons/bs'
const LeftSideBar = ({showMenuOpen,showMenuClose}) => {
    const[clicked,setClicked] = useState(null)
   const navigate = useNavigate()
    const handleClick = (nameDiv)=>{
      setClicked(nameDiv)
    
      navigate('/admin/'+nameDiv)
    }
    const[hovered,setHovered] = useState({
        nameDiv:'',
        status:false
    })
    
  return (
  
    <div className={` ${showMenuOpen===true ? 'menuwrapper ' :  showMenuClose && 'not-active-menu' }`}>
     
      {showMenuOpen && <div className='p-4 d-flex flex-column gap-10'>
         <div  onMouseEnter={()=>setHovered(prev=>({...prev,nameDiv:'addUser',status:true}))} onMouseLeave={(prev=>({...prev,nameDiv:'addUser',status:false}))}  className='d-flex gap-10 align-items-center p-3 ' style={{background:clicked === 'addUser' ? 'black' : (hovered.nameDiv==="addUser" && hovered.status===true)  ? '#FAF0D7' : 'transparent',color:clicked === 'addUser'?'white':'black',cursor:'pointer'}} onClick={()=>handleClick('addUser')}> <GroupAddIcon className='fs-2' /><span className='mb-0'>Add User</span></div>
         <div onMouseEnter={()=>setHovered(prev=>({...prev,nameDiv:'listUser',status:true}))} onMouseLeave={(prev=>({...prev,nameDiv:'listUser',status:false}))} className='d-flex gap-10 align-items-center p-3 'style={{background:clicked === 'listUser' ? 'black' :  (hovered.nameDiv==="addUser" && hovered.status===true)  ? '#FAF0D7' : 'transparent',color:clicked === 'listUser'?'white':'black',cursor:'pointer'}}  onClick={()=>handleClick('listUser')}> <FeaturedPlayListIcon className='fs-2' /><span className='mb-0'>List User</span></div>
         <div  className='p-3 d-flex align-items-center gap-10' onClick={()=>setClicked('managecar')} onDoubleClick={()=>setClicked('')} ><FaCarAlt className='fs-2 styleIcon' />MANAGEMENT CAR</div>
         {clicked === "managecar" ? <>
         <div className='p-1 mx-5  d-flex align-items-center gap-10' onClick={()=>handleClick('addcar')}><IoAddCircle className='styleIcon'/> ADD VEHICULE</div>
         <div className='p-1 mx-5  d-flex align-items-center gap-10'  onClick={()=>handleClick('listcar')} ><FaClipboardList className='styleIcon'/> LIST VEHICULE</div>
         
         </> : '' } 


         <div  className='p-3 d-flex align-items-center gap-10' onClick={()=>setClicked('managappareil')} onDoubleClick={()=>setClicked('')}><TbGps className='fs-2 styleIcon' />MANAGEMENT APPAREIL</div>
         {clicked === "managappareil" ? <>
         <div className='p-1 mx-5  d-flex align-items-center gap-10' onClick={()=>handleClick('addappareil')}><IoAddCircle className='styleIcon'  /> ADD APPAREIL</div>
         <div className='p-1 mx-5  d-flex align-items-center gap-10'  onClick={()=>handleClick('listappareil')} ><FaClipboardList className='styleIcon'/> LIST APPAREIL</div>
         
         </> : '' } 

         <div  className='p-3 d-flex align-items-center gap-10' onClick={()=>setClicked('managementcompanie')
      
        } style={{cursor:'pointer'}}><BsBuildingGear className='fs-2 styleIcon' />MANAGEMENT COMPANIE</div>

<div  className='p-3 d-flex align-items-center gap-10' onClick={()=>setClicked('managementappareil')
      
    } style={{cursor:'pointer'}}><BsBuildingGear className='fs-2 styleIcon' />MANAGEMENT COMPANIE</div>
         {clicked === "managementcompanie" ? <>
         <div className='p-1 mx-5  d-flex align-items-center gap-10' onClick={()=>handleClick('addcompanie')}><BsBuildingAdd className='styleIcon'  /> ADD COMPANIE</div>
         <div className='p-1 mx-5  d-flex align-items-center gap-10'  onClick={()=>handleClick('listcompanie')} ><BsBuildingCheck className='styleIcon'/> LIST COMPANIE</div>
         
         </> : '' } 
          </div>
          
          }
          </div>
         
   
    
  )
}

export default LeftSideBar