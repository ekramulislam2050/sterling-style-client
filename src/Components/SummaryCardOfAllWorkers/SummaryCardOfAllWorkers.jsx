import {
    FiUsers,
    FiCheckCircle,
    FiClock,
    FiGrid,
} from "react-icons/fi";

const SummaryCardOfAllWorkers = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Workers */}
            <div className="flex items-center justify-between rounded-2xl p-5 bg-blue-900   shadow-sm hover:shadow-md transition">
                <div>
                    <p className="text-sm text-gray-300">Total Workers</p>
                    <h2 className="text-2xl font-bold text-gray-300">128</h2>
                </div>
                <div className="p-3 rounded-xl bg-blue-800">
                    <FiUsers className="text-2xl text-blue-600" />
                </div>
            </div>

            {/* Present Today */}
            <div className="flex items-center justify-between rounded-2xl p-5 bg-green-900   shadow-sm hover:shadow-md transition">
                <div>
                    <p className="text-sm text-gray-300">Present Today</p>
                    <h2 className="text-2xl font-bold text-gray-300">96</h2>
                </div>
                <div className="p-3 rounded-xl bg-green-800">
                    <FiCheckCircle className="text-2xl text-green-600" />
                </div>
            </div>

            {/* On Leave */}
            <div className="flex items-center justify-between rounded-2xl p-5 bg-yellow-900  shadow-sm hover:shadow-md transition">
                <div>
                    <p className="text-sm text-gray-300">On Leave</p>
                    <h2 className="text-2xl font-bold text-gray-300">7</h2>
                </div>
                <div className="p-3 rounded-xl bg-yellow-800">
                    <FiClock className="text-2xl text-yellow-600" />
                </div>
            </div>

            {/* Departments */}
            <div className="flex items-center justify-between rounded-2xl p-5 bg-purple-900   shadow-sm hover:shadow-md transition">
                <div>
                    <p className="text-sm text-gray-300">Departments</p>
                    <h2 className="text-2xl font-bold text-gray-300">8</h2>
                </div>
                <div className="p-3 rounded-xl bg-purple-800">
                    <FiGrid className="text-2xl text-purple-600" />
                </div>
            </div>
        </div>
    );
};

export default SummaryCardOfAllWorkers;