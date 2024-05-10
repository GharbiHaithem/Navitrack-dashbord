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
import { companiefn  } from '../../features/companieSlice';



const columns = [
    {
        title: 'Key',
        dataIndex: 'key',
    },
    {
        title: 'FullName',
        dataIndex: 'fullname',
    },
    {
        title: 'company',   
        dataIndex:"client" 
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'created at',
        dataIndex: 'date_creation',
    },

    {
        title:'Send Details account',
        dataIndex:'Send'
    },
    {
        title:'Actions',
        dataIndex : 'Actions'
    },
    {
        title:"Status Account",
        dataIndex : 'Status'
    }
];


const ListUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const statusemail = useSelector(state=>state?.auth?.emailSend)
  
    // const[query,setQuery]=useState([])
    // const [open, setOpen] = useState(false);
    // const[productId,setProductId]=useState()
    // const showModal = (e) => {
    //   setOpen(true);
    //   setProductId(e)
    // }
    // const hideModal = () => {
    //     setOpen(false);
    // };
    // const dispatch = useDispatch()
    // useEffect(()=>{
    //    dispatch(resetAll())
    //     dispatch(getProducts())
    
    // },[dispatch])
    // const handleSearch =(e)=>{
    //     setQuery((e.target.value))
    //     dispatch(searchproducts(query))
    // }
   
  
 
    // useEffect(()=>{
    // if(query){
    //     dispatch(searchproducts(query))
    // }else{
    //     dispatch(getProducts())
    // }
   
    // },[dispatch,query])
    useEffect(()=>{
       dispatch(allusers())
    },[dispatch])
    const {allUsers} = useSelector(state => state?.auth)
    const[send,setSend] = useState({i:0,status:false})
   const[query,setQuery] = useState(null)
   const {companie} = useSelector(state => state?.companie)
    const _data = [];
    console.log(companie?.length>0 &&companie)
   for (let i = 0; i < allUsers?.length; i++) {
     
    // let desc = (allUsers[i]?.description).slice(0,250) + "..." 
           _data.push({
            key: i + 1,
            fullname: allUsers[i]?.firstname + " " +  allUsers[i]?.lastname,
            client:companie?.length>0 && companie[i]?.nomComplet
               
            
          
            ,
            email: allUsers[i]?.email, 
            date_creation:moment(allUsers[i]?.createdAt).format("YYYY-MM-DD HH:mm:ss"),
           
            Send : <div style={{width:'140px',height:'100%'}}>{allUsers[i]?.emailSend === false ?<button  style={{fontSize:'14px',fontWeight:'600',color:"white",padding:'10px',backgroundImage:'linear-gradient(to right ,rgba(84, 239, 17, 0.811),rgba(230, 234, 21, 0.766))'}}   onClick={()=>{
                dispatch(sendEmailDetails({email:allUsers[i]?.email,password:allUsers[i]?.passwordNotHashed}))
               setTimeout(()=>{
                dispatch(allusers())
               },3000)
            }} >Send Email</button> : <button style={{border:'none',backgroundColor:"#22C31D" ,padding:'10px',color:'white'}} disabled>Sended</button>}</div>, 
            Actions:<div className='d-flex gap-20'><button style={{
                backgroundImage:' linear-gradient(to right ,rgba(224, 220, 15, 0.897),rgba(244, 228, 138, 0.697))',
                fontWeight: '600',
                color: 'white',padding:'5px'
            }} onClick={()=>navigate(`/admin/updateUser/${allUsers[i]?._id}`)}><BorderColorIcon className='fs-7' /></button><button style={{
                backgroundImage:'linear-gradient(to right ,rgba(239, 17, 17, 0.897),rgba(215, 138, 13, 0.697))',
                fontWeight: '600',
                color: 'white',
                padding:'5px'
            }} onClick={()=>{
                dispatch(deleteauser(allUsers[i]?._id))
                setTimeout(()=>{
                    dispatch(allusers())
                },3000)
            }}><DeleteForeverIcon className='fs-7 '/></button></div>,
            Status  : <FormControlLabel  onClick={()=>{
                dispatch(adau(allUsers[i]?._id))
                setTimeout(()=>{
                    dispatch(allusers())
                },500)
            }} control={allUsers[i]?.isBlocked === true ?<Switch  defaultChecked color='warning' /> :<Switch defaultChecked color='primary' />} style={{color:allUsers[i]?.isBlocked === true ? '#ed6c02' : 'gray'}} label={`${allUsers[i]?.isBlocked === true ? " Blocked" : " Activated"}`} /> 

            // images:
            // <>
            // {
            //   allUsers[i]?.images?.length >0 && <img src={allUsers[i]?.images[0].url} style={{width:'80px',height:'80px'}} alt={products[i]?.images[0]?.public_id} />
            // }
            // </>,
            // details:<div onClick={()=>showModal(products[i])}><BiMessageSquareDetail  className='fs-4' /></div>
        })
    

}
const handleSearch = (e)=>{
    setQuery(e.target.value)
  
   
}
useEffect(()=>{
    if(query?.length > 0){
        dispatch(searchUser(query))
    }else{
         dispatch(allusers())
    }
},[query,dispatch])
console.log(query)
useEffect(()=>{
    for (let i = 0; i < allUsers?.length; i++) {
        dispatch(companiefn(allUsers[i]?.client))
    }
},[allUsers])

    return (
  <>
        <div className='container mt-[130px]'>
            {/* <div className='d-flex justify-content-arround align-items-center gap-30'>
                <div>
                    <h3 className='my-4'>List Product</h3>
                </div>
                <div>
                    <input type='text' placeholder='enter to search product' onChange={(e)=>handleSearch(e)} className='form-control p-2' />
                </div>
            </div> */}
        <div className='qqq d-flex justify-content-between align-items-center p-3 bg-primary text-light' style={{width:'100%'}}>
   <div><h6 ><TextAnnimation text={'LIST ACCOUNT'}/></h6></div>
   <div className='input-container mt-1'>  <input onChange={handleSearch}   name='query' type='text' placeholder='FULL NAME' className='form-control' style={{width:"100%" }} /></div>
   </div>
  
          <Table  columns={columns} dataSource={_data} />
   
       
        </div>
        
  </>
    )
}

export default ListUser
