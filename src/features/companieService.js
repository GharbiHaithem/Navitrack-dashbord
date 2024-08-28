import axios from 'axios'
import { base_url } from '../utils/base_url';
const base_url2 ="https://navitrack-spring.onrender.com/api"
const API = axios.create({baseURL:base_url2});
API.interceptors.request.use((req)=>{
   if(localStorage.getItem('customer')){
    req.headers.authorization =`Bearer ${
        JSON.parse(localStorage.getItem("customer")).token
    }`
   }
   return req;
})
const companie = async(id)=>{
    console.log(id)
    const response = await axios.get(`${base_url2}/client/${id}`)
  
    return await response.data
   }
export const companies = async()=>{
    const response = await axios.get(`${base_url2}/client/clients`)
    return await response.data 
}
export const createClient = async(dataClient)=>{
    const response = await axios.post(`${base_url2}/client/save`,dataClient)
    return await response.data
}
const searchClient = async(query)=>{
    const response = await axios.get(`${base_url2}/client/search?query=${query}`)
    return await response.data
   }
 
   const editcompanie = async(data)=>{
    console.log(data);
    const response = await axios.put(`${base_url2}/client/updateClient/${data.id}`,data.clientData)
    return await response.data
   } 

   const deleteArchiveCompanie = async(id)=>{
    const response = await axios.delete(`${base_url2}/client/delete/${id}`)
    return await response.data
   }
const companieServices = {companies,createClient,searchClient,companie,editcompanie,deleteArchiveCompanie}
export default  companieServices 