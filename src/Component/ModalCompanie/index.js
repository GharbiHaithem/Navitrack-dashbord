import React, { useEffect } from 'react'
import './style.css'
import {AiOutlineClose} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { vehiculesCompanie } from '../../features/vehiculeSlice'
import ListVehiculeCompanie from '../ListVehiculeCompanie'
import ListFacturesCompanie from '../ListFacturesCompanie'
import { facture } from '../../features/factureSlice'
const ModalCompanie = ({showModal,setShowModal}) => {
  const dispatch = useDispatch()
    useEffect(()=>{
        console.log(showModal.data);
   
       
    dispatch(vehiculesCompanie(showModal.data))
    if(showModal.name==="listFacture"){
       dispatch(facture(showModal.data))
    }
    
  },[showModal.data,showModal.name,dispatch])
  return (
    <div className='ModalCompanie-wrapper container my-5 '>
        <form className='form'> 
       <div className='d-flex justify-content-between'><h6>{showModal.name==="ModalUser" ? "Fiche Represantant" : `${showModal.name==="listVehicule" ? "List Vehicules" : "List Factures" }`} </h6><AiOutlineClose onClick={()=>setShowModal(showModal.status =false)}  className='fs-3' /></div> 
 {showModal.name==="ModalUser" ? <div className='d-flex flex-column gap-20 my-5'>
    <span>{showModal?.data?.firstname + " " + showModal?.data?.lastname}</span>
    <span>{showModal?.data?.email}</span>
    <span>{showModal?.data?.address }</span>
    
    
    </div>  
 : showModal.name==="listVehicule" ? <ListVehiculeCompanie/>  : <ListFacturesCompanie/> }
        </form>
    </div>
  )
}

export default ModalCompanie