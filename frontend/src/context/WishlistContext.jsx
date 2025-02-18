/* eslint-disable react/prop-types */
import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import api from "../services/clientAPI";
import { toast } from "react-toastify";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);





  const isProductInWishlist = (productId) => {
    return wishlist?.some((item) => {
      return item?.product?._id === productId;
    });
  };

  const handleAddToWishlist = useCallback(
    async (product, e) => {
      e.stopPropagation();
      e.preventDefault();
      const previousWishlist = [...wishlist]; // Backup current state

      try {
        toast.success("Item added to wishlist");

        const { _id } = product;

        // Check if the product is already in the wishlist
        const existingProduct = wishlist.find(
          (item) => item?.product?._id === _id
        );

        //  if existingProduct increase It's quanity
        const updatedWishlist = existingProduct
          ? wishlist.map((item) =>
              item.product._id === _id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...wishlist, { ...product, quantity: 1 }];

        setWishlist(updatedWishlist);

        // API call to update the wishlist on the server
        const response = await api.post(`/wishlist`, {
          productId: _id,
          quantity: 1,
        });
        console.log(response);

      } catch (error) {
        toast.error(
          error?.response?.data?.error || "Failed to add item to the wishlist:"
        );

        // Revert state to the previous backup
        setWishlist(previousWishlist);
      }
    },
    [wishlist]
  );

 
  const fetchWishlist = useCallback(async () => {
    try {
      const response = await api.get("/wishlist");
      setWishlist(response?.data?.wishlist?.items);

      if (response.data.message !== "get wishlist item successfully") {
        setWishlist([]);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error?.response?.data?.error);
      setWishlist([]);
    }
  }, []);

 

  const handleRemoveProductFromWishlist = async (productId) => {
    // Store the previous wishlist state
    const previousWishlist = [...wishlist];
    // Optimistically update the UI
    setWishlist((prev) =>
      prev.filter((item) => item?.product?._id !== productId)
    );
    try {
      const response = await api.delete("/wishlist", { data: { productId } });
      console.log(response);
      if (response?.status === 200) {
        toast.info("item removed from the wishlist");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          "failed to remove product from the wishlist"
      );
      setWishlist(previousWishlist);
    }
  };

 

  

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        fetchWishlist,
        handleAddToWishlist,
        handleRemoveProductFromWishlist,
        isProductInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWislist = () => useContext(WishlistContext);
