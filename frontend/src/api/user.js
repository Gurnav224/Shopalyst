
import { apiRequest } from "./index";

export const userAPI = {
    getuser:() => apiRequest('users')
}