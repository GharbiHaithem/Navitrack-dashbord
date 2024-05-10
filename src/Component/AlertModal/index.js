import React, { useRef, useState } from 'react'
import './style.css'
import {PiWarningLight} from 'react-icons/pi'
import {SlClose} from 'react-icons/sl'
import { useDispatch } from 'react-redux'
import { appareils, updateQtyAppareil } from '../../features/appareilSlice'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const AlertModal = ({qtyId,setShowAlert}) => {
  const numberInputRef = useRef(null);
  const [value, setValue] = useState(10);
  const dispatch  = useDispatch()
 const navigate = useNavigate()
 const handleSubmit = (e)=>{
 e.preventDefault();
alert(value)
const data = {id:qtyId.idAppareil , qtyStock:value}
dispatch(updateQtyAppareil(data))
setTimeout(()=>{
 
  dispatch(appareils())
  setShowAlert(false)
},600)
navigate("/admin/listappareil")
 }


  return (
    <div className='alert-wrapper'>
        <form className='form-alert' onSubmit={handleSubmit}>
          <div className='d-flex justify-content-between align-items-center p-2' style={{borderRadius:"20px"}}>
           <div className='d-flex gap-10 align-items-center' >
           <PiWarningLight className='fs-1 text-danger' /><span className='text-danger fs-4 mb-0'>Warning</span>
           </div>
           <SlClose style={{cursor:"pointer"}} className='fs-4 ml-2'/>
            </div>  
         <div className='d-flex '>

         <div className='d-flex  align-items-center justify-content-center flex-column gap-10 my-5 mt-5' style={{width:"600px"}}>
        
        <p className='mb-0 w-50' style={{fontWeight:"400", letterSpacing:"1px"}}>Appareil <span className='text-danger' style={{fontWeight:"600" , letterSpacing:"1px"}}>{qtyId.name}</span> a atteint la seille de 2 dans le stock </p>
         <p className='mb-0 w-50' style={{fontWeight:"400", letterSpacing:"1px"}}>Ajouter encore de produit de cette série </p>
       
         </div>
         <div style={{display:"flex", alignItems:"center" , justifyContent:"center" , marginRight:"40px"}}>
         <div className='d-flex flex-column gap-10'>
         <input type='number' ref={numberInputRef} defaultValue={10} onChange={(e)=>setValue(e.target.value)} className='form-group' />
         <button className='badge bg-primary p-2 ' type='submit' style={{cursor:"pointer"}}>Add Quantity</button>
         </div>
      
        
         </div>
         </div>
        </form>
    </div>
  )
}

export default AlertModal