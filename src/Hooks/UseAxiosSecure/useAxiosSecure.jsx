import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Authentication/AuthContext/AuthContext";


export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000"
})
const useAxiosSecure = () => {
     const{logOut}=useContext(AuthContext)
     const navigate=useNavigate()
    useEffect(() => {
        // Add a request interceptor
        const requestInterceptor=axiosInstance.interceptors.request.use(function (config) {
            
            const token=localStorage.getItem("access-token")
             if(token){
                config.headers.Authorization=`Bearer ${token}`
             }
            return config;
        }, function (error) {

            return Promise.reject(error);
        },
            
        );

        // Add a response interceptor
        const responseInterceptor=axiosInstance.interceptors.response.use(function onFulfilled(response) {

            return response;
        }, async function onRejected(error) {
                 const status=error?.response?.status
                 if(status === 401 || status === 403){
                      await logOut()
                      navigate("/login")
                 }
            return Promise.reject(error);
        });

        return(()=>{
            axiosInstance.interceptors.request.eject(requestInterceptor)
            axiosInstance.interceptors.response.eject(responseInterceptor)
        })

    }, [logOut,navigate])
    return axiosInstance
};

export default useAxiosSecure;