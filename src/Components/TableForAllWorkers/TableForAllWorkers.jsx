import FooterOfAllWorkerTable from "../FooterOfAllWorkerTable/FooterOfAllWorkerTable"
import HeaderOfAllWorkersTable from "../HeaderOfAllWorkersTable/HeaderOfAllWorkersTable"
import WorkerListOfAllWorkerTable from "../WorkerListOfAllWorkerTable/WorkerListOfAllWorkerTable"
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { useEffect, useState } from "react";
import ErrMsg from "../../LoadingAndSuccessAndErrMsg/ErrMsg/ErrMsg";
import HrAndProductionsActionButtons from "../HrAndProductionsActionButtons/HrAndProductionsActionButtons";


const TableForAllWorkers = () => {
  const [page,setPage]=useState(1)
  const [selectedWorkers, setSelectedWorkers] = useState([])
  const [loading, setLoading] = useState(false)
  const [workers, setWorkers] = useState([])
  const axiosSecure = useAxiosSecure()
  
  const limit=50
  useEffect(() => {
    const fetchAllWorkersData = async () => {
      try {
        setLoading(true)
        const res = await axiosSecure.get(`/api/getAllWorkersData?page=${page}&limit=${limit}`)
        const newWorkers = res?.data?.workers

        setWorkers((prev)=>
              page===1?newWorkers:[...prev,...newWorkers]
        )
      } catch (err) {
        ErrMsg("Failed to fetch all workers data to (component:TableForAllWorkers)")
      } finally {
        setLoading(false)
      }
    }
    fetchAllWorkersData()
  }, [axiosSecure,page])
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
          workers={workers}
          selectedWorkers={selectedWorkers}
          setSelectedWorkers={setSelectedWorkers}
          loading={loading}
          setPage={setPage}
        />
      </div>

      {/* footer--------------------------------*/}
      <FooterOfAllWorkerTable loading={loading} workers={workers} />

      {/* bottom action bar-----------------------*/}
      <HrAndProductionsActionButtons selectedWorkers={selectedWorkers} setSelectedWorkers={setSelectedWorkers} />
    </div>
  );
};

export default TableForAllWorkers;