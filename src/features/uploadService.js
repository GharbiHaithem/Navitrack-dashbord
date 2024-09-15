import axios from 'axios'
const VITE_PUBLIC_URL   ="https://navitrak-node-1.onrender.com/api"

// import { config } from '../../utils/axiosConfig'

const uploadImages = async(data)=>{
  const response = await axios.post(`${VITE_PUBLIC_URL}/upload/`,data)
  console.log(response)
  return response.data
  } 
  
const deleteImages = async(id)=>{
const response = await axios.delete(`${VITE_PUBLIC_URL}/delete-img/${id}`)
console.log(id)
return response.data
}
const uploadServices = {
    uploadImages,deleteImages
}
export default uploadServices