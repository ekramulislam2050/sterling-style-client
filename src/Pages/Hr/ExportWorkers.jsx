import { FiArrowLeft, FiDownload, FiFileText, FiSearch, FiUsers } from "react-icons/fi";


const ExportWorkers = () => {
    return (
        <div className="p-4 md:p-6 pt-28 min-h-screen text-white space-y-6">

            {/* Breadcrumb */}
            <div className="text-sm text-gray-400">
                All Workers / <span className="text-blue-400">Export Workers</span>
            </div>

            {/* Page Heading */}
            <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">

                <div className="flex items-center gap-4">
                    <div className="bg-blue-900/50 p-4 rounded-xl">
                        <FiFileText className="text-4xl text-blue-400" />
                    </div>

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold">
                            Export Workers
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">
                            Review selected workers before downloading.
                        </p>
                    </div>
                </div>

                <div className="bg-blue-900/40 border border-blue-700 rounded-xl px-5 py-3 flex items-center gap-3">
                    <FiUsers className="text-2xl text-blue-400" />
                    <div>
                        <p className="text-xs text-gray-400">Selected Workers</p>
                        <h3 className="text-xl font-bold">
                            {/* {workers.length} */}
                            Worker length...
                        </h3>
                    </div>
                </div>
            </div>

            {/* Worker Table */}
            <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden">

                <div className="p-4 flex flex-col sm:flex-row justify-between gap-3">
                    <h3 className="text-lg font-semibold">
                        Selected Worker Details
                    </h3>

                    <div className="relative">
                        <FiSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search worker..."
                            value={""}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input input-bordered input-sm bg-gray-800 border-gray-700 pl-9 w-full sm:w-64 text-white"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-blue-950 text-white">
                                <th>#</th>
                                <th>Worker ID</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>NID</th>
                                <th>Salary</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        {/* <tbody>
                            {filteredWorkers.map((worker, index) => (
                                <tr
                                    key={worker.workerId}
                                    className="hover:bg-gray-800"
                                >
                                    <td>{index + 1}</td>
                                    <td className="font-medium text-blue-400">
                                        {worker.workerId}
                                    </td>
                                    <td>{worker.Name}</td>
                                    <td>{worker.department}</td>
                                    <td>
                                        {worker.NID
                                            ? `******${String(worker.NID).slice(-4)}`
                                            : "N/A"}
                                    </td>
                                    <td>{worker.salary ?? "N/A"}</td>
                                    <td>
                                        <span className="badge badge-success">
                                            {worker.Status}
                                        </span>
                                    </td>
                                </tr>
                            ))}

                            {filteredWorkers.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="text-center py-10 text-gray-400">
                                        No workers found.
                                    </td>
                                </tr>
                            )}
                        </tbody> */}
                    </table>
                </div>

                <div className="p-4 text-sm text-gray-400 border-t border-gray-700">
                    {/* Showing {filteredWorkers.length} of {workers.length} workers */}
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col lg:flex-row justify-between gap-4 items-start lg:items-center">

                <div className="bg-blue-950/50 border border-blue-800 rounded-xl p-4">
                    <p className="text-sm text-blue-200">
                        <FiFileText className="inline mr-2" />
                        All selected workers' information will be
                        exported into an Excel file.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => navigate("/all-workers")}
                        className="btn bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                    >
                        <FiArrowLeft />
                        Back to All Workers
                    </button>

                    <button
                        // onClick={handleDownloadExcel}
                        // disabled={workers.length === 0}
                        className="btn bg-blue-700 border-blue-600 text-white hover:bg-blue-600 disabled:opacity-50"
                    >
                        <FiDownload />
                        Download Excel
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ExportWorkers;