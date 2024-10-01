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
import { BsFillFuelPumpDieselFill, BsUpload } from 'react-icons/bs';
import { upload } from '../../features/uploadSlice';
const AddClient = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    useEffect(()=>{
    
      if(id !== undefined){
      
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
      const [_images, set_Images] = useState([]);
     
    
 
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
          logo:id !== undefined  ? companie?.logo : [] || [],
         },
         validationSchema:signupSchema,
         enableReinitialize:true,
          onSubmit:(values)=>{
            if(id!== undefined){
              const data={id :id , clientData:values}
              dispatch(editcompanie(data))
            
              dispatch(companies())
              setTimeout(()=>{
                toast.success(`${formik.values.nomComplet} UPDATED SUCCESS`)
                navigate(`/admin/listcompanie`)
              },3000)
            }else
            {
            dispatch(createcompanie(values))}
          }
        })
        const handleUserChange = (e) => {
          const selectedValue = e.target.value;
      
          // Transformez la valeur sélectionnée en objet avec une propriété "id"
          const clientValue = ({ _id: selectedValue });
        
          // Mettez à jour le state de Formik
          formik.setFieldValue('user', (clientValue));
      
        };
        console.log(formik.values.user)
        const handleSecteurActivityChange=(e)=>{
          formik.setFieldValue('secteurActivite', (e.target.value));
        } 
        const [localImageUrls, setLocalImageUrls] = useState([]);
        const [selectedFiles, setSelectedFiles] = useState([]);
        const handleSelectFile = (event) => {
          const selectedFiles = Array.from(event.target.files);
          setSelectedFiles(selectedFiles);
          set_Images(selectedFiles);
          
          const urls = selectedFiles.map((file) => URL.createObjectURL(file));
          setLocalImageUrls(urls);
      
          formik.setFieldValue('logo', selectedFiles);
        };
       
        useEffect(() => {
          if (_images.length > 0) {
            dispatch(upload(_images));
          }
        }, [_images, dispatch]);
        const { images, isLoading } = useSelector(state => state.uploads);

        useEffect(() => {
          if (images.length > 0) {
            formik.setFieldValue('logo', images);
          }
        }, [images]);
      
  return (
    <div className="container d-block mx-auto my-5">
    <div className="login-box">
       <div  className='mt-[80px]'> <span style={{fontSize:'25px' , fontWeight:'600'}}>{id !== undefined ? 'UPDATE COMPANIE' : 'ADD COMPANIE'}</span></div>
        <form onSubmit={formik.handleSubmit} >
    <div className='flex md:flex-row flex-col align-items-center gap-10'>
    <div className='md:w-1/2 w-full'>
    <div className="form-group  mt-1 flex flex-col w-full gap-1">
          <label className="custom-file-upload">
            <input type="file"  accept="image/jpeg, image/jpg"  placeholder="Année de fabrication" disabled={isLoading} onChange={handleSelectFile} />
            <div className='flex items-center gap-2'>
              <BsUpload />
              <span className='mx-3'> Logo</span>
            </div>
          </label>
          <span className='text-xs font-extralight'>Format JPG ou JPEG uniquement</span>
        {localImageUrls.length>0 &&  <img className='mt-5' src={localImageUrls} alt={`Local Preview `} style={{ width: '300px', height: 'auto', margin: '10px' }} />}
        </div>
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
           <div className='md:w-1/2 w-full mb-0'>
          
           <div class="mb-3 m-form__group">
                         
                         <div class="input-group"><span class="input-group-text list-light-primary"><GiRotaryPhone /></span>
                           <input type='text'onChange={formik.handleChange('telephone')} value={formik.values.telephone} className='form-control ' name="telephone"placeholder="telephone"/>
                           {formik.touched.telephone && formik.errors.telephone && <MessageContainer  styled={{fontWeight:200,padding:'5px'}}  title={formik.errors.telephone} />}  
                         </div>
                       </div>
                       <div class="input-group mb-3">
                      <button className="btn btn-outline-secondary" type="button"> <MdDomain /></button>
                      <select  className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    id="type"
                    name="type"
                    onChange={handleSecteurActivityChange}
                    value={formik.values.secteurActivite || ''}
                 >
                      <option value="" >
    {id !== undefined ? companie?.secteurActivite : "Secteur Activity ..."}
  </option>
                  

                      <option value={"Agriculture"}>
                      Agriculture
                      </option>
                      <option value={"Agroalimentaire"}>
                      Agroalimentaire
                      </option>
                      <option value={"Automobile"}>
                      Automobile
                      </option>
                      <option value={"Banque et finance"}>
                      Banque et finance
                      </option>
                      <option value={"Bâtiment et travaux publics (BTP)"}>
                      Bâtiment et travaux publics (BTP)
                      </option>
                      <option value={"Commerce"}>
                      Commerce
                      </option>
                      <option value={"Communication et médias"}>
                      Communication et médias
                      </option>
                      <option value={"Éducation et formation"}>
                      Éducation et formation
                      </option>
                      <option value={"Énergie"}>
                      Énergie
                      </option>
                      <option value={"Environnement"}>
                      Environnement
                      </option>
                      <option value={"Hôtellerie et restauration"}>
                      Hôtellerie et restauration
                      </option>
                      <option value={"Industrie manufacturière"}>
                      Industrie manufacturière
                      </option>
                      <option value={"Informatique et technologie"}>
                      Informatique et technologie
                      </option>
                      <option value={"Logistique et transport"}>
                      Logistique et transport
                      </option>
                      <option value={"Luxe et mode"}>
                      Luxe et mode
                      </option>
                      <option value={"Pharmaceutique et santé"}>
                      Pharmaceutique et santé
                      </option>
                      <option value={"Immobilier"}>
                      Immobilier
                      </option>
                      <option value={"Assurance"}>
                      Assurance
                      </option>
                      <option value={"Recherche et développement"}>
                      Recherche et développement
                      </option>
                      <option value={"Services aux entreprises"}>
                      Services aux entreprises
                      </option>
                      <option value={"Tourisme et loisirs"}>
                      Tourisme et loisirs
                      </option>
                      <option value={"Textile et habillement"}>
                      Textile et habillement
                      </option>
                      <option value={"Aéronautique et spatial"}>
                      Aéronautique et spatial
                      </option>
                      <option value={"Biotechnologie"}>
                      Biotechnologie
                      </option>
                      <option value={"Énergies renouvelables"}>
                      Énergies renouvelables
                      </option>
                      </select>
                      {formik.touched.secteurActivite && formik.errors.secteurActivite && <MessageContainer  styled={{fontWeight:200}} title={formik.errors.secteurActivite} />}
                    </div>
                       {/* <div class="mb-3 m-form__group">
                         
                         <div class="input-group"><span class="input-group-text list-light-primary"><MdDomain /></span>
                           <input type='text'id="secteurActivite" placeholder="secteur d'activite"  onChange={formik.handleChange('secteurActivite')} value={formik.values.secteurActivite} className='form-control' name="secteurActivite"/>
                           {formik.touched.secteurActivite && formik.errors.secteurActivite && <MessageContainer  styled={{fontWeight:200}} title={formik.errors.secteurActivite} />}
                         </div>
                       </div> */}
      
          
                       <div class="mb-3 m-form__group">
                         
                         <div class="input-group"><span class="input-group-text list-light-primary"><FaAcquisitionsIncorporated /></span>
                           <input type='text' id="nomComplet" placeholder='Nom Complet' className='form-control'  onChange={formik.handleChange('nomComplet')} value={formik.values.nomComplet} name="nomComplet"/>
                           {formik.touched.nomComplet && formik.errors.nomComplet && <MessageContainer  styled={{fontWeight:200,padding:'5px'}} title={formik.errors.nomComplet}/>}
                         </div>
                       </div>
           
       
           </div>
    </div>
       
            <button type="submit" className='btn btn-primary btn-block w-100 mt-2  ' >{id !== undefined ? 'UPDATE COMPANIE' : 'ADD COMPANIE'}</button>
           {/* <span className='mt-2' style={{fontWeight:300,cursor:'pointer'}}> Already Have an account ?  ?<Link  to={'/'} className='text-primary'> Login</Link></span> */}
        </form>
    </div>
    </div>
  )
}

export default AddClient