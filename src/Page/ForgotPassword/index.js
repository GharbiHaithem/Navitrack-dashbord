import React, { useEffect, useState } from 'react'

import './style.css'
import { Link } from 'react-router-dom'
import{useFormik} from 'formik'
import * as yup from 'yup'

import { useDispatch, useSelector } from 'react-redux'
import { forgotpassword, resetMessage } from '../../features/authSlice'
import MessageContainer from '../../Component/MessageContainer'
let schema = yup.object().shape({
email : yup.string().required('email is required').email()
})

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues:{
            email : ""
        },
        validationSchema:schema,
     onSubmit:(values)=>{
        alert(JSON.stringify(values,null,2))
        dispatch(forgotpassword(values))
        setMsg(message)
        setTimeout(()=>{
            setMsg('')
            formik.resetForm()
        },3000)
     }
    
})

useEffect(()=>{
  dispatch(resetMessage())
},[dispatch])
const {message,isError,isSuccess} = useSelector(state=>state?.auth)
const[msg,setMsg] = useState(message)
useEffect(()=>{
    if((isSuccess || isError )&& message){
        setMsg(message)
    }
},[isSuccess,isError,message])
useEffect(()=>{
    dispatch(resetMessage())
    formik.errors = ""
    setMsg('')
  },[])
    return (
        <>
          {/* <Creamb title={'forgot password'} />   */}
          <div className='forgot-password-wrapper container-2'>
        
                <div className='row'>
                    <div className='col-md-12 col-sm-4'>
                        <div className='forgot-cart'>
                            <h6 className='text-center'>Reset Your Password</h6>
                            <p className='forgoot-desc mt-3'>We Will Send an Email to reset Your Password</p>
                            <form  className=' d-flex flex-column gap-10' onSubmit={formik.handleSubmit} >
                                <div className='form-group'>
                                    <input type='text' placeholder='Email' className='form-control w-100' name='email'
                                    value={formik.values.email} onChange={formik.handleChange('email')}
                                    />

                                    {formik.touched.email && formik.errors.email && <MessageContainer title={formik.errors.email}/>} 
                                   
                                </div>
                                {msg && msg?.length >0 &&<span className={`badge  position-relative ${isSuccess ? 'bg-success' : 'bg-danger'} text-light p-2`}>{msg}<div className={`${isSuccess ? 'trianglesucces' : 'triangle' } position-absolute`}></div> </span>}
                                <button className='buttonsubmit text-center w-20 p-1' type='submit'>Submit</button>
                                <Link to={'/'} className='buttoncancel w-20 text-center p-1'>Cancel</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
      
        </>
    )
}

export default ForgotPassword