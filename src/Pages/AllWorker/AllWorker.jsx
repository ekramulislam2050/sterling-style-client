
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import TableForAllWorkers from "../../Components/TableForAllWorkers/TableForAllWorkers";
import { useState } from "react";


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
      {/* Top section---------------- */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">All Workers</h2>

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


        </div>
      </div>
      {/* Workers table */}
      <TableForAllWorkers />
    </div>
  );
};

export default AllWorker;