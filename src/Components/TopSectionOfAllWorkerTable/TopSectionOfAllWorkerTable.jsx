

const TopSectionOfAllWorkerTable = ({ total, canImport, handleImportWorkers, loadingImport, message }) => {
    return (
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div>
                <h2 className="text-2xl font-bold">All Workers</h2>
                <p className="text-gray-400 text-sm">
                    Total Workers: {total}
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <div>
                    {canImport && (
                        <button
                            onClick={handleImportWorkers}
                            disabled={loadingImport}
                            className="px-4 py-2 rounded-lg bg-teal-800 text-white w-full sm:w-auto"
                        >
                            {loadingImport ? "Importing..." : "Import Workers"}
                        </button>
                    )}

                    {message && (
                        <p className="text-sm text-red-500 mt-1">{message}</p>
                    )}
                </div>

                <button className="px-4 py-2 rounded-lg bg-indigo-700 text-white">
                    Assign to Line / Order
                </button>
            </div>
        </div>
    );
};

export default TopSectionOfAllWorkerTable;