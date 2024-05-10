import React, { useEffect, useState } from 'react'
import TextAnnimation from '../TextAnnimatioon';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { appareils as appfn, archiveAppareil, searchAppareils } from '../../features/appareilSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import{PiArchiveTrayLight} from 'react-icons/pi'
import{toast} from 'react-toastify'
import {IoMdArchive} from 'react-icons/io'
import {MdEditSquare} from 'react-icons/md'
const columns = [
    {
        title: 'Key',
        dataIndex: 'key',
    },
    {
        title: 'Serial Number',
        dataIndex: 'code',
    },
    {
        title: 'price Unité',
        dataIndex: 'priceUnite',
    },
    {
        title: 'Quantity',
        dataIndex: 'qtyStock',
    },
    {
        title:'accessoire',
        dataIndex:'accessoire'
    },
    {
        title:'Category',
        dataIndex : 'category'
    },
    {
        title:'Actions',
       dataIndex:'Actions'
    }
    
];


const ListAppareil = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
 
   
    const {appareils} = useSelector(state => state?.appareil)

  
 
    const _data = [];
   
   for (let i = 0; i < appareils?.length; i++) {

    // let desc = (allUsers[i]?.description).slice(0,250) + "..." 
           _data.push({
            key: i + 1,
            code: appareils[i]?.code ,
            priceUnite: appareils[i]?.priceUnite, 
            qtyStock:(appareils[i]?.qtyStock),
            accessoire : appareils[i]?.accessoire===true ? "camera" : 'non', 
            category: (appareils[i]?.category?.name),
           
            Actions:<div className='d-flex gap-20'><button style={{
              
                fontWeight: '600',
                color: 'white',padding:'10px'
            }}
            className='bg-warning'
            ><MdEditSquare className='fs-5' onClick={()=>navigate(`/admin/editappareil/${appareils[i]?.id}`)} /></button><button style={{
              
                padding:'10px'
            }}   onClick={()=>{
                 dispatch(archiveAppareil(appareils[i]?.id))
                setTimeout(()=>{
                     dispatch(appfn())
                     toast.success(`${appareils[i]?.code} archived success` )
                 },3000)
            }}
            className='bg-dark'
            ><IoMdArchive className='fs-5 '/></button></div>,
           
        })
    

}

  const[query,setQuery] = useState(null)
  const handleSearch = (e)=>{
    setQuery(e.target.value)
  }
  useEffect(()=>{
    if(query?.length>0){ 
        dispatch(searchAppareils(query))
          
          
    }else{
        dispatch(appfn())
    }
  },[query,dispatch])
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
   <div> <h6><TextAnnimation text={'LIST APPAREILS'}/></h6></div>
   <div className='input-container mt-1'>  <input  name='query' onChange={handleSearch} type='text' placeholder='Seria number' className='form-control' style={{width:"100%" }} /></div>
   </div>
   
      <Table  columns={columns} dataSource={_data} />

   
    </div>
    
</>
  )

    }
export default ListAppareil