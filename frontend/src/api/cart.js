import {  apiRequest } from "./index";

export const cartAPI = {
    addToCart: (productId, quantity) => apiRequest("cart","POST", {productId, quantity}),
    fetchCart:() => apiRequest('cart'),
    removeItemFromCart:(productId) => apiRequest(`cart`,"DELETE", {productId}),
    updateCartItemQuanity:(proudctId, action) => apiRequest("cart/update", "PUT", {proudctId, action}) 
}