
import '../../assets/css/font-awesome.css';
import '../../assets/css/vendors/icofont.css';
import '../../assets/css/vendors/themify.css';
import '../../assets/css/vendors/flag-icon.css';
import '../../assets/css/vendors/feather-icon.css';
import '../../assets/css/vendors/bootstrap.css';
import '../../assets/css/style.css';
import '../../assets/css/color-1.css';
import '../../assets/css/responsive.css';
import ig from '../../assets/images/logo/logo_dark.png'
import ig1 from '../../assets/images/logo/logo.png'
import React, { useEffect, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import {useFormik} from 'formik'
import { activeAccount, loginUser, resetMessage } from '../../features/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import ModalCongratulation from '../../Component/ModalCongratulation'
import Loading from '../../Component/Loading'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MessageContainer from '../../Component/MessageContainer'
const Login = () => {
  const {token} = useParams()
  const[show,setShow] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userstate = useSelector(state=>state?.auth)
  const{isLogin,message,isError,isSuccess,isLoading} = userstate
  let signupSchema = yup.object().shape({
 
     email:yup.string().email('format invalid email').required('email is required'),
  //   mobile:yup.number().required('mobile is required'),
    password:yup.string().required('password is required').min(4).max(20),
   
    
  }) 
   
 useEffect(()=>{
  if(token) {
    setShow(true)
    dispatch(activeAccount(token))
  }
 },[token,dispatch])
 const[msg,setMsg] = useState(message)
 useEffect(()=>{
  if(message?.length > 0) setMsg(message)
 },[message])
  const formik = useFormik({
      // validationSchema:signupSchema,
     initialValues:{
    
      email:"",
      password:"",
    
     },
     validationSchema:signupSchema,
      onSubmit:(values)=>{
     
      
     dispatch(loginUser({email:values.email,password:values.password}))
     formik.resetForm();
     setMsg(message)
     setTimeout(()=>{
     setMsg('')
     },2000)
    
       

      } 
    })
    useEffect(()=>{
      if(isLogin === true) {
      
          navigate('/admin')
     
      }
    },[isLogin,navigate])
    useEffect(()=>{
      dispatch(resetMessage())
      setMsg('')
      formik.resetForm()
    },[dispatch])
    const[showHide,setShowHide] = useState(false)
  return (
    <>
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-12 p-0">    
            <div className="login-card login-dark">
              <div>
                <div>
                  <a className="logo" href="index.html">
                    <img className="img-fluid for-light" src={ig1} alt="loginpage" />
                    <img className="img-fluid for-dark" src={ig} alt="loginpage" />
                  </a>
                </div>
                <div className="login-main"> 
                  <form onSubmit={formik.handleSubmit} className="theme-form">
                    <h4>Sign in to account</h4>
                    <p>Enter your email & password to login</p>
                    <div className="form-group">
                      <label className="col-form-label">Email Address</label>
                      <input type="text" onChange={formik.handleChange('email')} value={formik.values.email} className='form-control' id="email" name="email" />
                {formik.touched.email && formik.errors.email && <MessageContainer title={formik.errors.email} />}
                    </div>
                    <div className="form-group">
                      <label className="col-form-label">Password</label>
                      <div className="form-input position-relative">
                      <input type={`${showHide ? 'text' : 'password'}`} id="password" onChange={formik.handleChange('password')} value={formik.values.password} className='form-control' name="password" />
                {formik.touched.password && formik.errors.password && <MessageContainer  title={formik.errors.password} />}
                        <div className="show-hide">
                          <span className="show"></span>
                        </div>
                      </div>
                    </div>
                    <div className="form-group mb-0">
                      <div className="checkbox p-0">
                        <input id="checkbox1" type="checkbox" />
                        <label className="text-muted" htmlFor="checkbox1">Remember password</label>
                      </div>
                      <Link to={"/register"} className="link" href="forget-password.html"  >Forgot password?</Link>
                      <div className="text-end mt-3">
                        <button className="btn btn-primary btn-block w-100" type="submit">Sign in</button>
                      </div>
                    </div>
               
                 
                   
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   
    </>
  );
}

export default Login;
