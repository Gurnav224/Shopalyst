import { apiRequest } from './index';


export const productAPI = {
    getAllProducts:() => apiRequest("products"),
    getProductById:(productId) => apiRequest(`products/${productId}`),
    updateProductQuantity:(productId, updatedQuantity) => apiRequest(`products/updateQuanity/${productId}`, "PUT", {quantity:updatedQuantity}),
    relatedCategoryProducts:(category) => apiRequest(`products/category/${category}`)
}