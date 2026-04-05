 
import { useState } from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import TableForAllWorkers from "../../Components/TableForAllWorkers/TableForAllWorkers";

const AllWorker = () => {
  const axiosSecure = useAxiosSecure();

  const [loadingImport, setLoadingImport] = useState(false);
  const [message, setMessage] = useState("");
  const isHr = true;
  const isAdmin = true;

  const canImport = isHr || isAdmin;

  const handleImportWorkers = async () => {
    try {
      setLoadingImport(true);
      const res = await axiosSecure.post("/api/postAllWorkersData");
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Import failed");
    } finally {
      setLoadingImport(false);
    }
  };

  return (
    <div className="p-6 pt-30">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Workers</h1>

        {/* Import button */}
        {canImport && (
          <button
            onClick={handleImportWorkers}
            disabled={loadingImport}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
          >
            {loadingImport ? "Importing..." : "Import Workers"}
          </button>
        )}
      </div>

      {/* Status message */}
      {message && (
        <p className="mb-4 text-sm text-red-500 flex justify-end">{message}</p>
      )}

      {/* Workers table */}
      <TableForAllWorkers axiosSecure={axiosSecure} />
    </div>
  );
};

export default AllWorker;