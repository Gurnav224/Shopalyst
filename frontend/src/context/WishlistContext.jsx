/* eslint-disable react/prop-types */
import {
  createContext,
  useContext,
  useCallback,
  useReducer,
} from "react";
import api from "../services/clientAPI";
import { toast } from "react-toastify";

const WishlistContext = createContext();

const initialState = {
  wishlist: [],
  loading: true,
  error: null,
  isItemInWishlist: false,
};

function wishlistReducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case "GET_WISHLIST":
      return { ...state, wishlist: action.payload, loading: false };
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item._id !== action.payload),
      };
    default:
      return state;
  }
}

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  const isProductInWishlist = (productId) => {
    return state?.wishlist?.some((item) => {
      return item?.product?._id === productId;
    });
  };

  const fetchWishlist = useCallback(async () => {
    try {
      const response = await api.get("/wishlist");
      dispatch({ type: "GET_WISHLIST", payload: response.data.wishlist.items });
    } catch (error) {
      console.error("Error fetching wishlist:", error?.response?.data);
    }
  }, []);

  const handleAddToWishlist = async (product, e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      const response = await api.post("/wishlist", { productId: product });
      dispatch({ type: "ADD_TO_WISHLIST", payload: product });

      if (response.status === 200) {
        toast.success("item add to wishlist successfully", {
          position: "top-center",
        });
      } else {
        dispatch({ type: "REMOVE_ITEM", payload: product });
        toast.error("failed to add item to the wishlist", {
          position: "top-center",
        });
      }
    } catch (error) {
      dispatch({ type: "REMOVE_ITEM", payload: product });
      console.error(error);
      toast.error("Failed to add item to the wishlist", {
        position: "top-center",
      });
    }
  };

  const handleRemoveProductFromWishlist = async (productId) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
    try {
      const response = await api.delete("/wishlist", { data: { productId } });
      if (response?.status === 200) {
        toast.info("item removed from the wishlist", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          "failed to remove product from the wishlist",
        { position: "top-center" }
      );
    }
    fetchWishlist()
  }



  return (
    <WishlistContext.Provider
      value={{
        fetchWishlist,
        handleAddToWishlist,
        handleRemoveProductFromWishlist,
        isProductInWishlist,
        state,
        dispatch,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWislist = () => useContext(WishlistContext);
