import { useEffect, useState } from "react";
import HrEmployeeLIst from "../../Components/HrEmployeeList/HrEmployeeLIst";
import HrPayrollSummary from "../../Components/HrPayrollSummary/HrPayrollSummary";
import HrTodaysAttendance from "../../Components/HrTodaysAttendance/HrTodaysAttendance";
import HrTopStats from "../../Components/HrTopStats/HrTopStats";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import ErrMsg from "../../SuccessAndErrMsg/ErrMsg/ErrMsg";

 

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
    console.log("runningOrder====",runningOrder)
    return (
        <div className="pt-30">
             <HrTopStats></HrTopStats>
             <HrEmployeeLIst></HrEmployeeLIst>
             <HrTodaysAttendance></HrTodaysAttendance>
             <HrPayrollSummary></HrPayrollSummary>
        </div>
    );
};

export default Hr;