import axios from 'axios'
import { base_url} from '../utils/base_url';
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
export const createAppareil = async(data)=>{
    const response = await axios.post(`${base_url2}/appareil/save`,data)
    console.log(response.data)
    return await response.data
}
export const getAppareils = async()=>{
    const response = await axios.get(`${base_url2}/appareil/withCategories`)
    return await response.data
}
export const archiveAppareil = async(id)=>{
  const response = await axios.delete(`${base_url2}/appareil/delete/${id}`)
  return await response.data
}
export const searchAppareil = async(query)=>{
    const response  = await axios.get(`${base_url2}/appareil/search?query=${query}`)
    return await response.data
}
export const updateQtyAppareil = async (data)=>{
    console.log(data);
const response = await axios.put(`${base_url2}/appareil/update/quantity/${data.id}`,{qtyStock:data.qtyStock})
return await response.data
}
export const appareilone = async (id)=>{
    console.log(id);
const response = await axios.get(`${base_url2}/appareil/${id}`)
return await response.data
}

const appareilsServices = {
    createAppareil,getAppareils,archiveAppareil,searchAppareil,updateQtyAppareil,appareilone
}
export default appareilsServices