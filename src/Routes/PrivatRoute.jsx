import { useContext } from "react"
import { AuthContext } from "../Context/AuthProvider"
import { Navigate, useLocation } from "react-router-dom";

const PrivatRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();

    if(user?.email)
    {
        return children;
    }
    if(loading)
    {
        return <span className="loading loading-spinner text-primary"></span> ;
    }
  return <Navigate state={location.pathname} to='/login' replace></Navigate>
}

export default PrivatRoute