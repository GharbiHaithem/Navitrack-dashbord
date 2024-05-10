import React, { useEffect, useState } from 'react'
import './style.css'

import{useFormik} from 'formik'
import * as yup from 'yup'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './style.css'
import { resetPassword } from '../../features/authSlice'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
let schema = yup.object().shape({
    password:yup.string().required('password is required'),
    repeatpassword : yup.string().required('repeat password is required')
})
const ResetPassword = () => {
    const {message,isSuccess} = useSelector(state=>state?.auth)
    const {token} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues:{
            password:"",
            repeatpassword:""
        },
        validationSchema:schema,
        onSubmit:(values)=>{
            alert(JSON.stringify(values,null,2))
         
            if(formik.values.password !== formik.values.repeatpassword){
                setMsg('Please Verif Your password ! Not Equal')
                setTimeout(()=>{
                    setMsg('')
                },3000)
            }
            else{
                const data = { token:token , dataUser : values.password}
                console.log(data)
                dispatch(resetPassword(data))
          

                setMsg(message)
                setTimeout(()=>{
                    setMsg('')
                     window.location.replace('/');
                },3000)
    
            }
                    }

    })

  
    const[msg,setMsg] = useState(message)
    useEffect(()=>{
   if(message?.length>0)
   setMsg(message)
   setTimeout(()=>{
    setMsg('')
},3000)
    },[message])
    const [showHidePassword, setShowHidePassword] = useState(false);
    const [showHideRepeatPassword, setShowHideRepeatPassword] = useState(false);
    return (
        <>
       
           <div className='reset-password-wrapper py-5'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='reset-card d-flex flex-column gap-10' >
                            <h5 className='mb-4'>Reset Password</h5>
                            <form className='d-flex flex-column gap-10' onSubmit={formik.handleSubmit}>
                            <div className='position-relative'>
        <span
          className='position-absolute'
          style={{ right: 10, top: 3, cursor: 'pointer' }}
          onClick={() => setShowHidePassword(!showHidePassword)}
        >
          {showHidePassword ? <VisibilityOffIcon sx={{ fontSize: '13px', fontWeight: 100 }} /> : <VisibilityIcon sx={{ fontSize: '13px', fontWeight: 100 }} />}
        </span>
        <input
          placeholder='password'
          name='password'
          onChange={formik.handleChange('password')}
          value={formik.values.password}
          autoComplete='none'
          type={`${showHidePassword ? 'text' : 'password'}`}
          className='form-control w-100'
        />
      </div>
      <div className='position-relative'>
        <span
          className='position-absolute'
          style={{ right: 10, top: 3, cursor: 'pointer' }}
          onClick={() => setShowHideRepeatPassword(!showHideRepeatPassword)}
        >
          {showHideRepeatPassword ? <VisibilityOffIcon sx={{ fontSize: '13px', fontWeight: 100 }} /> : <VisibilityIcon sx={{ fontSize: '13px', fontWeight: 100 }} />}
        </span>
        <input
          type={`${showHideRepeatPassword ? 'text' : 'password'}`}
          name='repeatpassword'
          onChange={formik.handleChange('repeatpassword')}
          value={formik.values.repeatpassword}
          placeholder='Repeat password'
          className='form-control w-100'
        />
      </div>
                               {msg && msg?.length>0 && <span className={` position-relative ${isSuccess ? 'bg-success' : 'bg-danger'} fs-5 text-light p-2`}>{msg}<div className={`position-absolute ${isSuccess ? 'trianglesuccess' : 'triangle'}`}></div></span>}
                             <div className='d-flex align-items-center'>   <button className='button mt-2' type='submit'>OK</button>
                                <Link to={'/forgotPassword'} className='mb-0'>Back To Forgot Password</Link></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div> 
        </>
    )
}

export default ResetPassword
