import FooterOfAllWorkerTable from "../FooterOfAllWorkerTable/FooterOfAllWorkerTable"
import HeaderOfAllWorkersTable from "../HeaderOfAllWorkersTable/HeaderOfAllWorkersTable"
import WorkerListOfAllWorkerTable from "../WorkerListOfAllWorkerTable/WorkerListOfAllWorkerTable"
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { useEffect, useState } from "react";
import ErrMsg from "../../LoadingAndSuccessAndErrMsg/ErrMsg/ErrMsg";
import HrAndProductionsActionButtons from "../HrAndProductionsActionButtons/HrAndProductionsActionButtons";


const TableForAllWorkers = () => {
   const [selectedWorkers,setSelectedWorkers]=useState([])
   const [loading,setLoading]=useState(false)
  const [allWorkersData, setAllWorkersData] = useState([])
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    const fetchAllWorkersData = async () => {
      try {
        setLoading(true)
        const res = await axiosSecure.get("/api/getAllWorkersData")
        const allWorkers = await res?.data
        setAllWorkersData(allWorkers)
      } catch (err) {
        ErrMsg("Failed to fetch all workers data to (component:TableForAllWorkers;line:15)")
      }finally{
        setLoading(false)
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
          selectedWorkers={selectedWorkers}
          setSelectedWorkers={setSelectedWorkers}
          loading={loading}
        />
      </div>

      {/* footer--------------------------------*/}
      <FooterOfAllWorkerTable loading={loading} allWorkersData={allWorkersData}/>

      {/* bottom action bar-----------------------*/}
      <HrAndProductionsActionButtons selectedWorkers={selectedWorkers}setSelectedWorkers={setSelectedWorkers}/>
    </div>
  );
};

export default TableForAllWorkers;