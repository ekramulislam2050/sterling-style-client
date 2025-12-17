import { Package, Clock, PauseCircle, CheckCircle } from "lucide-react";
import QcRejected from "../QcRejected/QcRejected";

const OrderStatusSummary = () => {
    const orders = [
        { id: 1, status: "Running", count: 28, icon: Package, gradient: "from-green-400 to-green-600" },
        { id: 2, status: "Pending", count: 15, icon: Clock, gradient: "from-yellow-400 to-yellow-600" },
        { id: 3, status: "On Hold", count: 7, icon: PauseCircle, gradient: "from-orange-400 to-orange-600" },
        { id: 4, status: "Complete", count: 42, icon: CheckCircle, gradient: "from-blue-400 to-blue-600" },
    ];
    return (
        <div className="flex flex-col items-center w-full ">
             <h2 className=" my-3 text-red-400 ">  Order Status Summary</h2>
            <div className="p-6    bg-linear-to-br to-red-900 via-green-900 from-indigo-900 rounded-2xl lg:h-[520px] w-full">
                
                <div className="grid lg:grid-cols-4 gap-6 grid-cols-2">
                    {orders.map((order) => {
                        const IconComponent = order.icon;
                        return (
                            <div
                                key={order.id}
                                className={`p-6 rounded-2xl text-white font-semibold text-center shadow-xl transform hover:scale-105 transition-transform bg-linear-to-r ${order.gradient}`}
                            >
                                <IconComponent className="mx-auto mb-2" size={36} />
                                <p className="text-lg  flex justify-center">{order.status}</p>
                                <p className="text-2xl font-bold mt-1">{order.count}</p>
                            </div>
                        );
                    })}
                </div>

                {/* QC rejected status------------------ */}
                <div className="mt-5">
                      <QcRejected></QcRejected>
                </div>
            </div>

        </div>
    );
};

export default OrderStatusSummary;