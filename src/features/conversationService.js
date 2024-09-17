import axios from 'axios'
import { base_url } from '../utils/base_url';
const base_url2 ="http://navitrack-spring-production.up.railway.app/api"
const API = axios.create({baseURL:base_url2});
API.interceptors.request.use((req)=>{
   if(localStorage.getItem('customer')){
    req.headers.authorization =`Bearer ${
        JSON.parse(localStorage.getItem("customer")).token
    }`
   }
   return req;
})
export const conversations = async()=>{
    const response = await API.post(`${base_url}/conversations`)
    return await response.data 
}
export const allconversations = async()=>{
    const response = await API.get(`${base_url}/allconversations`)
    return await response.data 
}
export const getMessage = async(data)=>{
    console.log(data)
    const response = await API.post(`${base_url}/message`,data)
    console.log(response.data)
    return response.data;
}

export const getAllMessages = async()=>{
    
    const response = await API.get(`${base_url}/all/messages`)
    console.log(response.data)
    return response.data;
}
export const createConversation = async(data)=>{
    const response = await API.post(`/create-conversation` , data)
    return response.data
}
const conversationServices = {conversations,allconversations,getMessage,getAllMessages,createConversation}
export default  conversationServices 