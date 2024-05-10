import axios from "axios";
export const getDevis = async(id) =>{
    const respnse = await axios.get(`http://localhost:3333/api/devis/${id}`)
    return await respnse.data
}
const devisServices = {getDevis}
export default devisServices