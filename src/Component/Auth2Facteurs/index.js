import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import {useFormik} from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { codeConn, createA2F, resetMessage, verifA2F } from '../../features/authSlice'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import './style.css'
import MessageContainer from '../MessageContainer'
const Auth2Facteur = () => {
 
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const[digits,setDigits] = useState(['','','','','',''])
    const handleChange = (e,index)=>{
    const value = e.target.value
    if(/^[0-9]$/.test(value)){
      const newDigits = [...digits]
      newDigits[index] = value;
      setDigits(newDigits)
    }
    }
    const concatNumber = digits.join('')
    const userstate = useSelector(state=>state?.auth)
    const{isLogin,message,isError,isSuccess,isLoading,verifiedCode2f} = userstate
    let signupSchema = yup.object().shape({
   
       email:yup.string().email('format invalid email').required('email is required'),
    //   mobile:yup.number().required('mobile is required'),
     
     
      
    }) 
     
//    useEffect(()=>{
//     if(token) {
//       setShow(true)
//       dispatch(activeAccount(token))
//     }
//    },[token,dispatch])
   const[msg,setMsg] = useState(message)
   const[next,setNext] = useState(false)

   useEffect(()=>{
    if(message?.length > 0) setMsg(message)
   },[message])
    const formik = useFormik({
        // validationSchema:signupSchema,
       initialValues:{
      
        email:"",
       
      
       },
       validationSchema:signupSchema,
        onSubmit:(values)=>{
         if(next === false){
          alert(JSON.stringify(values,null,2))
          dispatch(createA2F({email:formik.values.email}))
    //    dispatch(loginUser(values))
       formik.resetForm();
       setMsg(message)
       setTimeout(()=>{
       setMsg('')
       if(isSuccess){
        setNext(true)
       }
       
       },5000)
         }
        
         
          
        
      
         
  
        } 
      })

      useEffect(()=>{
        dispatch(resetMessage())
        setMsg('')
      },[])
    useEffect(()=>{
      if(isError) setNext(false)
  
      if(isSuccess) setNext(true)
    },[isError,isSuccess])   
  useEffect(()=>{
    if(verifiedCode2f===true)
    setTimeout(()=>{window.location.href=('/admin')},2000)
  },[verifiedCode2f,navigate])
  return (
    <div className="container1 d-block mx-auto my-5 py-5">
    <div className="login-box">
        <h5>Auth 2 Factor</h5>
        <form onSubmit={formik.handleSubmit}>
           {!next  ?  <div className="input-container">
                <label for="email">Email</label>
                <input type="text" onChange={formik.handleChange('email')} value={formik.values.email} className='form-control' id="email" name="email" />
                {formik.touched.email && formik.errors.email && <MessageContainer title={formik.errors.email}/>}
            </div>
            :
            <div className="input-container">
                <label for="code">Code</label>
                <div className='d-flex gap-10'>
                {
                 
                  digits?.map((digit,index)=>(
                    <input key={index}
                    type={'text'}
                    value={digit}
                    onChange={(e)=>handleChange(e,index)}
                    maxLength={1}
                    />
                  ))
                
                }
                  </div>
                {concatNumber>0}
                {console.log(typeof concatNumber)}
            </div>
            }
          
           
       
          {msg?.length > 0 &&<div style={{width:'100%'}} className='badge bg-warning p-2'>{msg}</div>}
           {!next && <button type="submit" className='mt-2  btn-outline btn-sm' >{'SEND CODE'}</button>}
           {next && <button type="button" onClick={()=>{
             dispatch(verifA2F({inputcode:concatNumber}))
          

           }} className=' mt-2  bg-primary  btn-sm'  style={{backgroundImage:"var(--bg-button)",
            color:"white"}}>LOGIN</button>}
            
            <button onClick={()=>navigate('/')} className='mt-2 mb-4 btn-dark btn-sm cancel' >CANCEL</button>
          
        </form>
    </div>

</div>
  )
}

export default Auth2Facteur