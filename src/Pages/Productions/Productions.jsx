import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import UiOfProductionPage from "../../Components/Ui-Of-ProductionPage/UiOfProductionPage";


const Productions = () => {
    const axiosSecure = useAxiosSecure();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axiosSecure.get("/api/getOrders")
            .then((res) => setOrders(res.data))
            .catch((err) => console.log(err));
    }, [axiosSecure]);

    const runningOrder = orders.filter(
        (order) => order?.tna?.shipment?.status !== "completed"
    );

    return (
        <div>
            <UiOfProductionPage
                runningOrder={runningOrder}
                orders={orders}
                setOrders={setOrders}
                axiosSecure={axiosSecure}
            />
        </div>
    );
};

export default Productions