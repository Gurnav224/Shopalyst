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

### **GET	/api/products**<br>	 
List all products<br>	 
Sample Response:<br>
```[{ _id, title, summary, ... }, …]```

### **GET	/api/products/:id**<br>	 	
Get details for one product<br>		
Sample Response:<br>
```{ _id, title, , ... }```


### **POST	/api/products**<br> 	
Create a new product (protected)<br>	
Sample Response:<br>
```{ _id, title, summary, ... }```

### **POST	/api/login**<br>  	
login a existing user <br> 	 
Sample Response:<br> 
```{ userId, token }```

## Contact
For bugs or feature requests, please reach out to chaudharyg856@gmail.com