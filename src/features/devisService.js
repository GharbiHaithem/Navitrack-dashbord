import axios from "axios";
export const getDevis = async(id) =>{
    const respnse = await axios.get(`https://navitrak-node-production.up.railway.app/api/devis/${id}`)
    return await respnse.data
}

const devisServices = {getDevis}
export default devisServices