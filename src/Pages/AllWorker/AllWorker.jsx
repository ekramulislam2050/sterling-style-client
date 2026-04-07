
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
      <div className="flex justify-end items-center mb-6">



      </div>

     

      {/* Workers table */}
      <TableForAllWorkers
        axiosSecure={axiosSecure}
        handleImportWorkers={handleImportWorkers}
        loadingImport={loadingImport}
        canImport={canImport}
        message={message}
      />
    </div>
  );
};

export default AllWorker;