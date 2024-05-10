import axios from 'axios'

const base_url2 ="https://spring-api-server.onrender.com/api"
const API = axios.create({baseURL:base_url2});
API.interceptors.request.use((req)=>{
   if(localStorage.getItem('user')){
    req.headers.authorization =`Bearer ${
        JSON.parse(localStorage.getItem("user")).token
    }`
   }
   return req;
})
export const getFacture = async(id)=>{
    const response = await axios.get(`${base_url2}/factures/facture/${id}`)
    return response.data;
}
export const generateFacture = async(id)=>{
    const response = await axios.get(`${base_url2}/factures/genererMensuelle/${id}`)
    return response.data;
}
const getAllFactures = async()=>{
    const response = await axios.get(`${base_url2}/factures/`)
    return await response.data
}

const genererNewFacture = async()=>{
    const response = await axios.post(`${base_url2}/factures/genererMensuelle`)
    return await response.data
}
const factureServices = {getFacture,generateFacture,getAllFactures,genererNewFacture} 
export default factureServices
