import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import ErrMsg from "../../SuccessAndErrMsg/ErrMsg/ErrMsg";

 

const Settings = () => {
     const axiosSecure=useAxiosSecure()
     const [order,setOrder]=useState([])
       
    useEffect(()=>{
       axiosSecure.get("/api/getOrders")
       .then((res)=>{
           setOrder(res.data)
       })
       .catch((err)=>{
           ErrMsg(err.message)
       })
    },[axiosSecure])

    return (
        <div className=" pt-40">
            <h1 className="text-white ">{JSON.stringify(order)}</h1>
        </div>
    );
};

export default Settings;