import { Plus, ChevronDown, ChevronUp, Info } from "lucide-react";
import MaterialStatus from "../../Components/MaterialStatus/MaterialStatus";
import SampleTracking from "../../Components/SampleTracking/SampleTracking";
import ShipmentRiskTable from "../../Components/ShipmentRiskTable/ShipmentRiskTable";
import TNAProgress from "../../Components/TNAProgress/TNAProgress";
import TopSummaryWidgets from "../../Components/TopSummaryWidgets/TopSummaryWidgets";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";

const Merchandise = () => {
    const axiosSecure = useAxiosSecure();
    const [orders, setOrders] = useState([]);
    const [expandedOrders, setExpandedOrders] = useState({});

    useEffect(() => {
        axiosSecure.get("/api/getOrders").then((res) => setOrders(res.data));
    }, [axiosSecure]);

    const runningOrders = orders.filter(
        (order) => order?.tna?.shipment?.status !== "completed"
    );

    const toggleExpand = (orderId) => {
        setExpandedOrders((prev) => ({
            ...prev,
            [orderId]: !prev[orderId],
        }));
    };

    const calculateProgress = (order) => {
        const planned = order.tna?.shipment?.plannedQty || 1;
        const actual = order.tna?.shipment?.actualQty || 0;
        return Math.min(Math.floor((actual / planned) * 100), 100);
    };

    const calculateDelayDays = (order) => {
        if (!order.exFactoryDate) return 0;
        const today = new Date();
        const exFactory = new Date(order.exFactoryDate);
        const diff = Math.ceil((today - exFactory) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 0;
    };

    const getProgressColor = (progress) => {
        if (progress < 50) return "bg-red-500";
        if (progress < 100) return "bg-yellow-500";
        return "bg-green-500";
    };

    return (
        <div className="p-3 md:p-4 min-h-screen text-slate-100 space-y-4">
            {/* Header */}
            <div className="flex justify-between mt-18 bg-linear-to-r from-indigo-900 to-blue-800 py-5 rounded-t-2xl px-4">
                <h2 className="text-white text-xl font-semibold">Merchandising Management</h2>
                <Link
                    to={"/createOrder"}
                    className="btn btn-primary flex items-center gap-2 shadow-md hover:shadow-lg bg-purple-700"
                >
                    <Plus className="w-7 h-7" /> Create New Order
                </Link>
            </div>

            {/* Top Summary Widgets */}
            <TopSummaryWidgets runningOrder={runningOrders} />

            {/* Running Orders Cards */}
            <div className="space-y-4">
                {runningOrders.map((order) => {
                    const isExpanded = expandedOrders[order._id];
                    const progress = calculateProgress(order);
                    const delayDays = calculateDelayDays(order);
                    const progressColor = getProgressColor(progress);

                    return (
                        <div
                            key={order._id}
                            className="bg-slate-800 rounded-2xl shadow-md overflow-hidden transition-all duration-300"
                        >
                            {/* Order Header */}
                            <div
                                className="flex justify-between items-center px-4 py-3 cursor-pointer"
                                onClick={() => toggleExpand(order._id)}
                            >
                                <div className="flex-1 space-y-1">
                                    <div className="flex justify-between items-center">
                                        <div className="text-lg font-semibold">{order.styleNo} - {order.buyer}</div>
                                        {delayDays > 0 && (
                                            <div className="flex items-center gap-1 text-red-400 text-sm" title={`Delay: ${delayDays} days`}>
                                                <Info className="w-4 h-4" /> {delayDays}d delay
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-sm text-slate-300 flex items-center gap-4">
                                        <span>Qty: {order.orderQty}</span>
                                        <span>Ex-Factory: {order.exFactoryDate}</span>
                                        <span>Progress: {progress}%</span>
                                    </div>

                                    {/* Animated Progress Bar with Tooltip */}
                                    <div className="relative w-full h-3 bg-slate-700 rounded mt-1 overflow-hidden group">
                                        <div
                                            className={`h-3 rounded ${progressColor} transition-all duration-1000`}
                                            style={{ width: `${progress}%` }}
                                            title={`Planned: ${order.tna?.shipment?.plannedQty || 0}, Actual: ${order.tna?.shipment?.actualQty || 0}, Remaining: ${Math.max((order.tna?.shipment?.plannedQty || 0) - (order.tna?.shipment?.actualQty || 0), 0)}`}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 ml-4">
                                    <span
                                        className={`px-2 py-1 rounded text-sm ${order.tna?.shipment?.status === "completed"
                                                ? "bg-green-500"
                                                : order.tna?.shipment?.status === "delayed"
                                                    ? "bg-red-500"
                                                    : "bg-yellow-500"
                                            }`}
                                    >
                                        {order.tna?.shipment?.status || "Running"}
                                    </span>
                                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                </div>
                            </div>

                            {/* Expanded Section */}
                            {isExpanded && (
                                <div className="p-4 space-y-4 border-t border-slate-700 transition-all duration-300">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <TNAProgress order={order} />
                                        <MaterialStatus order={order} />
                                    </div>
                                    <SampleTracking order={order} />
                                    <ShipmentRiskTable orders={[order]} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Merchandise;