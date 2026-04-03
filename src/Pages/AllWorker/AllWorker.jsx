import { useState } from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";

const AllWorker = () => {
    const axiosSecure = useAxiosSecure();

    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const fetchWorkers = async () => {
        try {
            const res = await axiosSecure.get("/api/getAllWorkersData");
            setWorkers(res.data);
        } catch (error) {
            console.error(error);
        }
    };

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

                <button
                    onClick={handleImportWorkers}
                    disabled={loading}
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
                >
                    {loading
                        ? "Importing..."
                        : "Import Workers"}
                </button>
            </div>

            {/* status */}
            {message && (
                <p className="mb-4 text-sm text-green-500">
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
            <div className="border rounded-lg p-4">
                {workers.length === 0 ? (
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