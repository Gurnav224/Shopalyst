const baseUrl = "http://localhost:3000/api";

const api = {
  getFeaturedCategory: async () => {
    const response = await fetch(`${baseUrl}/categories`);
    return response.json();
  },
  getAllProducts: async () => {
    const response = await fetch(`${baseUrl}/products`);
    return response.json();
  },
  getProductById: async (productId) => {
    const response = await fetch(`${baseUrl}/products/${productId}`);
    return response.json();
  },
  updateProductQuantity: async (productId, updatedQuantity) => {
    const response = await fetch(
      `${baseUrl}/products/updateQuantity/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: updatedQuantity }),
      }
    );
    return response.json();
  },
  relatedCategoryProducts: async (category) => {
    const response = await fetch(`${baseUrl}/products/category/${category}`);
    return response.json()
  }
};

export default api;
