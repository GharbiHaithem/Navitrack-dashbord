import React, { useEffect, useState } from 'react'

import * as yup from 'yup'
import {useFormik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import { codeConn, createsimpleuser, resetMessage, updateuser, verifycode ,getuser, verifPasswords, resetVerifPassword, updatesimpleuser} from '../../features/authSlice'
import { Link, useParams } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import TextAnnimation from '../TextAnnimatioon'
import { companies } from '../../features/companieSlice'
import './styles.css'
import MessageContainer from '../MessageContainer'
import { FaAddressBook } from "react-icons/fa6";
import { FaKey } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
const AddUser = () => {
  const{id} = useParams()
  const[changePass,setChangePass] = useState(false)
  const dispatch = useDispatch()
  const {message,isSuccess,user,verifcodeconnexion,isLoading,verifPassword,isError} = useSelector(state=>state?.auth)
  const[verified,setVerified] = useState(false)
  const [xdata,setXdata] = useState(null)
  const userdata = useSelector(state=>state?.auth?.getUser)
  const[pass,setPass] = useState(null)
  useEffect(()=>{
    if(id !== user?._id && id !== undefined){
      dispatch(getuser(id));
    }
  },[id,dispatch,user?._id])
  useEffect(() => {
    if (id !== user?._id && id !== undefined) {
     
 
        setXdata(userdata);
    
      
    } else if (id === undefined) {
    
        setXdata(null);
     
    } else {
     
        setXdata(user);
     
    }
  }, [id,user?.id,userdata,user])

const[msgPassword,setMsgPassword] = useState(null)
useEffect(()=>{
dispatch(resetMessage())

},[])
  let signupSchema = yup.object().shape({
    lastname:yup.string().required('name is required'),
    firstname:yup.string().required('name is required'),
     email:yup.string().email('format invalid email').required('email is required'),
  //   mobile:yup.number().required('mobile is required'),
    // password:yup.string().required('password is required').min(4).max(20),
    address:yup.string().required('adress is required').min(4).max(20),
    // currentPassword :yup.string().required('password is required').min(4).max(20),
   
  }) 
 
 const formik = useFormik({
  // validationSchema:signupSchema,
 initialValues:{
  lastname : xdata?.lastname || "",
  firstname:xdata?.firstname  ||  '',
  email: xdata?.email || "",
  password:  "",
  address:xdata?.address || "",
  currentPassword : "",
  client:xdata?.client || ""
 },
 validationSchema:signupSchema,
 enableReinitialize:true,
  onSubmit:(values)=>{
 
   

    if(id !== undefined && id === user?._id){
     
    
     dispatch(verifPasswords({oldpassword:formik.values.currentPassword}))
     if(!changePass && formik.values.currentPassword === "" && id === user?._id  ) { 
      dispatch(updateuser(formik.values))}
    
      
     
    }
    else  if(id !== user?._id && id !== undefined){
      const data = {id:id,dataUser : values}
      dispatch(updatesimpleuser(data))}
    else{
   
     
      dispatch(createsimpleuser(values))
      setTimeout(()=>{
      dispatch(companies())
      },1000)
      formik.resetForm()
      formik.values.client._id === ""
    }
    

  }
})
useEffect(()=>{
 dispatch(resetMessage())

},[])
useEffect(()=>{
  if(verifPassword===true && changePass === true)  dispatch(updateuser(formik.values))
 
  setTimeout(()=>{
    dispatch(resetVerifPassword())
   },100)
},[verifPassword,dispatch,changePass,formik.values])
useEffect(()=>{
setVerified(verifcodeconnexion&& verifcodeconnexion.verified)
},[verifcodeconnexion])
  useEffect(()=>{
    if(user?.email === formik.values.email) setVerified(true)
  },[user,formik.values.email])
  useEffect(()=>{
    if(verifcodeconnexion?.message==="verified account") setVerified(true)
    if(message ==="Time out or code invalid Try again") setVerified(false)
  },[message,verifcodeconnexion?.message])
  console.log(verified)
  console.log(message)
  const [msg,setMsg] = useState(null)
  useEffect(()=>{
    if(message) setMsg(message)
    setTimeout(()=>{
   setMsg('')
   
    },3100)
  },[message])
//  useEffect(()=>{
//   if(id === undefined){
//     formik.resetForm()
//   }
//  },[formik,id])
 const data={
  email:formik.values.email
 }
 const[showInput,setShowInput] = useState(false)
 const [inputValue, setInputValue] = useState('');

 const handleInputChange = (event) => {
   const value = event.target.value;

   // Vérifier si la valeur est composée de six chiffres
   if (/^\d{0,6}$/.test(value)) {
     setInputValue(value);
   }
 };
 useEffect(()=>{

  if(formik.values.email.length === 0 ) setShowInput(false)
 },[formik.values.email.length])

 useEffect(() => {
  // Définir une fonction à exécuter après 3 minutes
  const myFunction = () => {
    // Placez ici le code que vous souhaitez exécuter après 3 minutes
    setShowInput(false)
  };

  // Définir le délai de 3 minutes (3 * 60 * 1000 millisecondes)
  const delay = 5 * 60 * 1000;

  // Définir le timeout
  const timeoutId = setTimeout(myFunction, delay);

  // Nettoyer le timeout lorsque le composant est démonté
  return () => clearTimeout(timeoutId);
}, [])
useEffect(()=>{
  if(user?.email !== formik.values.email) setVerified(false)
},[formik.values.email,user?.email])
useEffect(()=>{
  setPass(formik.values.password)
},[formik.values.password])
useEffect(()=>{
  dispatch(companies())
},[dispatch])
const {companie} = useSelector(state => state?.companie)
console.log( formik.values.client)
const handleClientChange = (e) => {
  const selectedValue = e.target.value;

  // Transformez la valeur sélectionnée en objet avec une propriété "id"
  const clientValue = (selectedValue );
 
  // Mettez à jour le state de Formik
  formik.setFieldValue('client', (clientValue));

};
const[filteredCompany , setFilteredCompany] = useState([])
useEffect(()=>{
  const filterCompany = companie?.length>0 && companie?.filter((c)=>c?.affected === false)
  setFilteredCompany(filterCompany)
},[companie])
  return (
    <div className="container mx-[70px] ">
    <div className="login-box">
       <div style={{boxShadow:'0 0 1px black' ,marginTop:'150px', padding:'5px'}}> <h5 style={{fontWeight:100}}><TextAnnimation text={id ? 'UPDATE ACCOUNT COMPANIE' : 'ADD ACCOUNT COMPANIE'} /></h5></div>
        <form className='mt-[30px]' onSubmit={formik.handleSubmit}>
         <div className='d-flex flex-column gap-10'>
         <div className='d-flex gap-10'>
           <div style={{width:'50%'}}>
           <div className="input-group input-group-default mb-3"><span className="input-group-text" id="inputGroup-sizing-lg"><MdOutlineDriveFileRenameOutline /></span>
                      <input className="form-control" type="text"  onChange={formik.handleChange('firstname')} value={formik.values.firstname} placeholder='firstname ...'  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                      {formik.touched.firstname && formik.errors.firstname && <MessageContainer title={formik.errors.firstname} />}
                    </div>
                    <div className="input-group input-group-default mb-3"><span className="input-group-text" id="inputGroup-sizing-lg"><MdOutlineDriveFileRenameOutline /></span>
                      <input className="form-control" type="text" id="lastname" onChange={formik.handleChange('lastname')} value={ formik.values.lastname} placeholder='lastname ...'  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                      {formik.touched.lastname && formik.errors.lastname && <MessageContainer  title={formik.errors.lastname} />}
                    </div>
         
           
          
           
              {formik.values.email.length > 0 && formik.values.email   !== user?.email  && id=== user?._id && !verified  ?   <Link onClick={()=>{
                setShowInput(true)
                dispatch(codeConn(data))}}><span className='fs-5'>Please Verify Your Account</span></Link> : "" }
                {showInput &&<div>
                  <span className='badge bg-primary text-light p-3 mt-2 mb-2' style={{fontSize:'12px',fontWeight:300}}>This Email is not Verified To begin using our services.
                  please click the link was sent to you by email .
                  To resend your verification email.<Link>Click here.</Link></span>
                  <input type="text"
            value={inputValue}
             onChange={handleInputChange}
              placeholder="Entrez six chiffres"  className='form-control'  />
                {msg && msg?.length>0 && <span>{msg}</span>}
                <button className='btn btn-sm btn-primary' type='button' onClick={(e)=>{
                  e.preventDefault()
                  dispatch(verifycode({inputCode:inputValue}))
                  setTimeout(()=>{
                    setShowInput(false)
                  },3000)
                  }}>{isLoading &&<CircularProgress size={10} color="inherit" />}&nbsp;<span style={{fontSize:'11px'}}>verify</span></button>
                
                  </div>
                 
                  }
             
            </div>
           
          <div style={{width:'50%'}}>
       {  id=== undefined && id === user?._id && !changePass && <Link className='d-flex justify-content-start mb-2' onClick={()=>setChangePass(true)}>Change Password</Link>}
            {changePass && id ===user?._id &&   <div className="input-container">
                <label htmllfor="email"> Current Password</label>
               <input type="text" id="currentPasword"  onChange={formik.handleChange('currentPassword')} value={formik.values.currentPassword} className='form-control' name="currentPassword" />
               {msgPassword &&<span className=' badge bg-danger' stye={{fontWeight:100}}>{msgPassword}</span>}
               
            </div>}
            {((  id ===undefined)) &&  <div className="input-group input-group-default mb-3">
            <span className="input-group-text" id="inputGroup-sizing-lg"><FaKey className='text-primary' /></span>
               <input type="password" id="password" placeholder=' password ...'  onChange={formik.handleChange('password')} value={formik.values.password} className='form-control' name="password" />
                {formik.touched.password && formik.errors.password && <MessageContainer title={formik.errors.password} />}
               
            </div> 
      
            }

<div className="input-group mb-3"><span className="input-group-text"><FaAddressBook /></span>
                            <textarea className="form-control" aria-label="With textarea"   onChange={formik.handleChange('address')} value={ formik.values.address} name="address"></textarea>
                            {formik.touched.address && formik.errors.address && <MessageContainer title={formik.errors.address} />}
                          </div>

            <div class="mb-3 m-form__group">
                          
                            <div className="input-group"><span className="input-group-text list-light-primary"><TfiEmail /></span>
                              <input className="form-control" onChange={formik.handleChange('email')} value={formik.values.email} type="text" placeholder="Email"/>
                              {formik.touched.email && formik.errors.email && <MessageContainer         title={formik.errors.email}      />}

{id !== undefined && id===user?._id &&  <span className='position-absolute mb-0' style={{top:'35px',right:'0',marginRight:'20px',color:verified ? 'green' : 'red',fontWeight:'400',fontSize:'12px'}}>{verified ? 'Verified' : 'Not Verified'}</span> }
                            </div>
                            </div>
                            <div class="input-group">
                      <label className="input-group-text" htmlFor="inputGroupSelect01"><FaPeopleGroup /></label>
                    <select
  className="form-select"
  aria-label=".form-select example"
  id="client"
  name="client"
  onChange={handleClientChange}
  value={formik.values.client.id}
>
  <option value="" disabled selected> Choisissez un client </option>
  {filteredCompany?.length > 0 && filteredCompany?.map((item, index) => (
    <option key={item.id} value={item.id} >
      {item.nomComplet}
    </option>
  ))}
</select>

                  {formik.touched.client=== null && msg?.length > 0 && <MessageContainer title={msg} />}
                    </div>
{/* <div className="input-container form-group mt-2">
  
                  <select
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    id="client"
                    name="client"
                    onChange={handleClientChange}
                    value={formik.values.client.id} // Utilisez formik.values.appareil._id
                  >
                    <option value="" disabled> Choisissez un client </option>
                    {filteredCompany?.length > 0 && filteredCompany?.map((item, index) => (

                      <option key={item.id} value={item.id}>
                        {item.nomComplet}
                      </option>
                    ))}
                  </select>

                  {formik.touched.client && msg?.length > 0 && <MessageContainer title={msg} />}
                </div> */}
          </div>
           </div>
     
         </div>
          
           {msg && msg?.length> 0 && <div className={`text-light ${isSuccess ? 'bg-success' : 'bg-danger'} fs-7 p-1`}> {msg}</div>}
         <button className='yyyaaa mx-auto block styleButton  btn-sm mb-4 text-3xl'   type='submit'>{id ? "Update Account" : "ADD USER"}</button>

        </form>
    </div>
</div>
  )
}

export default AddUser
