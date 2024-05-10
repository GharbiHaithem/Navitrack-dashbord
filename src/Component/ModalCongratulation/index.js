import React, { useEffect } from 'react'
import './style.css'

import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useDispatch } from 'react-redux';
import { resetMessage } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
const ModalCongratulation = ({isSuccess,isError,message,setShow}) => {
    const navigate = useNavigate()
    useEffect(()=>{
       if(isSuccess)
       {
        setTimeout(()=>{
     
            setShow(false)
             },10000)

       }
     
    },[isSuccess,navigate])
  return (
    <div className="ModalCongratulation-wrapper">
        <form className='form-modal-congratulation'>
      
        </form>
    </div>
  )
}

export default ModalCongratulation