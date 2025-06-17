# Shopalyst

A full-stack ecommerce application where you can view product listings, search products by title, filter products by categories and rating, view product details pages, manage your wishlist, cart, addresses, and orders.

Built with React + Tailwind CSS frontend, Express/Node.js backend, MongoDB database, and JWT-based authentication.

---

## **DEMO LINK**

[Live Demo](https://shopalyst.vercel.app/)

---

## Login

> **Guest**  
> Username: `test_user1@gmail.com`  
> Password: `test_user1`

---

## Quick Start

```
git clone https://github.com/Gurnav224/Shopalyst.git

cd  backend 
npm install
npm run dev

cd frontend 
yarn 
yarn dev
```
---
## Technologies

- React JS
- React Router
- Node.js
- Express
- MongoDB
- JWT
---

## Demo Video

Watch a walkthrough (5–7 minutes) of all major features of this app:
[Loom Video Link](https://www.loom.com/share/558def0da32a4c3c925682909e1dd20c?sid=e1015089-5f8a-4f8d-a64a-013e6398ba0d)

---

## Features

**Authentication**
- User signup and login with JWT
- Protected routes for add to cart , add to wishlist and profile
---

### Home

- Displays promotional or featured products.
- Highlights key product categories for easy navigation.
- Showcases the latest and most popular clothing items.
---
**Products List Page**

- Products List Page displays all available products.
- Users can search for products by title.
- Filtering options include category, rating, and sorting by price.
- Users can add products to their cart or wishlist directly from this

---
**Product Details Page**
- Provides additional information about the product.
- Displays product stock availability.
- Allows users to select the quantity of the product for shopping.

---


**Cart and Wishlist functionality**

- Users can move products between the cart and wishlist.
- Users can remove products from either the cart or the wishlist.


**Address and Order management**
- Users can create new Address and Order

## API Reference

### POSTMAN API [link](https://www.postman.com/navigation-astronaut-79621080/workspace/public/collection/38276720-8fa852a0-90fa-4982-ba46-d918086ee3da?action=share&creator=38276720)

### **POST	/api/signup**<br>	
create new user 

request 

```json
{
  "email":"user11@gmail.com",
  "name":"user11",
  "password":"user11@pass"
}

```

response 

```json
{
    "message": "Registered successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODUxMjkyNjdlYjM4NTMyODhlYjExNDciLCJpYXQiOjE3NTAxNDk0MTUsImV4cCI6MTc1MDIzNTgxNX0.HtqzQxWGnLlEhCfMjp6XhV6WXOr7nXj5gzIIJwhWPFU",
    "user": {
        "id": "685129267eb3853288eb1147",
        "email": "user11@gmail.com",
        "name": "user11"
    }
}
```
---

### **POST /api/login**<br>

request
```json
{
  "email":"user11@gmail.com",
  "password":"user11@pass"
}
```
response
```json
{
    "message": "Login Successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODUxMjkyNjdlYjM4NTMyODhlYjExNDciLCJpYXQiOjE3NTAxNDk2MTIsImV4cCI6MTc1MDIzNjAxMn0.LGSCUCYqoGV-h-ETgs0eXU0LElssqLZBRa4_xjpjZM4",
    "user": {
        "id": "685129267eb3853288eb1147",
        "email": "user11@gmail.com",
        "name": "user11"
    }
}
```
---

### **GET /api/products** <br>
Get all products (requires Bearer token)
response 
```json
{
    "message": "get all products",
    "products": [
        {
            "_id": "67579a39d10e1b3558a6398f",
            "name": "Classic White T-Shirt",
            "description": "A comfortable and versatile white t-shirt made from 100% organic cotton.",
            "thumbnail": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
            "images": [
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
                "https://images.unsplash.com/photo-1622445275576-721325763afe?w=800"
            ],
            "price": 24.99,
            "rating": 4,
            "category": "Tops",
            "quantity": -3,
            "brand": "EcoWear",
            "__v": 0
        },
        ]
```

### **GET /api/products/category/:categoryName**
Get products by category

```js
Example:
/api/products/category/Tops
```

### **PUT /api/products/updateQuantity/:id**
Update product quantity

```json
{
  "quantity": 6
}
```


### **GET /api/categories**
Get all categories

array of categories

### **GET /api/categories/:id**
Get all category by id
```json
Example:
/api/categories/67579a39d10e1b3558a63990
```

## 🛒 Cart

### **POST /api/cart**
Add product to cart (requires Bearer token)
```json
{
  "user": "676405743314123943caf1f6",
  "productId": "67579a3ed10e1b3558a6399d",
  "quantity": 1
}
```
### **PUT /api/cart/update**
Update cart product quantity (requires Bearer token)

request body
```json
{
  "productId": "67579a3ed10e1b3558a6399d",
  "action": "increase"
}

```

## Wishlist
### **POST /api/wishlist**
Add product to wishlist (requires Bearer token)

Request body

```json

{
  "productId": "67579a3dd10e1b3558a63995",
  "quantity": 1
}
```

### DELETE /api/wishlist
Remove product from wishlist (requires Bearer token)



## Contact
For bugs or feature requests, please reach out to chaudharyg856@gmail.com