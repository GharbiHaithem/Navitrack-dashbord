import axios from 'axios'
import { base_url } from '../utils/base_url';
const base_url2 ="https://navitrack-spring-production.up.railway.app/api"
const API = axios.create({baseURL:base_url2});
API.interceptors.request.use((req)=>{
   if(localStorage.getItem('customer')){
    req.headers.authorization =`Bearer ${
        JSON.parse(localStorage.getItem("customer")).token
    }`
   }
   return req;
})

const createCar = async(data) =>{
    console.log(data);
    const response = await axios.post(`${base_url2}/car/save`,data)
    console.log(response.data);
    return await response.data
}

const getCars = async() =>{
    
    const response = await axios.get(`${base_url2}/car/getAll`)
    console.log(response.data);
    return await response.data
}

const deletecar = async(id)=>{
    const response = await axios.delete(`${base_url2}/car/delete/${id}`)
    return await response.data 
} 
const getVehicule = async(id)=>{
    const response = await axios.get(`${base_url2}/car/vehicule/${id}`)
    console.log(response.data)
    return await response.data
}
const updateVehicule = async(data)=>{
    const response = await axios.put(`${base_url2}/car/edit/${data.id}`,data.cardata)
    console.log(data)
    console.log(response.data)
    return await response.data
}
const searchVehicule = async(query)=>{
    const response = await axios.get(`${base_url2}/car/search?matricule=${query}`)
    return await response.data
}
const getVehiculeCompanie = async(companieId)=>{
 const response = await axios.get(`${base_url2}/car/vehicule/companie/${companieId}`)
 return await response.data
}
const  getVehiculeClient = async(nomComplet)=>{
    const response = await axios.get(`${base_url2}/car/search1?nomComplet=${nomComplet}`)
    return await response.data
}
const vehiculeServices = {
    createCar,getCars,deletecar,getVehicule,updateVehicule,searchVehicule,getVehiculeCompanie,getVehiculeClient

}
export default vehiculeServices