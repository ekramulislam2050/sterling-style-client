
import HeaderOfAllWorkersTable from "../HeaderOfAllWorkersTable/HeaderOfAllWorkersTable"
import WorkerListOfAllWorkerTable from "../WorkerListOfAllWorkerTable/WorkerListOfAllWorkerTable"
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { useEffect, useState } from "react";
 import ErrMsg from "../../LoadingAndSuccessAndErrMsg/ErrMsg/ErrMsg";
import { all } from "axios";

const TableForAllWorkers = () => {
  const [allWorkersData,setAllWorkersData]=useState([])
  const axiosSecure = useAxiosSecure()
  
  useEffect(() => {
    const fetchAllWorkersData = async () => {
      try {
        const res = await axiosSecure.get("/api/getAllWorkersData")
         const allWorkers=await res?.data
         setAllWorkersData(allWorkers)
      } catch (err) {
          ErrMsg("Failed to fetch all workers data to (component:TableForAllWorkers;line:15)")
      }
    }
    fetchAllWorkersData()
  }, [axiosSecure])
  return (
    <div className="space-y-4 mt-2">
     

      {/* search section------------------------*/}
      {/* <SearchAndFilterButtonsOfAllWorkerTable/> */}

      {/* table wrapper-------------------------*/}
      <div className="overflow-x-auto">
        {/* header----------------------------- */}
        <HeaderOfAllWorkersTable />

        {/* list--------------------------------*/}
        <WorkerListOfAllWorkerTable
          allWorkersData={allWorkersData}
        />
      </div>

      {/* footer--------------------------------*/}
      {/* <FooterOfAllWorkerTable/> */}

      {/* bottom action bar-----------------------*/}
      {/* <HrAndProductionsActionButtons/> */}
    </div>
  );
};

export default TableForAllWorkers;