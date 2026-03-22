import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import ErrMsg from "../../SuccessAndErrMsg/ErrMsg/ErrMsg";
import HrAccordion from "../../Components/AccordionForHrUi/HrAccordion";

 

const Hr = () => {
    const axiosSecure=useAxiosSecure()
    const [orders,setOrders]=useState([])
 
    useEffect(()=>{
        axiosSecure.get("/api/getOrders")
        .then((res)=>setOrders(res.data ))
        .catch((err)=>ErrMsg(err.message))
    },[axiosSecure])

     const runningOrder = orders.filter(
        (order) => order?.tna?.shipment?.status !== "completed"
    );
 
    return (
        <div className="pt-30">
              <HrAccordion runningOrder={runningOrder}></HrAccordion>
        </div>
    );
};

export default Hr;