import { apiRequest } from './index';


export const wishlistAPI = {
    addToWishlist:(productId , quantity) => apiRequest('wishlist', 'POST', {productId, quantity} ),
    getItemFromWishlist:() => apiRequest('wishlist'),
    removeFromWishlist:(productId) => apiRequest("wishlist", "DELETE", {productId})
}