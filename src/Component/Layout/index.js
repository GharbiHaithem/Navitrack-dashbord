import React from 'react'
import NavBar from '../NavBar'
import MenuBar from '../MenuBar'
import { Outlet } from 'react-router'

const Layout = ({menuStates,setMenuStates,setOpenMenu,isScreenSmall,openMenu,setNotif, notif , socket}) => {
  return (
    <>

  <NavBar isScreenSmall={isScreenSmall}  socket={socket}  setNotif={setNotif} notif={notif}   openMenu={openMenu} setOpenMenu={setOpenMenu} />
  {openMenu && <div  className='w-1/3 h-full'> <MenuBar  menuStates={menuStates} openMenu={openMenu} setOpenMenu={setOpenMenu} setMenuStates={setMenuStates} /></div>  }

   <div className={`${openMenu ?'ml-[300px]' : 'container' }`}>
   <Outlet/>
   </div>
 
    </>
  )
}

export default Layout