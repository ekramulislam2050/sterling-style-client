import { useState } from "react";
import BasicOrderInfo from "../BasicOrderInfo/BasicOrderInfo";
import ProductionProgress from "../ProductionProgress/ProductionProgress";
import StageWiseStatus from "../StageWiseStatus/StageWiseStatus";
import { ChevronDown, ChevronRight } from "lucide-react";

const UiOfProductionPage = ({ runningOrder = [] }) => {

    const [openId, setOpenId] = useState(null);

    const toggleAccordion = (id) => {
        setOpenId(openId === id ? null : id);
    };

    const calculateProgress = (production) => {
        const total = Object.keys(production || {}).length;

        const completed = Object.values(production || {}).filter(
            (stage) => stage.status === "Completed"
        ).length;

        return total === 0 ? 0 : Math.floor((completed / total) * 100);
    };

    return (
        <div className="p-6 min-h-screen pt-30">

            <h1 className="text-2xl font-bold mb-6">
                Production Dashboard
            </h1>

            {runningOrder.length === 0 && (
                <p className="text-gray-500">No Running Orders</p>
            )}

            <div className="space-y-4">

                {runningOrder.map((order) => {

                    const progress = calculateProgress(order?.tna?.production);

                    return (
                        <div
                            key={order._id}
                            className="bg-slate-800 rounded-xl shadow hover:shadow-lg transition"
                        >

                            {/* Accordion Header */}

                            <div
                                onClick={() => toggleAccordion(order._id)}
                                className="cursor-pointer p-4"
                            >

                                <div className="flex justify-between items-center">

                                    <div>
                                        <h2 className="font-semibold text-lg">
                                            {order.buyer} | {order.styleNo}
                                        </h2>

                                        <p className="text-sm opacity-70">
                                            Order Qty : {order.orderQty}
                                        </p>
                                    </div>

                                    {/* Icon */}

                                    <div className="flex items-center gap-3">

                                        <span className="text-sm font-semibold">
                                            {progress}%
                                        </span>

                                        {openId === order._id
                                            ? <ChevronDown size={20} />
                                            : <ChevronRight size={20} />
                                        }

                                    </div>

                                </div>

                                {/* Progress Bar */}

                                <div className="mt-3">

                                    <div className="w-full bg-gray-200 rounded-full h-2">

                                        <div
                                            className="bg-green-500 h-2 rounded-full transition-all"
                                            style={{ width: `${progress}%` }}
                                        />

                                    </div>

                                </div>

                            </div>

                            {/* Accordion Body */}

                            {openId === order._id && (

                                <div className="border-t p-4 space-y-4">

                                    <BasicOrderInfo order={order} />

                                    <ProductionProgress progress={progress} />

                                    <StageWiseStatus
                                        production={order?.tna?.production}
                                        viewOnly={true}
                                    />

                                </div>

                            )}

                        </div>
                    );
                })}

            </div>
        </div>
    );
};

export default UiOfProductionPage;