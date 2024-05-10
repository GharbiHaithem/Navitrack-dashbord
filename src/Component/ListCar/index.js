import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {adau, allusers, deleteauser, sendEmailDetails} from '../../features/authSlice'
import moment from 'moment'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useNavigate, useParams } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { deleteCar, getCar, getCars, searchVehicule, vehiculesClient } from '../../features/vehiculeSlice';
import TextAnnimation from '../TextAnnimatioon';
import{IoMdArchive} from 'react-icons/io'

const columns = [
    {
        title: 'Key',
        dataIndex: 'key',
    },
    {
        title: 'Matricule',
        dataIndex: 'matricule',
        width:'500px'
    },
    {
        title: 'Marque',
        dataIndex: 'marque',
    },
    {
        title: 'Model',
        dataIndex: 'model',
    },
    {
        title:'Puissance fiscale',
        dataIndex:'puisanceFiscale'
    },
    {
        title:'Annee mise en circulation',
        dataIndex : 'anneeMiseEnCirculation'
    },
    {
        title:"Quantity Carburant reservir (L)",
        dataIndex : 'qtyCarburantLitre'
    },
    {
        title:"Companie",
        dataIndex:"client"

    },
    {
title:'Appareils',
dataIndex : 'Appareils'
    },
    {
        title:"Action",
        dataIndex : 'Actions'
    }
];


const ListCar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
 
  
  
 const[query,setQuery] = useState(null)
  const handleSearch = (e)=>{
    setQuery(e.target.value)
  }
 useEffect(()=>{
    if(query?.length> 0){
      dispatch(searchVehicule(query))  
      dispatch(vehiculesClient(query))   
    }
     else{ dispatch(getCars())}
 },[query,dispatch])
 console.log(query);
 
    const _data = [];
    const {vehicule} = useSelector(state => state?.car)
   for (let i = 0; i < vehicule?.length; i++) {

    // let desc = (allUsers[i]?.description).slice(0,250) + "..." 
           _data.push({
            key: i + 1,
            matricule: vehicule[i]?.matricule ,
            marque: vehicule[i]?.marque, 
            model:(vehicule[i]?.model),
            puisanceFiscale : vehicule[i]?.puisanceFiscale, 
            anneeMiseEnCirculation:moment((vehicule[i]?.anneeMiseEnCirculation)).format('YYYY'),
            qtyCarburantLitre:vehicule[i]?.qtyCarburantLitre,
            client:vehicule[i]?.client?.nomComplet,
            Appareils: vehicule[i]?.appareil?.code=== undefined ? "Not selected"  : vehicule[i]?.appareil?.code ,
            Actions:<div className='d-flex gap-20'><button style={{
                padding:'10px'
            }} onClick={()=>navigate(`/admin/updatecar/${vehicule[i]?.id}`)}   className='bg-warning'><BorderColorIcon className='fs-5' /></button><button style={{
               
                padding:'10px'
            }} onClick={()=>{
                dispatch(deleteCar(vehicule[i]?.id))
                setTimeout(()=>{
                    dispatch(getCars())
                },3000)
            }}
            className='bg-dark'
            ><IoMdArchive className='fs-5 '/></button></div>,
           
        })
    

}

    return (
  <>
        <div className='container mt-[150px]'>
            {/* <div className='d-flex justify-content-arround align-items-center gap-30'>
                <div>
                    <h3 className='my-4'>List Product</h3>
                </div>
                <div>
                    <input type='text' placeholder='enter to search product' onChange={(e)=>handleSearch(e)} className='form-control p-2' />
                </div>
            </div> */}
            <div className='qqq d-flex justify-content-between align-items-center p-3 bg-primary text-light' style={{width:'100%'}}>
   <div> <h2><TextAnnimation text={'LIST CARS'}/></h2></div>
   <div className='input-container mt-1'>  <input onChange={handleSearch}  name='query' type='text' placeholder='Matricule Sociale' className='form-control' style={{width:"100%" }} /></div>
   </div>
       
          <Table  columns={columns} dataSource={_data} />
 
       
        </div>
        
  </>
    )
}

export default ListCar
