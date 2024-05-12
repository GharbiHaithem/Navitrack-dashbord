import React, { useEffect, useState } from 'react'


import '../../assets/css/style.css';

import { CiCirclePlus } from "react-icons/ci";
import{toast} from 'react-toastify'
import { CiMenuFries } from "react-icons/ci";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { logOut } from '../../features/authSlice';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import NotifDevis from '../NotifDevis'
import './style.css'
const NavBar = ({openMenu,setOpenMenu,notif,setNotif }) => {
const navigate= useNavigate()
const dispatch=useDispatch()
const{user} = useSelector(state=>state?.auth)
const handleDelete = (id)=>{
 const filterdata = notif?.filter((n)=>n?._id !== id)
 setNotif(filterdata)
 const finddata = notif?.find((n)=>n?._id === id)
 toast.error(` ${finddata?.nomComplet} deleted successfuly`)
}
  return (
    <div>
 
    <div className="tap-top"><i data-feather="chevrons-up"></i></div>
 
    {/* <div className="loader-wrapper">
      <div className="loader-index"> <span></span></div>
      <svg>
        <defs></defs>
        <filter id="goo">
          <fegaussianblur in="SourceGraphic" stddeviation="11" result="blur"></fegaussianblur>
          <fecolormatrix in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo"> </fecolormatrix>
        </filter>
      </svg>
    </div> */}
  
    <div className="page-wrapper compact-wrapper" id="pageWrapper">
   
    <div className={`w-[100%] h-[90px] page-header ${openMenu ? 'open' : 'close'}`} >
        <div className="header-wrapper flex justify-between items-center  row m-0">
          {/* <form className="form-inline search-full col" action="#" method="get">
            <div className="form-group w-100">
              <div className="Typeahead Typeahead--twitterUsers">
                <div className="u-posRelative">
                  <input className="demo-input Typeahead-input form-control-plaintext w-100" type="text" placeholder="Search Cuba .." name="q" title="" autofocus/>
                  <div className="spinner-border Typeahead-spinner" role="status"><span className="sr-only">Loading...</span></div><i className="close-search" data-feather="x"></i>
                </div>
                <div className="Typeahead-menu"></div>
              </div>
            </div>
          </form> */}

       
          <div  className="left-header w-[50px] z-50  p-1"  >
       {openMenu ? (<MdOutlineArrowBackIos style={{}} className='font-bold text-blue-800 text-2xl cursor-pointer'  onClick={()=>{
      
        setOpenMenu(!openMenu)}}/>) : (
         <CiMenuFries  style={{}} className='font-bold text-blue-800 text-2xl cursor-pointer'  onClick={()=>setOpenMenu(!openMenu)} />
       ) }  
           
          </div>
          <div className="nav-right  w-[500px]  pull-right right-header p-3 ms-auto"  style={{transform: "translateY(-45px)"}}>
            <ul className="nav-menus">
             
              <li>                         <span className="header-search">
                  <svg>
                    <use href="../../assets/svg/icon-sprite.svg#search"></use>
                  </svg></span></li>
              <li className="onhover-dropdown hidden">
                <svg>
                  <use href="../../assets/svg/icon-sprite.svg#star"></use>
                </svg>
                <div className="onhover-show-div bookmark-flip">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="front">
                        <h6 className="f-18 mb-0 dropdown-title">Bookmark</h6>
                        <ul className="bookmark-dropdown">
                          <li>
                            <div className="row">
                              <div className="col-4 text-center">
                                <div className="bookmark-content">
                                  <div className="bookmark-icon"><i data-feather="file-text"></i></div><span>Forms</span>
                                </div>
                              </div>
                              <div className="col-4 text-center">
                                <div className="bookmark-content">
                                  <div className="bookmark-icon"><i data-feather="user"></i></div><span>Profile</span>
                                </div>
                              </div>
                              <div className="col-4 text-center">
                                <div className="bookmark-content">
                                  <div className="bookmark-icon"><i data-feather="server"></i></div><span>Tables</span>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="text-center"><a className="flip-btn f-w-700" id="flip-btn" href="javascript:void(0)">Add New Bookmark</a></li>
                        </ul>
                      </div>
                      <div className="back">
                        <ul>
                          <li>
                            <div className="bookmark-dropdown flip-back-content">
                              <input type="text" placeholder="search..."/>
                            </div>
                          </li>
                          <li><a className="f-w-700 d-block flip-back" id="flip-back" href="javascript:void(0)">Back</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="mode">
                  <svg>
                    <use href="../../assets/svg/icon-sprite.svg#moon"></use>
                  </svg>
                </div>
              </li>
              <li className="cart-nav onhover-dropdown">
                <div className="cart-box">
                  <svg>
                    <use href="../../assets/svg/icon-sprite.svg#stroke-ecommerce"></use>
                  </svg><span className="badge rounded-pill badge-success">2</span>
                </div>
                <div className="cart-dropdown onhover-show-div">
                  <h6 className="f-18 mb-0 dropdown-title">Cart</h6>
                  <ul>
                    <li>
                      <div className="media"><img className="img-fluid b-r-5 me-3 img-60" src="../../assets/images/other-images/cart-img.jpg" alt=""/>
                        <div className="media-body"><span>Furniture Chair for Home</span>
                          <div className="qty-box">
                            <div className="input-group"><span className="input-group-prepend">
                                <button className="btn quantity-left-minus" type="button" data-type="minus" data-field="">-</button></span>
                              <input className="form-control input-number" type="text" name="quantity" value="1"/><span className="input-group-prepend">
                                <button className="btn quantity-right-plus" type="button" data-type="plus" data-field="">+</button></span>
                            </div>
                          </div>
                          <h6 className="font-primary">$500</h6>
                        </div>
                        <div className="close-circle"><a className="bg-danger" href="#"><i data-feather="x"></i></a></div>
                      </div>
                    </li>
                    <li>
                      <div className="media"><img className="img-fluid b-r-5 me-3 img-60" src="../../assets/images/other-images/cart-img.jpg" alt=""/>
                        <div className="media-body"><span>Furniture Chair for Home</span>
                          <div className="qty-box">
                            <div className="input-group"><span className="input-group-prepend">
                                <button className="btn quantity-left-minus" type="button" data-type="minus" data-field="">-</button></span>
                              <input className="form-control input-number" type="text" name="quantity" value="1"/><span className="input-group-prepend">
                                <button className="btn quantity-right-plus" type="button" data-type="plus" data-field="">+</button></span>
                            </div>
                          </div>
                          <h6 className="font-primary">$500.00</h6>
                        </div>
                        <div className="close-circle"><a className="bg-danger" href="#"><i data-feather="x"></i></a></div>
                      </div>
                    </li>
                    <li className="total">
                      <h6 className="mb-0">Order Total : <span className="f-right">$1000.00</span></h6>
                    </li>
                    <li className="text-center"><a className="d-block mb-3 view-cart f-w-700" href="cart.html">Go to your cart</a><a className="btn btn-primary view-checkout" href="checkout.html">Checkout</a></li>
                  </ul>
                </div>
              </li>
              <li className="onhover-dropdown">
                <div className="notification-box">
                  <svg>
                    <use href="../../assets/svg/icon-sprite.svg#notification"></use>
                  </svg><span className="badge rounded-pill badge-secondary">{notif?.length} </span>
                </div>
                <div className="onhover-show-div notification-dropdown h-[400px] overflow-y-scroll scroll-container">
                  <h6 className="f-18 mb-0 dropdown-title">Notitications</h6>
              
                    
                      
                   {
                    notif?.map((c)=>(
                   <div  className='flex justify-between items-center X'  >
                     <NotifDevis key={c?._id} className={'p-3  '} onClick={()=>{
                      navigate(`/admin/devis/${c?._id}`)
                    }}  msg={c}  /> 
                    <span  className='mr-[30px]' onClick={(e)=>{
                      e.stopPropagation();
                      handleDelete(c?._id)
                     }} >X</span>
                   </div>
                    ))
                   }
                   
                  
              
                </div>
              </li>
              <li className="profile-nav onhover-dropdown pe-0 py-0">
                <div className="media profile-media"><img className="b-r-10" src="../../assets/images/dashboard/profile.png" alt=""/>
                  <div className="media-body  hidden md:block"><span>{user?.lastname + " " +user?.firstname}</span>
                    <p className="mb-0">Admin <MdAdminPanelSettings className='fs-7'/></p>
                  </div>
                </div>
                <ul className="profile-dropdown onhover-show-div">
                  <li><a href="#"><i data-feather="user"></i><span>Account </span></a></li>
                  <li><a href="#"><i data-feather="mail"></i><span>Inbox</span></a></li>
                  <li><a href="#"><i data-feather="file-text"></i><span>Taskboard</span></a></li>
                  <li><a href="#"><i data-feather="settings"></i><span>Settings</span></a></li>
                  <li onClick={() => {
              navigate('/')
              dispatch(logOut())
            }}><a href="#"><i data-feather="log-in" > </i><span>Log Out</span></a></li>
                </ul>
              </li>
            </ul>
          </div>
         
        </div>
      </div>
   
      
    </div>
  
  
  </div>
  )
}

export default NavBar