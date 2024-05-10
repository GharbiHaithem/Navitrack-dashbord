import React, { useEffect, useState } from 'react'
import TextAnnimation from '../TextAnnimatioon';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteCar, getCars } from '../../features/vehiculeSlice';
import { Table } from 'antd';
import { companies, deletecompanie } from '../../features/companieSlice';
import { searchClient } from '../../features/companieSlice';
import './style.css'
import { generateFactures } from '../../features/factureSlice';
import { allusers as fnusers} from '../../features/authSlice';

const columns = [
    {
        title: 'Key',
        dataIndex: 'key',
    },
    {
        title: 'raisonSociale',
        dataIndex: 'raisonSociale',
    },
    {
        title: 'matriculeSociale',
        dataIndex: 'matriculeSociale',
    },
    {
        title: 'siegeSociale',
        dataIndex: 'siegeSociale',
    },
    {
        title:'email',
        dataIndex:'email'
    },
    {
        title:'telephone',
        dataIndex : 'telephone'
    },
    {
        title:"secteurActivite",
        dataIndex : 'secteurActivite'
    },
    {
        title:"Represantant",
        dataIndex:"represantant"
    },
    {
        title :"nombre vehicules",
        dataIndex:"nbVehicule"
    },
    {
        title:"reglement",
        dataIndex :"reglement"
    },
    {
        title:"Action",
        dataIndex : 'Actions'
    }
];


const ListCompany = ({setShowModal,showModal,openMenu}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[query,setQuery] = useState(null)
useEffect(()=>{
    dispatch(getCars())
},[dispatch])
  console.log(query)
    useEffect(()=>{
       dispatch(companies())
    },[dispatch])
    const {companie} = useSelector(state => state?.companie)
    const {vehicule,isLoading} = useSelector(state => state?.car)
    const companiestate = useSelector(state => state?.companie)
    const{allUsers}= useSelector(state=>state?.auth)
    const handleSearch =(e)=>{
        setQuery((e.target.value))
        dispatch(searchClient(query))
    }
  
    const updateShowModal = (name, status , data) => {
        // Créez une nouvelle copie de l'objet showModal avec la mise à jour
        const updatedShowModal = { ...showModal, name , status ,data };
    
        // Mettez à jour la state avec le nouvel objet
        setShowModal(updatedShowModal);
    };
    useEffect(()=>{
    if(query?.length > 0){
        dispatch(searchClient(query))
    }else{
        dispatch(companies())
    }
   
    },[dispatch,query])
  
    const[nbVehicules,setNbVehicules] = useState([])
   useEffect(()=>{
    dispatch(fnusers())
   },[])

    const represantantFn = (idcompany) => {
        return allUsers
            ?.filter((c) => c?.client === idcompany)
            ?.map((user) => user?.firstname + " " + user?.lastname);
    }

    console.log(companiestate)
    useEffect(() => {
        const updatedNbVehicules = [];
    
        for(var i = 0; i < companiestate?.companie?.length; i++) {
          
            const vehiculefilter = vehicule?.length>0 && vehicule?.filter((v) => v?.client?.id === companiestate?.companie[i]?.id).length;
            updatedNbVehicules.push(vehiculefilter);
        }
    
        setNbVehicules(updatedNbVehicules);
    }, [companiestate, vehicule]);
    console.log(nbVehicules)
    
    const _data = [];
   
   for (let i = 0; i < companie?.length; i++) {

    // let desc = (allUsers[i]?.description).slice(0,250) + "..." 
           _data.push({
            key: i + 1,
            raisonSociale:!companiestate?.isLoading&& companie[i]?.raisonSociale ,
            matriculeSociale: !companiestate?.isLoading&&companie[i]?.matriculeSociale, 
            siegeSociale:!companiestate?.isLoading&&(companie[i]?.siegeSociale),
            email :!companiestate?.isLoading&& companie[i]?.email, 
            telephone:!companiestate?.isLoading&&companie[i]?.telephone,
            secteurActivite:!companiestate?.isLoading&&companie[i]?.secteurActivite,
            represantant:<span style={{textDecoration:"underline" ,cursor:"pointer" }} className='text-primary '>{
              allUsers&&  represantantFn(companie[i]?.id)
            }</span>,
            nbVehicule:isLoading ? "..."   :<span onClick={()=>updateShowModal('listVehicule' , true , companie[i]?.id)}   style={{textDecoration:"underline" ,cursor:"pointer" }} className='text-primary ' >{(nbVehicules[i])}</span>,
            reglement:<span onClick={()=>{updateShowModal('listFacture' , true , companie[i]?.id)
          
        }} style={{textDecoration:"underline" ,cursor:"pointer" }} className='text-primary '>List Factures</span>,
            Actions:<div className='d-flex'><button style={{
                backgroundImage:' linear-gradient(to right ,rgba(224, 220, 15, 0.897),rgba(244, 228, 138, 0.697))',
                fontWeight: '600',
                color: 'white',padding:'5px'
            }}  onClick={()=>navigate(`/admin/updatecompanie/${companie[i]?.id}`)}><BorderColorIcon className='fs-7' /></button><button style={{
                backgroundImage:'linear-gradient(to right ,rgba(239, 17, 17, 0.897),rgba(215, 138, 13, 0.697))',
                fontWeight: '600',
                color: 'white',
                padding:'5px'
            }} ><DeleteForeverIcon onClick={()=>dispatch(deletecompanie(companie[i]?.id))} className='fs-7 '/></button>
           
            </div>,
           
        })
    

}



  return (
    <>
    <div className={`mt-[150px] w-${openMenu?'[80%]':'[100%]'} `} style={{overflowY:"scroll"}}>
        {/* <div className='d-flex justify-content-arround align-items-center gap-30'>
            <div>
                <h3 className='my-4'>List Product</h3>
            </div>
            <div>
                <input type='text' placeholder='enter to search product' onChange={(e)=>handleSearch(e)} className='form-control p-2' />
            </div>
        </div> */}
   <div className=' d-flex justify-content-between align-items-center p-3 bg-primary text-light w-[1471px]' >
   <div><h6 ><TextAnnimation text={'LIST COMPANIE'}/></h6></div>
   <div className='input-container mt-1'>  <input onChange={handleSearch}  name='query' type='text' placeholder='Matricule Sociale' className='form-control' style={{width:"100%" }} /></div>
   </div>
      <Table className='w-[100%] float-right ' columns={columns} dataSource={_data} />

   
    </div>
    
   
</>
  )
}

export default ListCompany