import React from 'react'
import { FaUser } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useNavigate } from 'react-router';
import './style.css'
const MenuBar = ({setMenuStates,menuStates}) => {
  const navigate =useNavigate()
    const handleIconClick = (menuName) => {
        setMenuStates((prevState) => ({
          ...prevState,
          [menuName]: !prevState[menuName],
        }));
      };
  return (
    <div className="page-body-wrapper">
      
    <div className="sidebar-wrapper absolute w-[150px] sm:w-[250px]" style={{height:"100vh"}} sidebarLayout="stroke-svg">
   
      <div className=''>
        <div className="logo-wrapper mx-auto text-center w-[50%] mt-4"><a href="index.html"><img className="img-fluid for-light" src="../../assets/images/logo/logo.png" alt=""/><img className="img-fluid for-dark" src="../assets/images/logo/logo_dark.png" alt=""/></a>
         
   
        </div>
       
        <nav className="sidebar-main mt[506px]" style={{marginTop:'55px',marginLeft:"10px",width:'100%'}}>
          <div className="left-arrow" id="left-arrow"><i dataFeather="arrow-left"></i></div>
          <div id="sidebar-menu ">
          <div className={`p-2   flex flex-col ${menuStates.user ? "bg-gray-200 text-black" :"transparent"} `}>
         <div className="hoverable-div "  >
    <div>
  

      <span className='mb-0  text-xs font-black'>User Management </span>
    </div>
   {menuStates.user ?<MdOutlineKeyboardArrowDown onClick={()=>{
       setMenuStates(menuStates.companie===false)
       setMenuStates(menuStates.user===false)
       setMenuStates(menuStates.appareil===false)
      }} /> :<MdKeyboardArrowRight onClick={()=>{
       setMenuStates(menuStates.companie===false)
      handleIconClick('user')}} />  } 
  </div>
 <div className={`${menuStates.user ? 'block': 'hidden'} px-5`}>
 <div className='flex items-center'><span  className='mb-0  text-lg font-extralight mx-2'  onClick={()=>navigate('/admin/addUser')}><code>Add User</code></span></div>
 <div className='flex items-center'><span  className='mb-0  text-lg font-extralight mx-2'  onClick={()=>navigate('/admin/listusers')}><code>List User</code></span></div>
 </div>
  
         </div>
         <div className={`p-2 flex flex-col ${menuStates.companie ? "bg-gray-200 text-black" :"transparent"} `}>
  <div className="hoverable-div  ">
    <div>
   
      <span className='mb-0  text-xs font-black '>Company Management</span>
    </div>
    {menuStates.companie ?<MdOutlineKeyboardArrowDown  onClick={()=>{
      setMenuStates(menuStates.user===false)
      setMenuStates(menuStates.companie===false)
      setMenuStates(menuStates.appareil===false)
      }}  /> :<MdKeyboardArrowRight  onClick={()=>{
      setMenuStates(menuStates.user===false)
      handleIconClick('companie')}} />  } 
  </div>
  <div className={`${menuStates.companie ? 'block': 'hidden'} px-5`}>
 <div  className='flex  items-center'><span onClick={()=>navigate('/admin/addclient')}  className='mb-0 text-lg font-extralight mx-2'><code> Add Companie</code></span></div>
 <div  className='flex  items-center'><span onClick={()=>navigate('/admin/listcompanie')}  className='mb-0 text-lg font-extralight mx-2'><code> LIST Companie</code></span></div>
  <span><i class="fa-solid fa-square-plus"></i></span>
 </div>
  </div>
  <div className={`p-2  flex flex-col ${menuStates.appareil ? "bg-gray-200 text-black" :"transparent"} `}>
  <div className="hoverable-div  ">
    <div>
   
      <span className='mb-0  text-xs font-black '>appareil Management</span>
    </div>
    {menuStates.appareil ?<MdOutlineKeyboardArrowDown  onClick={()=>{
      setMenuStates(menuStates.user===false)
      setMenuStates(menuStates.companie===false)
      setMenuStates(menuStates.appareil===false)
      }}  /> :<MdKeyboardArrowRight  onClick={()=>{
      setMenuStates(menuStates.user===false)
      setMenuStates(menuStates.companie===false)
      
      handleIconClick('appareil')}} />  } 
  </div>
  <div className={`${menuStates.appareil ? ' block': 'hidden'} px-5`}>
 <div  className='flex  items-center'><span  className='mb-0 text-lg font-extralight mx-2' onClick={()=>navigate('/admin/addappareil')}><code> Add appareil</code></span></div>
 <div  className='flex  items-center'><span  className='mb-0 text-lg font-extralight mx-2' onClick={()=>navigate('/admin/listappareil')}><code> List appareils</code></span></div>
  <span><i class="fa-solid fa-square-plus"></i></span>
 </div>
  </div>
  <div className={`p-2 flex flex-col ${menuStates.vehicule ? "bg-gray-200 text-black" :"transparent"} `}>
  <div className="hoverable-div  ">
    <div>
   
      <span className='mb-0  text-xs font-black '>vehicule Management</span>
    </div>
    {menuStates.vehicule ?<MdOutlineKeyboardArrowDown  onClick={()=>{
      setMenuStates(menuStates.user===false)
      setMenuStates(menuStates.companie===false)
      setMenuStates(menuStates.appareil===false)
      
      
      }}  /> :<MdKeyboardArrowRight  onClick={()=>{
      setMenuStates(menuStates.user===false)
      setMenuStates(menuStates.companie===false)
      setMenuStates(menuStates.appareil===false)
      
      
      handleIconClick('vehicule')}} />  } 
  </div>
  <div className={`${menuStates.vehicule ? 'block': 'hidden'} px-5`}>
 <div  className='flex  items-center'><span  className='mb-0 text-lg font-extralight mx-2' onClick={()=>navigate('/admin/addvehicule')}><code> Add vehicule</code></span></div>
 <div  className='flex  items-center'><span  className='mb-0 text-lg font-extralight mx-2' onClick={()=>navigate('/admin/listcar')}><code> List vehicules</code></span></div>
  <span><i class="fa-solid fa-square-plus"></i></span>
 </div>
  </div>
  <div className={`p-2   flex flex-col ${menuStates.user ? "bg-gray-200 text-black" :"transparent"} `}>
         <div className="hoverable-div "  >
    <div>
  

      <span className='mb-0  text-xs font-black'>Article Management </span>
    </div>
   {menuStates.article ?<MdOutlineKeyboardArrowDown onClick={()=>{
       setMenuStates(menuStates.companie===false)
       setMenuStates(menuStates.user===false)
       setMenuStates(menuStates.appareil===false)
      }} /> :<MdKeyboardArrowRight onClick={()=>{
       setMenuStates(menuStates.companie===false)
      handleIconClick('article')}} />  } 
  </div>
 <div className={`${menuStates.article ? 'block': 'hidden'} px-5`}>
 <div className='flex items-center'><span  className='mb-0  text-lg font-extralight mx-2'  onClick={()=>navigate('/admin/addArticle')}><code>Add Article</code></span></div>
 <div className='flex items-center'><span  className='mb-0  text-lg font-extralight mx-2'  onClick={()=>navigate('/admin/listArticle')}><code>List Article</code></span></div>
 </div>
  
         </div>
          </div>
          <div className="right-arrow" id="right-arrow"><i data-feather="arrow-right"></i></div>
        </nav>
      </div>
    </div>
   

 
   
  </div>
  )
}

export default MenuBar