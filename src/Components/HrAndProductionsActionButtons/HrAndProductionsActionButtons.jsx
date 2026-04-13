

const HrAndProductionsActionButtons = ({selectedWorkers,setSelectedWorkers}) => {
    
    // clear selected worker-----------
     const clearSelection = () => {
        setSelectedWorkers([]);
      };
    
    return (
        <div className="bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-2xl px-3 sm:px-4 lg:px-6 py-3 shadow-xl mt-10">
            <div className="flex flex-col gap-4">

                {/* top info section */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <p className="text-sm font-medium text-white">
                        {selectedWorkers.length} worker
                        {selectedWorkers.length !== 1 ? "s" : ""} selected
                    </p>

                    <button
                        onClick={clearSelection}
                        disabled={selectedWorkers.length === 0}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium text-white transition-all duration-200 ${selectedWorkers.length === 0
                            ? "bg-gray-600 cursor-not-allowed opacity-50"
                            : "bg-gray-700 hover:bg-gray-600"
                            }`}
                    >
                        Clear Selection
                    </button>
                </div>

                {/* action groups */}
                <div className="flex  xl:flex-row justify-between gap-4 ">

                    {/* HR actions */}
                    <div className="border border-gray-700 rounded-xl p-3">
                        <h3 className="text-sm font-semibold text-green-400 mb-2">
                            HR Actions
                        </h3>

                        <div className="flex flex-wrap gap-2">
                            <button
                                disabled={selectedWorkers.length === 0}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium text-white transition-all ${selectedWorkers.length === 0
                                    ? "bg-green-500 opacity-50 cursor-not-allowed"
                                    : "bg-green-700 hover:bg-green-600"
                                    }`}
                            >
                                Attendance
                            </button>

                            <button
                                disabled={selectedWorkers.length === 0}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium text-white transition-all ${selectedWorkers.length === 0
                                    ? "bg-blue-500 opacity-50 cursor-not-allowed"
                                    : "bg-blue-700 hover:bg-blue-600"
                                    }`}
                            >
                                Export
                            </button>

                            <button
                                disabled={selectedWorkers.length === 0}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium text-white transition-all ${selectedWorkers.length === 0
                                    ? "bg-yellow-500 opacity-50 cursor-not-allowed"
                                    : "bg-yellow-700 hover:bg-yellow-600"
                                    }`}
                            >
                                Transfer
                            </button>

                            <button
                                disabled={selectedWorkers.length === 0}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium text-white transition-all ${selectedWorkers.length === 0
                                    ? "bg-purple-500 opacity-50 cursor-not-allowed"
                                    : "bg-purple-700 hover:bg-purple-600"
                                    }`}
                            >
                                Payroll
                            </button>
                        </div>
                    </div>

                    {/* Production actions */}
                    <div className="border border-gray-700 rounded-xl p-3">
                        <h3 className="text-sm font-semibold text-indigo-400 mb-2">
                            Production Actions
                        </h3>

                        <div className="flex flex-wrap gap-2">
                            <button
                                disabled={selectedWorkers.length === 0}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium text-white transition-all ${selectedWorkers.length === 0
                                    ? "bg-indigo-500 opacity-50 cursor-not-allowed"
                                    : "bg-indigo-700 hover:bg-indigo-600"
                                    }`}
                            >
                                Assign Line
                            </button>

                            <button
                                disabled={selectedWorkers.length === 0}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium text-white transition-all ${selectedWorkers.length === 0
                                    ? "bg-pink-500 opacity-50 cursor-not-allowed"
                                    : "bg-pink-700 hover:bg-pink-600"
                                    }`}
                            >
                                Assign Order
                            </button>

                            <button
                                disabled={selectedWorkers.length === 0}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium text-white transition-all ${selectedWorkers.length === 0
                                    ? "bg-teal-500 opacity-50 cursor-not-allowed"
                                    : "bg-teal-700 hover:bg-teal-600"
                                    }`}
                            >
                                Shift
                            </button>

                            <button
                                disabled={selectedWorkers.length === 0}
                                className={`px-3 py-1.5 rounded-md text-xs font-medium text-white transition-all ${selectedWorkers.length === 0
                                    ? "bg-sky-600 opacity-50 cursor-not-allowed"
                                    : "bg-sky-800 hover:bg-sky-600"
                                    }`}
                            >
                                Supervisor
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HrAndProductionsActionButtons;