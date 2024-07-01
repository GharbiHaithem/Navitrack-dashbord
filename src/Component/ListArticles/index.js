import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {adau, allusers, deleteauser, getuser, searchUser, sendEmailDetails} from '../../features/authSlice'
import moment from 'moment'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { json, useNavigate, useParams } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextAnnimation from '../TextAnnimatioon';
import { deleteArticle, articles as fnarticles  } from '../../features/articleSlice';
import {BiMessageSquareDetail} from 'react-icons/bi'
import ShowModal from '../ShowModal';


const columns = [
    {
        title: 'Key',
        dataIndex: 'key',
    },
    {
        title: 'images article',
        dataIndex: 'image_article',
    },
    {
        title: 'titre',   
        dataIndex:"titre" 
    },
    {
        title: 'Description',
        dataIndex: 'description',
    },
  
 {
        title:'Details',
        dataIndex:'details'
    },
  
    {
        title:'Actions',
        dataIndex : 'Actions'
    },
  
];


const ListArticles = ( {open ,setOpen,setProductId}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {articles} = useSelector(state=>state?.article)
  

 
  const showModal = (e) => {
    setOpen(true);
    setProductId(e)
  }
 
  
   const[query,setQuery] = useState(null)
 
    const _data = [];
    
   for (let i = 0; i < articles?.length; i++) {
     
     let desc = articles[i]?.description?.length<250 ?  articles[i]?.description : (articles[i]?.description).slice(0,250) + "..." 
           _data.push({
            key: i + 1,
            titre: articles[i]?.titre ,  
            description:desc.replace(/<\/?[^>]+(>|$)/g, ""), 
            Actions:<div className='d-flex gap-20'><button  onClick={()=> navigate(`/admin/updatearticle/${articles[i]?._id}`)} style={{
                backgroundImage:' linear-gradient(to right ,rgba(224, 220, 15, 0.897),rgba(244, 228, 138, 0.697))',
                fontWeight: '600',
                color: 'white',padding:'5px'
            }}><BorderColorIcon className='fs-7' /></button><button  onClick={()=>dispatch(deleteArticle(articles[i]?._id))}  style={{
                backgroundImage:'linear-gradient(to right ,rgba(239, 17, 17, 0.897),rgba(215, 138, 13, 0.697))',
                fontWeight: '600',
                color: 'white',
                padding:'5px'
            }} ><DeleteForeverIcon className='fs-7  '  /></button></div>,
         

            image_article:
            <>
            {
              articles[i]?.images_article?.length >0 && <img src={articles[i]?.images_article[0].url} style={{width:'80px',height:'80px'}} alt={articles[i]?.images_article[0]?.public_id} />
            }
            </>,
            details:<div onClick={()=>showModal(articles[i])}><BiMessageSquareDetail  className='fs-4' /></div>
        })
    

}
const handleSearch = (e)=>{
    setQuery(e.target.value)
  
   
}

useEffect(()=>{
      dispatch(fnarticles())
},[dispatch])

    return (
  <>
        <div className='container mt-[130px]'>
           
      
  
          <Table  columns={columns} dataSource={_data} />
   
       
        </div>
   
  </>
    )
}

export default ListArticles
