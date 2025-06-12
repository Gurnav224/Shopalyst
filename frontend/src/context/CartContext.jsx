/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../services/clientAPI";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { isAuthenticated } = useAuth();

  const fetchCart = useCallback(async () => {
    try {
      if (isAuthenticated) {
        const response = await api.get("/cart");
        setCart(response?.data?.cart?.items);
      }
    } catch (error) {
      console.error('failed to fetch cart', error?.response?.data);
    }
  }, [isAuthenticated]);

  const handleAddToCart = async (product, e) => {
    // Stop event propagation to prevent link navigation
    e.stopPropagation();
    e.preventDefault();
    //exiting product cart ;

    const { _id: productId } = product;

    try {
      if (isAuthenticated) {
        toast.success("Item added to cart", { position: "bottom-right" });

        const response = await api.post("/cart", { productId });

        setCart(response?.data?.cart?.items);
      } else {
        toast.error("Please login to proceed", { position: "bottom-right" });
      }
    } catch (error) {
      console.error("failed to add to cart", error?.response?.data?.error);
      toast.error("failed to add item to cart", { position: "bottom-right" });
    }
  };

  const removeItemFromCart = async (productId) => {
    // console.log('Item to removed from the cart',productId);

    const previousCartList = [...cart];

    setCart((prev) => prev.filter((item) => item.product._id !== productId));

    try {
      toast.info("Item removed from cart successfully",{position:'bottom-right'});

      const response = await api.delete(`/cart`, { data: { productId } });
      if (
        response?.data?.message !== "item from remove from cart successfully"
      ) {
        toast.error("failed to remove item from the cart",{position:'bottom-right'});
        setCart(previousCartList);
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "failed to remove product",{position:'bottom-right'});

      setCart(previousCartList);
    }
  };

  const isProductInCart = (productId) => {
    return cart?.some((item) => item?.product?._id === productId);
  };

  const updateQuantity = async (product, action) => {
    const productId = product.product._id;
    const existingProduct = cart.find((item) => item._id === product._id);

    const updatedCartList = existingProduct
      ? cart?.map((item) => {
          return item.product._id === product.product._id
            ? action === "increase"
              ? { ...item, quantity: item.quantity + 1 }
              : { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item;
        })
      : [...cart, { ...product, quantity: 1 }];

    try {
      setCart(updatedCartList);

      await api.put("/cart/update", { productId, action });
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "failed to update item quantity",{position:'bottom-right'}
      );
    }
  };

  useEffect(() => {
    if(cart.length > 0){

      fetchCart();
    }
  }, [cart.length, fetchCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        handleAddToCart,
        fetchCart,
        removeItemFromCart,
        isProductInCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
