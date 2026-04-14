

const ProductionActionButtons = ({selectedWorkers=[]}) => {
    return (
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
    );
};

export default ProductionActionButtons;