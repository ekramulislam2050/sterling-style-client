
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import TableForAllWorkers from "../../Components/TableForAllWorkers/TableForAllWorkers";
import ErrMsg from "../../SuccessAndErrMsg/ErrMsg/ErrMsg";

const AllWorker = () => {
  const axiosSecure = useAxiosSecure();

  const [total, setTotal] = useState(0)
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

      // after post refresh fetchWorkers()----------
      fetchWorkers()
    } catch (error) {
      setMessage(error.response?.data?.message || "Import failed");
    } finally {
      setLoadingImport(false);
    }
  };


  //get  all workers----------
  const fetchWorkers = async () => {
    try {
      const res = await axiosSecure.get("/api/getAllWorkersData")
      const data = res.data
      setTotal(data.total || 0)
    } catch (err) {
      ErrMsg("Failed to fetch total worker", err.message)
    }
  }
  useEffect(() => {
    fetchWorkers()
  }, [])
  return (
    <div className="p-6 pt-30">
      {/* Top section---------------- */}
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


        </div>
      </div>
      {/* Workers table */}
      <TableForAllWorkers/>
    </div>
  );
};

export default AllWorker;