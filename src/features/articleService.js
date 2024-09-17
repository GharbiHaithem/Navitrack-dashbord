import axios from 'axios'
import { base_url} from '../utils/base_url';
const base_url2 ="https://navitrak-node-production.up.railway.app/api"
const API = axios.create({baseURL:base_url2});
API.interceptors.request.use((req)=>{
   if(localStorage.getItem('customer')){
    req.headers.authorization =`Bearer ${
        JSON.parse(localStorage.getItem("customer")).token
    }`
   }
   return req;
})
export const createArticle = async(data)=>{
    const response = await axios.post(`${base_url2}/create-article`,data)
    console.log(response.data)
    return await response.data
}
export const articles = async()=>{
      const response = await axios.get(`${base_url2}/articles`)
      console.log(response.data)
      return await response.data
  }
  export const deletearticle = async(id)=>{
    const response = await axios.delete(`${base_url2}/article/${id}`)
    console.log(response.data)
    return await response.data
}
export const getOnearticle = async(id)=>{
    const response = await axios.get(`${base_url2}/article/${id}`)
    console.log(response.data)
    return await response.data
}

export const updatearticle = async(id)=>{
    const response = await axios.put(`${base_url2}/article/${id}`)
    console.log(response.data)
    return await response.data
}
const articleServices = {
    createArticle,articles,deletearticle,getOnearticle,updatearticle
}
export default articleServices