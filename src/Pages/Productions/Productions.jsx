import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import UiOfProductionPage from "../../Components/Ui-Of-ProductionPage/UiOfProductionPage";


const Productions = () => {
    const axiosSecure = useAxiosSecure()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        axiosSecure.get("/api/getOrders")
            .then((res) => {
                setOrders(res.data)
            })
    }, [axiosSecure])

    // running/active order------------
    const runningOrder = orders.filter((order) => {
        return order?.tna?.shipment?.status !== "completed"
    })
  
    return (
        <div>
           <UiOfProductionPage runningOrder={runningOrder}></UiOfProductionPage>
        </div>
    );
};

export default Productions;