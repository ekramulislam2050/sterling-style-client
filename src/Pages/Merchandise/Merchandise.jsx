import { Plus } from "lucide-react";
import MaterialStatus from "../../Components/MaterialStatus/MaterialStatus";
import OrderStyleTable from "../../Components/OrderStyleTable/OrderStyleTable";
import SampleTracking from "../../Components/SampleTracking/SampleTracking";
import ShipmentRiskTable from "../../Components/ShipmentRiskTable/ShipmentRiskTable";
import TNAProgress from "../../Components/TNAProgress/TNAProgress";
import TopSummaryWidgets from "../../Components/TopSummaryWidgets/TopSummaryWidgets";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";


const Merchandise = () => {
      const axiosSecure=useAxiosSecure()
      const [orders,setOrder]=useState([])

      useEffect(()=>{
           axiosSecure.get("/api/getOrders")
          .then((res)=>{
            console.log(res.data)
             setOrder(res.data)
          })
      },[axiosSecure])

      
    return (
        <div className="p-3 md:p-4 space-y-4   min-h-screen text-slate-100 ">
            <div className="flex justify-between mt-18 bg-linear-to-r from-indigo-900 to-blue-800 py-5 rounded-t-2xl px-2">
                <h2 className="text-[#ffffff]   text-xl font-semibold pl-2">Merchandising Management</h2>
                <Link to={"/createOrder"}
                    className="btn btn-primary flex items-center gap-2 shadow-md hover:shadow-lg bg-purple-700">
                    <Plus className="w-7 h-7" />
                    Create New Order
                </Link>
            </div>
            {/* TOP SUMMARY */}
            <TopSummaryWidgets  orders={orders}/>

            {/* ORDER + SAMPLE */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <OrderStyleTable orders={orders}/>
                <SampleTracking  orders={orders}/>
            </div>

            {/* TNA + MATERIAL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {
                    orders.map(order=><TNAProgress order={order}/>)
                }
                <MaterialStatus orders={orders}/>
            </div>

            {/* SHIPMENT RISK */}
            <ShipmentRiskTable orders={orders}/>
        </div>
    );
};

export default Merchandise;