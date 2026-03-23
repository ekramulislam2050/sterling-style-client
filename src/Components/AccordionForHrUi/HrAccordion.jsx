import { useState } from "react";
import HrTopStats from "../HrTopStats/HrTopStats";
import HrEmployeeLIst from "../HrEmployeeList/HrEmployeeLIst";
import HrTodaysAttendance from "../HrTodaysAttendance/HrTodaysAttendance";
import HrPayrollSummary from "../HrPayrollSummary/HrPayrollSummary";
import HrPayrollTable from "../HrPayrollTable/HrPayrollTable";
import { Link } from "react-router-dom";

const HrAccordion = ({ runningOrder = [] }) => {
    const [openOrderId, setOpenOrderId] = useState(null);

    const toggle = (id) => setOpenOrderId(openOrderId === id ? null : id);

    return (
        <div className="space-y-6">
            {runningOrder.map((order) => {
                const { _id, buyer, styleNo, orderQty, exFactoryDate } = order;
                const isLate = new Date(exFactoryDate) < new Date();

                return (
                    <div
                        key={_id}
                        className={`
              relative rounded-3xl border transition-all duration-300
              ${isLate
                                ? "border-red-500/60 shadow-[0_0_30px_rgba(239,68,68,0.25)]"
                                : "border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.25)]"}
              bg-[linear-gradient(135deg,rgba(255,255,255,0.3),rgba(255,255,255,0.03))]
              before:absolute before:inset-0 before:rounded-3xl
              before:bg-linear-to-br before:from-indigo-500/30 before:via-purple-500/20 before:to-pink-500/25
              before:opacity-50 before:pointer-events-none
              backdrop-blur-3xl
              hover:scale-[1.02] hover:shadow-2xl
            `}
                    >
                        {/* Header */}
                        <button
                            onClick={() => toggle(_id)}
                            className="w-full flex justify-between items-center p-5"
                        >
                            <div className="text-left space-y-1">
                                <h2 className="text-lg font-bold text-white tracking-wide">
                                    📦 {styleNo}
                                </h2>
                                <p className="text-sm text-gray-200">
                                    {buyer} • Qty:{" "}
                                    <span className="text-white font-semibold">{orderQty}</span>
                                </p>
                                <p className="text-xs text-gray-400">
                                    Ex-Factory: {exFactoryDate}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <span
                                    className={`text-xs px-3 py-1 rounded-full font-medium ${isLate
                                        ? "bg-red-500/30 text-red-400"
                                        : "bg-green-500/30 text-green-400"
                                        }`}
                                >
                                    {isLate ? "Late" : "Running"}
                                </span>
                                <span className="text-2xl text-white">
                                    {openOrderId === _id ? "−" : "+"}
                                </span>
                            </div>
                        </button>

                        {/* Content */}
                        <div
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${openOrderId === _id ? "max-h-[1500px] p-5" : "max-h-0"
                                }`}
                        >
                            <div className="space-y-5">

                                {/* Top Stats */}
                                <div className="bg-indigo-500/10 p-5 rounded-2xl backdrop-blur-sm">
                                    <HrTopStats runningOrder={order} />
                                </div>

                                {/* Employee List */}
                                <div className="bg-green-500/10 p-5 rounded-2xl backdrop-blur-sm">
                                    <HrEmployeeLIst runningOrder={order} />
                                </div>

                                {/* Today's Attendance */}
                                <div className="bg-yellow-500/10 p-5 rounded-2xl backdrop-blur-sm">
                                    <HrTodaysAttendance runningOrder={order} />
                                </div>

                                {/* Payroll Summary */}
                                <div className="bg-blue-500/10 p-5 rounded-2xl backdrop-blur-sm">
                                    <HrPayrollSummary runningOrder={order} />
                                </div>

                                {/* Payroll Table */}
                                <div className="bg-pink-500/10 p-5 rounded-2xl backdrop-blur-sm overflow-x-auto">
                                    <HrPayrollTable runningOrder={order} />
                                </div>
                                 {/* update button */}
                                <div className="flex justify-center ">
                                        <Link to={"/settings"} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-md font-medium transition w-1/2 text-center">Update</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default HrAccordion;