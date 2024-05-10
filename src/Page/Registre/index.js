import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { registreUser, resetMessage } from '../../features/authSlice'
import { useDispatch, useSelector } from 'react-redux'
const Register = () => {
    const dispatch = useDispatch()
    let signupSchema = yup.object().shape({
        lastname:yup.string().required('name is required'),
        firstname:yup.string().required('name is required'),
         email:yup.string().email('format invalid email').required('email is required'),
      //   mobile:yup.number().required('mobile is required'),
        password:yup.string().required('password is required').min(4).max(20),
        adress:yup.string().required('adress is required').min(4).max(20)
        
      }) 
      const userstate = useSelector(state=>state?.auth)
     
      const[msg,setMsg]=useState('')
     useEffect(()=>{
      dispatch(resetMessage())
     if(userstate?.message?.length > 0)
     setMsg(userstate?.message)
     },[userstate?.message,dispatch])
      const formik = useFormik({
          // validationSchema:signupSchema,
         initialValues:{
          lastname: "",
          firstname:'',
          email:"",
          password:"",
          adress:"",
         },
         validationSchema:signupSchema,
          onSubmit:(values)=>{
         
            alert(JSON.stringify(values,null,2))
          dispatch(registreUser(values))
             formik.resetForm();
            setMsg(userstate?.message)
            setTimeout(()=>{
            setMsg('')
            },2000)
            
          }
        })
     
  return (
    <div className="container2 d-block mx-auto my-5">
    <div className="login-box">
        <h5>Signup</h5>
        <form onSubmit={formik.handleSubmit}>
            <div className="input-container">
                <label htmfor="firstname">FirstName</label>
                <input type="text"   onChange={formik.handleChange('firstname')} value={formik.values.firstname} className='form-control' id="firstname" name="firstname" />
                {formik.touched.firstname && formik.errors.firstname && <span className=' badge bg-danger ' stye={{fontWeight:100,fontSize:'9px'}}>{formik.errors.firstname}</span>}
            </div>
            <div className="input-container">
                <label htmlForfor="lastname">LastName</label>
                <input type="text" id="lastname" onChange={formik.handleChange('lastname')} value={formik.values.lastname} className='form-control' name="lastname" />
                {formik.touched.lastname && formik.errors.lastname && <span className=' badge bg-danger' stye={{fontWeight:100}}>{formik.errors.lastname}</span>}
            </div>
            <div className="input-container">
                <label htmllfor="email">Email</label>
                <input type="text" id="email"  onChange={formik.handleChange('email')} value={formik.values.email} className='form-control' name="email" />
                {formik.touched.email && formik.errors.email && <span className=' badge bg-danger' stye={{fontWeight:100}}>{formik.errors.email}</span>}
            </div>
            <div className="input-container">
                <label htmllfor="email">Password</label>
                <input type="password" id="password"  onChange={formik.handleChange('password')} value={formik.values.password} className='form-control' name="password" />
                {formik.touched.password && formik.errors.password && <span className=' badge bg-danger' stye={{fontWeight:100}}>{formik.errors.password}</span>}
            </div>
            <div className="input-container">
                <label htmllfor="adress">Adress</label>
                <textarea id="adress" className='form-control'  onChange={formik.handleChange('adress')} value={formik.values.adress} name="adress" />
                {formik.touched.adress && formik.errors.adress && <span className=' badge bg-danger' stye={{fontWeight:100}}>{formik.errors.adress}</span>}
            </div>
         <div style={{width:'100%'}}>
         {userstate?.message && userstate?.message?.length !== 0 &&<span className='badge bg-warning p-3' style={{width:'100%'}}>{ msg}</span>}
         </div >
            <button type="submit" className=' mt-2 mb-4 btn-sm  xx' >Signup</button>
           <span className='mt-2' style={{fontWeight:300,cursor:'pointer'}}> Already Have an account ?  ?<Link  to={'/'} className='text-primary'> Login</Link></span>
        </form>
    </div>
</div>
  )
}

export default Register