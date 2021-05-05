
import axios from 'axios'


export const createHotel = async (token,data) =>{
    const res= await axios.post(`${process.env.REACT_APP_API}/create-hotel`,data,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return res;
}
    
export const allHotels =async (token)=>{
    const res= await axios.get(`${process.env.REACT_APP_API}/hotels`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    return res;
}

export const sellerHotels = async(token) => await axios.get(`${process.env.REACT_APP_API}/seller-hotels`, {
    headers:{
        Authorization: `Bearer ${token}`,
    }
})