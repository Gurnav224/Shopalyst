import { apiRequest } from "./index";

export const addressAPI = {
    createAddress:(address) => apiRequest('address','POST', address) ,
    getAllAddress:() => apiRequest('address') 
}