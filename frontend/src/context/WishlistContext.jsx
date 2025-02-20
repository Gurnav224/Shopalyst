/* eslint-disable react/prop-types */
import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import api from "../services/clientAPI";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);


  const {isAuthenticated } = useAuth()


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
        
        if(isAuthenticated){

          toast.success("Item added to wishlist",{position:'top-center'});

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
          await api.post(`/wishlist`, {
          productId: _id,
          quantity: 1,
        });

        }
        else{
          toast.error('Please login to Proceed',{position:'top-center'})
        }

      } catch (error) {
        toast.error(
          error?.response?.data?.error || "Failed to add item to the wishlist:",{position:'top-center'}
        );

        // Revert state to the previous backup
        setWishlist(previousWishlist);
      }
    },
    [wishlist, isAuthenticated]
  );

 
  const fetchWishlist = useCallback(async () => {
    try {
      if(isAuthenticated){
        const response = await api.get("/wishlist");
        setWishlist(response?.data?.wishlist?.items);
      }
     
    } catch (error) {
      console.error("Error fetching wishlist:", error?.response?.data);
      setWishlist([]);
    }
  }, [isAuthenticated]);

 

  const handleRemoveProductFromWishlist = async (productId) => {
    // Store the previous wishlist state
    const previousWishlist = [...wishlist];
    // Optimistically update the UI
    setWishlist((prev) =>
      prev.filter((item) => item?.product?._id !== productId)
    );
    try {
      const response = await api.delete("/wishlist", { data: { productId } });
      if (response?.status === 200) {
        toast.info("item removed from the wishlist",{position:'top-center'});
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          "failed to remove product from the wishlist",{position:'top-center'}
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
