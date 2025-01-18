import {  apiRequest } from "./index";

export const cartAPI = {
    addToCart: (productId, quantity) => apiRequest("cart","POST", {productId, quantity}),
    fetchCart:() => apiRequest('cart'),
    removeItemFromCart:(productId) => apiRequest(`cart`,"DELETE", {productId}),
    updateCartItemQuanity:(productId, action) => apiRequest("cart/update", "PUT", {productId, action}) 
}