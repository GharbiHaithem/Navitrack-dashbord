import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import MessageType from '../MessageType'
import{toast } from 'react-toastify'
import {  companiefn, createcompanie, editcompanie, companies } from '../../features/companieSlice';
import MessageContainer from '../MessageContainer';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { allusers } from '../../features/authSlice';
import { GiRotaryPhone } from "react-icons/gi";
import { MdDomain } from "react-icons/md";
import { MdCorporateFare } from "react-icons/md";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { FaAcquisitionsIncorporated } from "react-icons/fa";
const AddClient = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    useEffect(()=>{
    
      if(id !== undefined){
        alert("get client")
        dispatch(companiefn(id))
      }
    
     },[id,])
    let signupSchema = yup.object().shape({
        raisonSociale:yup.string().required('raison sociale is required'),
        matriculeSociale:yup.string().required('matricule Sociale is required'),
         email:yup.string().email('format invalid email').required('email is required'),
         siegeSociale:yup.string().required('siege Sociale is required'),
         telephone:yup.string().required('telephone required'),
  
         secteurActivite:yup.string().required('secteur activite is required').min(4).max(20),
         nomComplet:yup.string().required('nom Complet is required').min(8).max(25),
       
      }) 
   
      const[msg,setMsg]=useState('')
     
     
    
 
     const navigate = useNavigate()
     const companiestate = useSelector(state=>state?.companie)
     const {clientcreated,companie} = companiestate
      const formik = useFormik({
          // validationSchema:signupSchema,
         initialValues:{
            raisonSociale:id!==undefined ? companie?.raisonSociale : "",
            matriculeSociale:id !== undefined  ? companie?.matriculeSociale : "",
            siegeSociale:id !== undefined  ? companie?.siegeSociale : "",
            email: id !== undefined  ? companie?.email :"",
          
          telephone:id !== undefined  ? companie?.telephone  : "",
          secteurActivite:id !== undefined  ? companie?.secteurActivite :"",
          nomComplet:id !== undefined  ? companie?.nomComplet : "",
       
         },
         validationSchema:signupSchema,
         enableReinitialize:true,
          onSubmit:(values)=>{
            if(id!== undefined){
              const data={id :id , clientData:values}
              dispatch(editcompanie(data))
              alert(JSON.stringify(values,null,2))
              dispatch(companies())
              setTimeout(()=>{
                toast.success(`${formik.values.nomComplet} UPDATED SUCCESS`)
                navigate(`/admin/listcompanie`)
              },3000)
            }else
            {alert(JSON.stringify(values,null,2))
            dispatch(createcompanie(values))}
          }
        })
        const handleUserChange = (e) => {
          const selectedValue = e.target.value;
      
          // Transformez la valeur sélectionnée en objet avec une propriété "id"
          const clientValue = ({ _id: selectedValue });
          console.log(clientValue)
          // Mettez à jour le state de Formik
          formik.setFieldValue('user', (clientValue));
      
        };
        console.log(formik.values.user)
  return (
    <div className="container d-block mx-auto my-5">
    <div className="login-box">
       <div  className='mt-[80px]'> <span style={{fontSize:'25px' , fontWeight:'600'}}>{id !== undefined ? 'UPDATE COMPANIE' : 'ADD COMPANIE'}</span></div>
        <form onSubmit={formik.handleSubmit} >
    <div className='d-flex align-items-center gap-40'>
    <div className='w-50'>
    <div className="input-group mb-3"><span className="input-group-text" id="inputGroup-sizing-default"><MdCorporateFare /></span>
                      <input className="form-control" type="text"  placeholder="Raison Sociale" onChange={formik.handleChange('raisonSociale')} value={formik.values.raisonSociale} id="raisonSociale" name="raisonSociale" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                      {formik.touched.raisonSociale && formik.errors.raisonSociale && <MessageContainer styled={{fontWeight:'200',padding:'5px'}} title={formik.errors.raisonSociale} />}
                    </div>
                    <div className="input-group mb-3"><span className="input-group-text" id="inputGroup-sizing-default"><AiOutlineFieldNumber /></span>
                      <input className="form-control" type="text" id="matriculeSociale" placeholder='Matricule Sociale' onChange={formik.handleChange('matriculeSociale')} value={formik.values.matriculeSociale}  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                      {formik.touched.matriculeSociale && formik.errors.matriculeSociale && <MessageContainer styled={{fontWeight:'200',padding:'5px'}} title={formik.errors.matriculeSociale} />}
                    </div>
                    <div className="input-group mb-3"><span className="input-group-text" id="inputGroup-sizing-default"><CiLocationOn /></span>
                      <input className="form-control" type="text"id="siegeSociale"  placeholder='siege Sociale' onChange={formik.handleChange('siegeSociale')} value={formik.values.siegeSociale} name="siegeSociale" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                      {formik.touched.siegeSociale && formik.errors.siegeSociale && <MessageContainer styled={{fontWeight:'200',padding:'5px'}} title={formik.errors.siegeSociale} />}
                    </div>
                    <div class="mb-3 m-form__group">
                         
                            <div class="input-group"><span class="input-group-text list-light-primary"><i class="icofont icofont-pencil-alt-5 txt-primary"></i></span>
                              <input type='text' id="email"  onChange={formik.handleChange('email')} value={formik.values.email} className='form-control' name="email" placeholder="Email"/>
                              {formik.touched.email && formik.errors.email && <MessageContainer styled={{fontWeight:'200',padding:'5px'}} title={formik.errors.email}  />}
                            </div>
                          </div>
          
          </div>
           <div className='w-50 mb-0'>
          
           <div class="mb-3 m-form__group">
                         
                         <div class="input-group"><span class="input-group-text list-light-primary"><GiRotaryPhone /></span>
                           <input type='text'onChange={formik.handleChange('telephone')} value={formik.values.telephone} className='form-control ' name="telephone"placeholder="telephone"/>
                           {formik.touched.telephone && formik.errors.telephone && <MessageContainer  styled={{fontWeight:200,padding:'5px'}}  title={formik.errors.telephone} />}  
                         </div>
                       </div>
            
                       <div class="mb-3 m-form__group">
                         
                         <div class="input-group"><span class="input-group-text list-light-primary"><MdDomain /></span>
                           <input type='text'id="secteurActivite" placeholder="secteur d'activite"  onChange={formik.handleChange('secteurActivite')} value={formik.values.secteurActivite} className='form-control' name="secteurActivite"/>
                           {formik.touched.secteurActivite && formik.errors.secteurActivite && <MessageContainer  styled={{fontWeight:200}} title={formik.errors.secteurActivite} />}
                         </div>
                       </div>
      
          
                       <div class="mb-3 m-form__group">
                         
                         <div class="input-group"><span class="input-group-text list-light-primary"><FaAcquisitionsIncorporated /></span>
                           <input type='text' id="nomComplet" placeholder='Nom Complet' className='form-control'  onChange={formik.handleChange('nomComplet')} value={formik.values.nomComplet} name="nomComplet"/>
                           {formik.touched.nomComplet && formik.errors.nomComplet && <MessageContainer  styled={{fontWeight:200,padding:'5px'}} title={formik.errors.nomComplet}/>}
                         </div>
                       </div>
           
       
           </div>
    </div>
       
            <button type="submit" className='yyyaaa styleButton mt-2 mb-4 btn-sm  ' >{id !== undefined ? 'UPDATE COMPANIE' : 'ADD COMPANIE'}</button>
           {/* <span className='mt-2' style={{fontWeight:300,cursor:'pointer'}}> Already Have an account ?  ?<Link  to={'/'} className='text-primary'> Login</Link></span> */}
        </form>
    </div>
    </div>
  )
}

export default AddClient