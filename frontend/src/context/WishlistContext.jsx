/* eslint-disable react/prop-types */
import { createContext, useContext, useState , useCallback, useEffect} from "react";
import api from "../services/clientAPI";
import { toast } from "react-toastify";
import { wishlistAPI } from "../api/wishlist";


const WishlistContext = createContext();


export const WishlistProvider = ({children}) => {
     const [wishlist, setWishlist] = useState([]);

         const fetchWishlist = useCallback(async () => {
            try {
              const response = await api.get('/wishlist');
              setWishlist(response?.data?.wishlist?.items);

              if(response.data.message !== 'get wishlist item successfully'){
                setWishlist([])
              }
             
            } catch (error) {
              console.error("Error fetching wishlist:", error?.response?.data?.error);
              setWishlist([]);
            }
          }, []);

          useEffect(() => {
            fetchWishlist()
          },[fetchWishlist])

          
          const isProductInWishlist = (productId) => {
            return wishlist?.some((item) => {
              return item?.product?._id === productId;
            });
          };
        
          const handleAddToWishlist = async (product, e) => {
            e.stopPropagation();
            e.preventDefault();
            toast.success("Item added to wishlist");
        
            const { _id } = product;
            const previousWishlist = [...wishlist]; // Backup current state
        
        
            // Check if the product is already in the wishlist
            const existingProduct = wishlist.find((item) => item?.product?._id === _id);
        
            // Create updated wishlist state
            const updatedWishlist = existingProduct
              ? wishlist.map((item) =>
                  item.product._id === _id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                )
              : [...wishlist, { ...product, quantity: 1 }];
        
            setWishlist(updatedWishlist);
        
            try {
              // API call to update the wishlist on the server
              const response = await wishlistAPI.addToWishlist(_id, 1);
              await fetchWishlist();
                
              // Validate the API response
              if (!response || response.message !== "Product added to wishlist") {
                throw new Error(response?.message || "Unknown server error");
              }
            } catch (error) {
              console.error("Failed to add item to the wishlist:", error);
        
              // Revert state to the previous backup
              setWishlist(previousWishlist);
            }
          };
        
          const handleRemoveProductFromWishlist = async (productId) => {
        
            // Store the previous wishlist state
            const previousWishlist = [...wishlist];
            toast.info("item removed from the wishlist");

        
            // Optimistically update the UI
            setWishlist((prev) =>
              prev.filter((item) => item?.product?._id !== productId)
            );

        
            try {
              // Make the API call
              const response = await wishlistAPI.removeFromWishlist(productId);
        
              // If the API call fails, revert the state
              if (response.message !== "product remove the wishlist") {
                console.error("Failed to remove item from wishlist");
                setWishlist(previousWishlist); // Revert to the old state
              }
            } catch (error) {
              // On error, revert the state
              console.error("Error removing item from wishlist:", error);
              setWishlist(previousWishlist);
            }
          };



    return(
        <WishlistContext.Provider value={{wishlist, fetchWishlist , handleAddToWishlist, handleRemoveProductFromWishlist, isProductInWishlist}}>
            {children}
        </WishlistContext.Provider>
    )
}



export const useWislist = () =>  useContext(WishlistContext);
