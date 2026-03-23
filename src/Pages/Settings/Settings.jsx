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

    const runningOrders = orders.filter((order) => {
        return order?.tna?.shipment?.status !== "completed"
    })

    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };



    return (
        <div className="space-y-4 pt-30">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center text-cyan-400 mb-6 drop-shadow-lg">
                Update Order
            </h2>
            {runningOrders.map((order, idx) => (
                <div key={order._id} className="border border-slate-700 rounded-xl overflow-hidden">
                    {/* Header */}
                    <div
                        className="bg-slate-800 p-4 cursor-pointer flex justify-between items-center"
                        onClick={() => toggleAccordion(idx)}
                    >
                        <span className="text-white font-semibold">{order.styleNo} - {order.buyer}</span>
                        <span className="text-cyan-400">{openIndex === idx ? "▲" : "▼"}</span>
                    </div>

                    {/* Content */}
                    {openIndex === idx && (
                        <div className="p-4 bg-slate-900">
                            <UpdateOrderForm order={order} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Settings;