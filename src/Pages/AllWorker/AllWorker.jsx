import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";

const AllWorker = () => {
    const axiosSecure = useAxiosSecure();

    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [message, setMessage] = useState("");
    const isHr = true;
    const isAdmin = true;

    const canImport = isHr || isAdmin


    const fetchWorkers = async () => {
        try {
            setFetchLoading(true)
            const res = await axiosSecure.get("/api/getAllWorkersData");
            setWorkers(res.data);
        } catch (error) {
            console.error(error);
        }finally{
            setFetchLoading(false)
        }
    };

    // ✅ page load / refresh এ automatically data আনবে
    useEffect(() => {

        fetchWorkers();

    }, []);

    const handleImportWorkers = async () => {
        try {
            setLoading(true);

            const res = await axiosSecure.post("/api/postAllWorkersData");

            setMessage(res.data.message);

            fetchWorkers();
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Import failed"
            );

            fetchWorkers();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 pt-30">
            {/* header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    All Workers
                </h1>

                {/* all worker data import button---------------- */}
                {
                    canImport && (
                        <button
                            onClick={handleImportWorkers}
                            disabled={loading}
                            className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
                        >
                            {loading
                                ? "Importing..."
                                : "Import Workers"}
                        </button>
                    )
                }
            </div>

            {/* status */}
            {message && (
                <p className="mb-4 text-sm text-red-500 flex justify-end">
                    {message}
                </p>
            )}

            {/* summary */}
            <div className="mb-4">
                <p>Total Workers: {workers.length}</p>
            </div>

            {/* search */}
            <input
                type="text"
                placeholder="Search by worker ID or name"
                className="w-full p-3 rounded border mb-6"
            />

            {/* worker list */}
            <div className="border rounded-lg p-4 min-h-[200px]">
                {fetchLoading ? (
                    <div className="flex flex-col justify-center items-center py-10 gap-3">
                        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-500">
                            Loading workers data...
                        </p>
                    </div>
                ) : workers.length === 0 ? (
                    <p>No worker data available</p>
                ) : (
                    workers.map((worker) => (
                        <div
                            key={worker.workerId}
                            className="py-2 border-b"
                        >
                            {worker.workerId} - {worker.name}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AllWorker;