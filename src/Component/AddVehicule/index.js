import React, { useEffect, useState } from 'react'
import TextAnnimation from '../TextAnnimatioon'

import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { getCar, getCars, registreCar, updateCar } from '../../features/vehiculeSlice'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { appareils as appareilsFn } from '../../features/appareilSlice'
import MessageContainer from '../MessageContainer'
import { companies } from '../../features/companieSlice'
import { TbBrandVolkswagen } from "react-icons/tb";
import { categoriesfn } from '../../features/categriesSlice'
import { TbNumber } from "react-icons/tb";
import { IoLogoModelS } from "react-icons/io";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { ImPower } from "react-icons/im";
import { IoBatteryHalfSharp } from "react-icons/io5";
import { BsCalendar2Date } from "react-icons/bs";
import moment  from 'moment'


const AddVehicule = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [msg, setMsg] = useState(null)
  useEffect(()=>{
    dispatch(categoriesfn())
  },[dispatch])
  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };
  useEffect(() => {
    if (id !== undefined) {
      dispatch(getCar(id))
    }
  }, [id, dispatch])
  const { vehicule } = useSelector(state => state?.car)
  const navigate = useNavigate()
  let signupSchema = yup.object().shape({

     matricule: yup.string().required("Matricule is required"),
    model: yup.string().required("Model is required"),
    marque: yup.string().required("Marque is required"),
    type: yup.string().required("Type is required"),
    puisanceFiscale: yup.number().required("Puisance fiscale is required"),
    qtyCarburantLitre: yup.number().required("Qty carburant litre is required"),
    anneeMiseEnCirculation: yup.date().required("Annee mise en circulation is required"),

  })
  const formik = useFormik({
    // validationSchema:signupSchema,
    initialValues: {
      matricule: vehicule?.matricule || "",
      model: vehicule?.model || '',
      marque: vehicule?.marque || "",
      type: vehicule?.type || "",
      puisanceFiscale: vehicule?.puisanceFiscale || "",
      qtyCarburantLitre: vehicule?.qtyCarburantLitre || "",
      anneeMiseEnCirculation: vehicule?.anneeMiseEnCirculation || "",
      appareil: vehicule?.appareil?.id || "",
      client:{id:vehicule?.client?.id} ||  "",
    },
    validationSchema: signupSchema,
    enableReinitialize: true,
    onSubmit: (values) => {

      alert(JSON.stringify(values, null))
      if (id !== undefined) {
        alert("update")
        const data = { id: id, cardata: values }
        dispatch(updateCar(data))
        formik.resetForm()
        setTimeout(() => {
          navigate("/admin/listcar")
        }, 2000)
      } else  {

        alert(JSON.stringify(values, null))
        alert(JSON.stringify(values.anneeMiseEnCirculation, null))
        dispatch(registreCar(values))
        formik.resetForm()
        setTimeout(() => {
          setMsg("")

          dispatch(appareilsFn())
          dispatch(getCars())
        }, 1000)
      }








    }
  })
  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split('/');
  const pageName = parts[parts.length - 1];
  useEffect(() => {
    console.log(pageName)
    if ((pathname === "addCar") && id === undefined) {
      formik.resetForm()
    }
  }, [pathname, formik, pageName, id])


  useEffect(() => {
    if (id !== undefined) {
      dispatch(getCar(id))
    }
  }, [id, dispatch])
  useEffect(() => {
    dispatch(appareilsFn())
  }, [dispatch])
  const { appareils } = useSelector(state => state?.appareil)
  const {categries } = useSelector(state => state?.category)
  
  const { companie } = useSelector(state => state?.companie)
  const handleAppareilChange = (e) => {
    const selectedValue = e.target.value;

    // Transformez la valeur sélectionnée en objet avec une propriété "id"
    const appareilValue = ({ id: selectedValue });
    console.log(appareilValue)
    // Mettez à jour le state de Formik
    formik.setFieldValue('appareil', (appareilValue));

  };
  const handleClientChange = (e) => {
    const selectedValue = e.target.value;
    console.log("Nouvelle valeur sélectionnée pour le client:", selectedValue);
    const clientValue = { id: selectedValue };
    formik.setFieldValue('client', clientValue);
    console.log("Valeur de formik.values.client après la mise à jour:", formik.values.client);
};
  useEffect(() => {
   if(appareils?.length>0){ dispatch(companies())}
  }, [dispatch,appareils])
  const[selectCat,setSelectCat] = useState(false)
  const[selectCatValue,setSelectCatValue] = useState(null)
  
  const[filterAppareil,setFilterAppareil] = useState([])
  useEffect(()=>{
   const filterData = appareils?.length>0 && companie?.length>0 &&  appareils?.filter((app)=>app?.category?.id ===selectCatValue && app?.affected !== true  )
   setFilterAppareil(filterData)
  },[appareils,selectCatValue,companie])
  
  return (
    <div className="container">
      <div className="login-box">

        <div style={{ boxShadow: '0 0 1px black',marginTop:'150px', padding: '5px' }}> <h5 style={{ fontWeight: 100 }}><TextAnnimation text={`${id ? 'UPDATE CAR' : 'ADD CAR'} `} /></h5></div>
        <form onSubmit={formik.handleSubmit}>
          <div className='d-flex flex-column gap-10'>
            <div className='d-flex gap-10 mt-3'>
              <div style={{ width: '50%' }}>
              <div class="mb-3 m-form__group">
                           
                            <div class="input-group"><span class="input-group-text list-light-primary"><TbNumber /></span>
                              <input className='form-control' onChange={formik.handleChange('matricule')} value={formik.values.matricule} id="matricule" name="matricule" type="text" placeholder="matricule ..."/>
                              {formik.touched.matricule && formik.errors.matricule && <MessageContainer title={formik.errors.matricule} />}
                            </div>
                          </div>
                          <div class="mb-3 m-form__group">
                           
                           <div class="input-group"><span class="input-group-text list-light-primary"><TbBrandVolkswagen /></span>
                             <input type="text" id="marque" className='form-control' onChange={formik.handleChange('marque')} value={formik.values.marque} placeholder='marque ...' name="marque"/>
                             {formik.touched.matricule && formik.errors.marque && <MessageContainer title={formik.errors.marque} />}
                           </div>
                         </div>
                         <div class="mb-3 m-form__group">
                         <div class="input-group"><span class="input-group-text list-light-primary"><IoLogoModelS  /></span>
                         <input type="text" id="model" onChange={formik.handleChange('model')} value={formik.values.model} className='form-control'  placeholder='model ...' name="model" />
                         {formik.touched.model && formik.errors.model && <MessageContainer title={formik.errors.model} />}
                           </div>
                         </div>
              

                <div className="input-container d-flex gap-10 flex-rows form-group">
    <div style={{ display: 'flex', gap: '10px' }}>
    <select  onChange={(e) => {
    if (e.target.value === "") {
      setSelectCat(false);
    } else {
      setSelectCat(true);
      setSelectCatValue(e.target.value)
    }
  }} style={{ width: "50%",fontWeight:400 }} className="form-select form-select-sm" aria-label=".form-select-sm example">
            <option value=""  selected>{id!== undefined ? vehicule?.appareil?.category?.name : "Select category"}</option>
            {
              categries && categries?.map((c)=>(
<option  key={c?.id}  value={c?.id}>{c?.name}</option>
              ))
            }
            
          
        </select>
        
        <select
            style={{ width: "50%" }}
            className="form-select form-select-sm"
            aria-label=".form-select-sm example"
            id="appareil"
            name="appareil"
            onChange={handleAppareilChange}
            value={formik.values.appareil.id || ''} // Utilisez formik.values.appareil._id
            disabled={!selectCat}
        >
            <option value="" >{id !== undefined ? vehicule?.appareil?.code : 'Select appareil'} </option>
            {filterAppareil && filterAppareil?.length > 0 && filterAppareil?.map((item, index) => (
                (item?.qtyStock > 0) &&
                <option key={item.id} value={item.id}>
                    {item.code}
                </option>
            ))}
        </select>

       
    </div>

   
</div>



              </div>

              <div style={{ width: '50%' }}>

              <div class="mb-3 m-form__group">
                         <div class="input-group"><span class="input-group-text list-light-primary"><BsFillFuelPumpDieselFill /></span>
                         <input type="text" id="type" className='form-control' onChange={formik.handleChange('type')} value={formik.values.type} name="type"  placeholder='Type carburant ...'  />
                         {formik.touched.type && formik.errors.type && <MessageContainer title={formik.errors.type} />}
                           </div>
                         </div>
               
                         <div class="mb-3 m-form__group">
                         <div class="input-group"><span class="input-group-text list-light-primary"><ImPower /></span>
                         <input type='number' id="puisanceFiscale" className='form-control' onChange={formik.handleChange('puisanceFiscale')} value={formik.values.puisanceFiscale}  placeholder='puisance Fiscale ...' name="puisanceFiscale" />
                         {formik.touched.puisanceFiscale && formik.errors.puisanceFiscale && <MessageContainer title={formik.errors.puisanceFiscale} />}
                           </div>
                         </div>

                         <div class="mb-3 m-form__group">
                         <div class="input-group"><span class="input-group-text list-light-primary"><IoBatteryHalfSharp /></span>
                         <input type='number' id="qtyCarburantLitre" className='form-control' onChange={formik.handleChange('qtyCarburantLitre')} value={formik.values.qtyCarburantLitre} placeholder='Qantity Carburant (L)' name="qtyCarburantLitre" />
                         {formik.touched.qtyCarburantLitre && formik.errors.qtyCarburantLitre && <MessageContainer title={formik.errors.qtyCarburantLitre} />}
                           </div>
                         </div>
                     
                <div className="input-container mb-3 flex">
                  <div  className="bg-black px-2 flex items-center  p-2 text-white text-start text-lg" htmllfor="anneecircuation"><BsCalendar2Date className='mr-[10px]' /><span>Annee mise en circuation</span></div>
                  <input type='date' className='form-control' onChange={formik.handleChange('anneeMiseEnCirculation')} value={(formik.values.anneeMiseEnCirculation)} name="anneeMiseEnCirculation" />
                  {formik.touched.anneeMiseEnCirculation && formik.errors.anneeMiseEnCirculation && <MessageContainer title={formik.errors.anneeMiseEnCirculation} />}

                </div>
                <div class="input-group">
                      <button className="btn btn-outline-secondary" type="button"> <i class="icofont icofont-credit-card"></i></button>
                      <select  className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    id="client"
                    name="client"
                    onChange={handleClientChange}
                    value={formik.values.client.id || ''}
                 >
                       <option value="" disabled>{id!== undefined ?  vehicule?.client?.nomComplet : " Choisissez un client"} </option>
                    {companie?.length > 0 && companie?.map((item, index) => (

                      <option key={item.id} value={item.id}>
                        {item.nomComplet}
                      </option>
                    ))}
                      </select>
                   
                    </div>
                
              </div>

            </div>

          </div>


          <button className='btn mt-3 yyyaaa btn-sm mb-4 styleButton' type='submit'>{id ? "UPDATE CAR" : "Add car"}</button>

        </form>
      </div>
    </div>
  )
}

export default AddVehicule