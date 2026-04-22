import { Link } from "react-router-dom";


const HrActionButtons = ({ _idsOfSelectedWorkers = [] }) => {
 

    return (
        <div className="border border-gray-700 rounded-xl p-3">
            <h3 className="text-sm font-semibold text-green-400 mb-2">
                HR Actions
            </h3>

            <div className="flex flex-col ">
                <Link
                    to={'/attendance'}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium text-white transition-all bg-green-700 hover:bg-green-600 mb-1 text-center`}
                >
                    Attendance
                </Link>

                <div className="flex flex-wrap gap-2">
                    <button
                        disabled={_idsOfSelectedWorkers.length === 0}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium text-white transition-all ${_idsOfSelectedWorkers.length === 0
                            ? "bg-blue-500 opacity-50 cursor-not-allowed"
                            : "bg-blue-700 hover:bg-blue-600"
                            }`}
                    >
                        Export
                    </button>

                    <button
                        disabled={_idsOfSelectedWorkers.length === 0}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium text-white transition-all ${_idsOfSelectedWorkers.length === 0
                            ? "bg-yellow-500 opacity-50 cursor-not-allowed"
                            : "bg-yellow-700 hover:bg-yellow-600"
                            }`}
                    >
                        Transfer
                    </button>

                    <button
                        disabled={_idsOfSelectedWorkers.length === 0}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium text-white transition-all ${_idsOfSelectedWorkers.length === 0
                            ? "bg-purple-500 opacity-50 cursor-not-allowed"
                            : "bg-purple-700 hover:bg-purple-600"
                            }`}
                    >
                        Payroll
                    </button>
                </div>
            </div>

        </div>
    );
};

export default HrActionButtons;