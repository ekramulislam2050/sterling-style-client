import { useState, useEffect } from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";

import InventorySummaryCards from "../../Components/InventorySummaryCards/InventorySummaryCards";
import InventoryMaterialTable from "../../Components/InventoryMaterialTable/InventoryMaterialTable";
import InventoryRecentReceiveTable from "../../Components/InventoryRecentReceiveTable/InventoryRecentReceiveTable";
import InventoryLowStockAlert from "../../Components/InventoryLowStockAlert/InventoryLowStockAlert";

const Inventory = () => {
    const axiosSecure = useAxiosSecure();
    const [orders, setOrders] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        axiosSecure
            .get("/api/getOrders")
            .then((res) => setOrders(res.data))
            .catch((err) => console.log(err));
    }, [axiosSecure]);

    const runningOrder = orders.filter(
        (order) => order?.tna?.shipment?.status !== "completed"
    );

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // material progress calculate
    const getMaterialProgress = (materials = []) => {
        const totalRequired = materials.reduce(
            (sum, m) => sum + (m.requiredQty || 0),
            0
        );

        const totalIssued = materials.reduce(
            (sum, m) => sum + (m.issuedQty || 0),
            0
        );

        if (!totalRequired) return 0;

        return Math.round((totalIssued / totalRequired) * 100);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-6 pt-30">

            <h1 className="text-3xl font-bold mb-8">Inventory Orders</h1>

            <div className="space-y-5">

                {runningOrder.map((order, index) => {

                    const progress = getMaterialProgress(order.materials);

                    return (
                        <div
                            key={order._id}
                            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-lg"
                        >

                            {/* Accordion Header */}
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full p-5 text-left hover:bg-white/5 transition"
                            >

                                <div className="flex justify-between items-center">

                                    {/* Left info */}
                                    <div>

                                        <h2 className="text-lg font-semibold">
                                            {order.buyer} • {order.styleNo}
                                        </h2>

                                        <div className="flex gap-4 text-sm text-gray-400 mt-1">

                                            <span>Qty: {order.orderQty}</span>

                                            <span>
                                                Ship: {order?.tna?.shipment?.plannedDate || "N/A"}
                                            </span>

                                        </div>

                                    </div>

                                    {/* Right progress */}
                                    <div className="text-right">

                                        <p className="text-sm text-gray-400">
                                            Material Ready
                                        </p>

                                        <p className="font-semibold">
                                            {progress}%
                                        </p>

                                    </div>

                                </div>

                                {/* Progress bar */}
                                <div className="mt-3 w-full h-2 bg-white/10 rounded">

                                    <div
                                        className={`h-2 rounded 
                      ${progress > 80 ? "bg-green-500"
                                                : progress > 40 ? "bg-yellow-500"
                                                    : "bg-red-500"}`}
                                        style={{ width: `${progress}%` }}
                                    />

                                </div>

                            </button>

                            {/* Accordion Body */}
                            <div
                                className={`transition-all duration-500 ease-in-out 
                ${openIndex === index ? "max-h-[2000px]" : "max-h-0"} 
                overflow-hidden`}
                            >

                                <div className="border-t border-white/10 p-6 space-y-6">

                                    <InventorySummaryCards order={order} />

                                    <InventoryMaterialTable materials={order.materials} />

                                    <div className="grid lg:grid-cols-2 gap-6">

                                        <InventoryRecentReceiveTable order={order} />

                                        <InventoryLowStockAlert materials={order.materials} />

                                    </div>

                                </div>

                            </div>

                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default Inventory;