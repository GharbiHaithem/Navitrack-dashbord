import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCars } from '../../features/vehiculeSlice';
import TextAnnimation from '../TextAnnimatioon';
import { Table } from 'antd';
import './style.css'
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
 
];

const ListVehiculeCompanie = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
   
    
    
   
   useEffect(()=>{
   dispatch(getCars())
   },[dispatch])
   
   
      const _data = [];
      const {vehiculesCompanie,isLoading} = useSelector(state => state?.car)
     for (let i = 0; i < vehiculesCompanie?.length; i++) {
  
      // let desc = (allUsers[i]?.description).slice(0,250) + "..." 
             _data.push({
              key: i + 1,
              matricule:!isLoading && vehiculesCompanie[i]?.matricule ,
              marque:!isLoading && vehiculesCompanie[i]?.marque, 
              model:!isLoading &&(vehiculesCompanie[i]?.model),
              puisanceFiscale :!isLoading && vehiculesCompanie[i]?.puisanceFiscale, 
              anneeMiseEnCirculation:!isLoading&&vehiculesCompanie[i]?.anneeMiseEnCirculation,
              qtyCarburantLitre:!isLoading&&vehiculesCompanie[i]?.qtyCarburantLitre,
              client:!isLoading&&vehiculesCompanie[i]?.client?.nomComplet,
              Appareils:!isLoading&& (vehiculesCompanie[i]?.appareil?.code=== undefined ? "Not selected"  : vehiculesCompanie[i]?.appareil?.code) ,
            
          })
      
  
  }
  const limitPagination = {
    pageSize:3
  }
  return (
    <>
    <div className='container my-5'>
        
        {/* <div className='d-flex justify-content-arround align-items-center gap-30'>
            <div>
                <h3 className='my-4'>List Product</h3>
            </div>
            <div>
                <input type='text' placeholder='enter to search product' onChange={(e)=>handleSearch(e)} className='form-control p-2' />
            </div>
        </div> */}
        <div className='qqq d-flex justify-content-between align-items-center p-3 bg-primary text-light' style={{width:'100%'}}>
<div> <h6><TextAnnimation text={'LIST CApppRS'}/></h6></div>

</div>
   
      <Table  columns={columns} pagination={limitPagination} dataSource={_data} />

   
    </div>
    
</>
  )
}

export default ListVehiculeCompanie