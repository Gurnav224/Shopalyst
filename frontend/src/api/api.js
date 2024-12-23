const baseUrl = "http://localhost:3000/api";

const token = localStorage.getItem("token");

const api = {
  getFeaturedCategory: async () => {
    const response = await fetch(`${baseUrl}/categories`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.json();
  },
  getAllProducts: async () => {
    const response = await fetch(`${baseUrl}/products`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.json();
  },
  getProductById: async (productId) => {
    const response = await fetch(`${baseUrl}/products/${productId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.json();
  },
  updateProductQuantity: async (productId, updatedQuantity) => {
    const response = await fetch(
      `${baseUrl}/products/updateQuantity/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ quantity: updatedQuantity }),
      }
    );
    return response.json();
  },
  relatedCategoryProducts: async (category) => {
    const response = await fetch(`${baseUrl}/products/category/${category}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.json();
  },

  /*
   Wishlist API
  */

  AddToWishlist: async (productId, quantity) => {
    const response = await fetch(`${baseUrl}/wishlist`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
    });
    return response.json();
  },
  getItemFromWishlist: async () => {
    const response = await fetch(`${baseUrl}/wishlist`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.json();
  },
  removeFromWishlist: async (productId) => {
    const response = await fetch(`${baseUrl}/wishlist`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ productId }),
    });
    return response.json();
  },

  /*
   Cart API
  */

  addTOCart: async (productId, quantity) => {
    const response = await fetch(`${baseUrl}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ productId, quantity }),
    });
    return response.json();
  },

  fetchCart: async () => {
    const response = await fetch(`${baseUrl}/cart`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.json();
  },
  removeItemFromCart: async (productId) => {
    const response = await fetch(`${baseUrl}/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ productId }),
    });

    return response.json();
  },

  updateCartItemQuantity: async  (productId, action) => {
    const response = await fetch(`${baseUrl}/cart/update`, {
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        Authorization:"Bearer "+ token
      },
      body:JSON.stringify({productId, action})
    });
    return response.json()
  }
};

export default api;
