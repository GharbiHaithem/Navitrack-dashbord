import React, { useEffect, useRef } from 'react'
import TextAnnimation from '../TextAnnimatioon'
import { useFormik } from 'formik'
import * as yup from 'yup'
import CheckboxGroup from 'react-checkbox-group';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesfn, updateCat } from '../../features/categriesSlice';
import {  appareilget, createappareil } from '../../features/appareilSlice';
import MessageContainer from '../MessageContainer';
import { useParams } from 'react-router-dom';
import './style.css'
import { IoIosPricetags } from "react-icons/io";
import { AiOutlineFieldNumber } from "react-icons/ai";
const AddAppareil = () => {
    const isFirstUpdate = useRef(true);
    const{id} = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        if(id !== undefined){
            dispatch(appareilget(id))
        }
    },[id,dispatch])
    const{appareils,isSuccess,isError} = useSelector(state=>state?.appareil)
    let signupSchema = yup.object().shape({
        modelTag: yup.string().required('modele is required'),
        code: yup.string().required('serial number is required'),


        priceUnite: yup.number().required('price is required'),

        qtyStock: yup.number().required('quantity carburant is required')
    })

    const formik = useFormik({
        // validationSchema:signupSchema,
        initialValues: {
            modelTag: "",
            code:id !== undefined ?  appareils.code : '',
            category: id !== undefined ? appareils?.category : "",
            priceUnite:id !== undefined ? appareils?.priceUnite :  "",
            qtyStock: id !== undefined ? appareils?.qtyStock :"",
accessoire:id !== undefined ? appareils?.accessoire :  false
        },
        validationSchema: signupSchema,
        enableReinitialize: true,
        onSubmit: (values) => {

            alert(JSON.stringify(values,null,2))
          
        
             dispatch(createappareil(values))
        setTimeout(()=>{
            if(isError){
            return ;
           }
            else{
               const data = {
                   id: formik.values.category,
                   qtyStock: formik.values.qtyStock
               };
           
             console.log(data)
                   dispatch(updateCat(data));
               
            }
           
        },3000)  
          formik.resetForm()
            }
          
            
        
    })
    const handleCategoryChange = (e) => {
        const value = e.target.value;
        const categoryValue = ({ id: value });
        formik.setFieldValue('category', categoryValue);
    };
   
    useEffect(() => {
        dispatch(categoriesfn())
    }, [dispatch])
    const { categries } = useSelector(state => state?.category)
    console.log(categries)
  
    
    return (
        <div className="container">
            <div className="login-box">
                <div style={{ boxShadow: '0 0 1px black',marginTop:'150px', padding: '5px' }}> <h5 style={{ fontWeight: 100 }}><TextAnnimation text={id !== undefined ? "UPDATE APPAREIL" :"ADD APPAREIL"}/></h5></div>
                <form onSubmit={formik.handleSubmit} >
                    <div className='d-flex flex-column gap-10'>
                        <div className='d-flex gap-10 mt-3'>
                            <div style={{ width: '50%' }}>
                                <div className="input-container mb-3">
                                
                                    <input type="text" placeholder='Model Tag'  onChange={formik.handleChange('modelTag')} value={formik.values.modelTag} className='form-control' id="model" name="model" />
                                    {formik.touched.modelTag && formik.errors.modelTag && <MessageContainer title={formik.errors.modelTag} />}

                                </div>
                                <div class="mb-3 input-group-square">
                         
                            <div class="input-group"><span class="input-group-text list-light-danger"><AiOutlineFieldNumber /></span>
                              <input class="form-control" type="text" placeholder="Serial Number"   onChange={formik.handleChange('code')} value={formik.values.code} className='form-control' name="serialNumber"/>
                              {formik.touched.code && formik.errors.code && <MessageContainer title={formik.errors.code} />}
                            </div>
                          </div>
                               
                               
                          <div className="form-group">
    
    <div className="input-group">
        <button className="btn btn-outline-secondary" id="button-addon1" type="button"><IoIosPricetags /></button>
        <input 
            className="form-control" 
            type="number" 
            placeholder="prix Unitaire" 
            aria-label="Example text with button addon" 
            onChange={formik.handleChange('priceUnite')} 
            value={formik.values.priceUnite} 
            name="priceUnite"  
            aria-describedby="button-addon1"
            id="priceUnite" // Assurez-vous d'avoir un identifiant unique pour l'input
        />
        {formik.touched.priceUnite && formik.errors.priceUnite && <MessageContainer title={formik.errors.priceUnite} />}
    </div>
</div>




                            </div>

                            <div style={{ width: '50%' }}>

                            <div className="form-group mb-3">

    <div className="input-group">
        <button className="btn btn-outline-secondary" id="button-addon1" type="button">Quantity Stock</button>
        <input 
         type="number" id="qtyStock" className='form-control' onChange={formik.handleChange('qtyStock')} value={formik.values.qtyStock} name="qtyStock"
        />
         {formik.touched.qtyStock && formik.errors.qtyStock && <MessageContainer title={formik.errors.qtyStock} />}
    </div>
</div>
                               


                                <div className="input-container">
    <label className='text-start'>Catégorie</label>
    {categries && categries?.map((cat, index) => (
        <label className='text-start' key={index}>
            <input
                type="radio"
                name="category"
                value={cat?.id}
                onChange={handleCategoryChange}
                checked={formik.values.category?.id === cat?.id}
                
            />
            {cat?.name}
        </label>
    ))}

    <br />
    {formik.touched.category && formik.errors.category && <MessageContainer title={formik.errors.category} />}
</div>

<div className="input-container text-start">
    <label>
    <input
        type="checkbox"
        name="accessoire"
        checked={formik.values.accessoire}
        onChange={formik.handleChange}
    />
    Camera
</label>
{formik.touched.accessoire && formik.errors.accessoire && <MessageContainer title={formik.errors.accessoire} />}
</div>



                            </div>
                        </div>

                    </div>


                    <button className=' mt-4 yyyaaa styleButton mx-auto block ' type='submit'>{id !== undefined ? "UPDATE APPAREIL" :"ADD APPAREIL"}</button>

                </form>
            </div>
        </div>
    )
}

export default AddAppareil