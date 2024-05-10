import axios  from "axios";
export const getAllNotif= async()=>{
const response = await axios.get(`http://localhost:3333/api/notifications`)
return await response.data
}
const notificationServices ={getAllNotif}
export default notificationServices 