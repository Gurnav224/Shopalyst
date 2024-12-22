/* eslint-disable react/prop-types */
import { Navigate, Outlet} from "react-router-dom";
import { useAuth } from "../context/AuthContext"

const PrivateRoute = () => {
    const { user, loading } = useAuth();


    if(loading) {
        return <div>loading....</div>
    }

   

  return user ? <Outlet/> : <Navigate to="/login" />
}

export default PrivateRoute
