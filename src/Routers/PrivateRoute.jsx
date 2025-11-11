import { useContext } from "react";
import AuthContext from "../Authentication/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { loading, user } = useContext(AuthContext)
    const location = useLocation()
     
    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <p>Loading............</p>
            <div className="loading loading-spinner text-error"></div>
        </div>
    }
    if (!user) {
        return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>
    }
    return children

};

export default PrivateRoute;