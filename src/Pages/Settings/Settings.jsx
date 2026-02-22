import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import ErrMsg from "../../SuccessAndErrMsg/ErrMsg/ErrMsg";
import UpdateOrderForm from "../../Components/UpdateOrderForm/UpdateOrderForm";



const Settings = () => {
    const axiosSecure = useAxiosSecure()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        axiosSecure.get("/api/getOrders")
            .then((res) => {
                setOrders(res.data)
            })
            .catch((err) => {
                ErrMsg(err.message)
            })
    }, [axiosSecure])

    // Running order---------

    const runningOrder = orders.filter((order) => {
        return order?.tna?.shipment?.status !== "completed"
    })

    return (
        <div className="p-1    ">
            {
                runningOrder.length === 0 ? (
                    <p>No runningOrder available</p>
                ) : (
                    runningOrder.map((order) =>(
                        <UpdateOrderForm
                             key={order._id}
                            order={order}
                        ></UpdateOrderForm>
                    ))
                )
            }

        </div>
    );
};

export default Settings;