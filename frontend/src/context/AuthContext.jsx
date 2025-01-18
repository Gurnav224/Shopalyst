/* eslint-disable react/prop-types */
import { useEffect , useContext , useState, createContext } from "react";
import {toast} from "react-toastify"

const apiUrl = import.meta.env.VITE_API_URL_VERCEL;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));

    

    if (token && userData) {
      setUser(userData);
    }

      setLoading(false);
    
  }, []);

  const signup = async (name, email, password) => {
   try {
       const response = await fetch(`${apiUrl}/signup`,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({name, email, password})
       });


       const data = await response.json();

       console.log(' data',data)

       if(!response.ok){
        throw new Error(data.error)
       }

       return data;

   } catch (error) {
    console.error('error to signup ',error)
    throw error
   }
  }

  const login = async (email, password) => {
    try {
      console.log(apiUrl)
      const response = await fetch(`${apiUrl}/login`,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email, password})
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error);
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      console.log(data);

      setTimeout(() => {

        window.location.reload()
      },0)
      return data;
    } catch (error) {
      console.error("failed to login", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast('user logout successfully ')
    setUser(null)
  }

  const value = {
    loading,
    user,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be in AuthProvider");
  }
  return context;
};
