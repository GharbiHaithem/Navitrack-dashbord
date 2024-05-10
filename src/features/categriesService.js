import axios from 'axios'
import { base_url } from '../utils/base_url';
const base_url2 ="https://spring-api-server.onrender.com/api"
const API = axios.create({baseURL:base_url2});
API.interceptors.request.use((req)=>{
   if(localStorage.getItem('customer')){
    req.headers.authorization =`Bearer ${
        JSON.parse(localStorage.getItem("customer")).token
    }`
   }
   return req;
})
export const getAllCategories = async()=>{
    const response = await axios.get(`${base_url2}/category/allcats`)
    console.log(response.data);
    return await response.data
}
export const updateStckCategory = async(data)=>{
    console.log(data);
    const response = await axios.put(`${base_url2}/category/update-stck/${data.id.id}`,{qtyStock:data.qtyStock,id:data.id.id})
    console.log(response.data);
    return await response.data
}
const categoryServices = {getAllCategories,updateStckCategory}
export default categoryServices