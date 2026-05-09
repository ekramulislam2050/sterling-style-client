 
import HeaderOfAttendancePage from "../../Components/HeaderOfAttendancePage/HeaderOfAttendancePage";
import SearchAndFilterOfWorkerAttendance from "../../Components/SearchAndFilterOfWorkerAttendance/SearchAndFilterOfWorkerAttendance";
import SummaryCardsOfAttendance from "../../Components/SummaryCardsOfAttendance/SummaryCardsOfAttendance";
import TableOfAttendance from "../../Components/TableOfAttendance/TableOfAttendance";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import{useQuery} from "@tanstack/react-query"
 import ErrMsg from "../../LoadingAndSuccessAndErrMsg/ErrMsg/ErrMsg"
import { toast } from "react-toastify";
import Loading from "../../LoadingAndSuccessAndErrMsg/Loading/Loading";

const Attendance = () => {
      const axiosSecure=useAxiosSecure()
        
      const {data,isLoading,isError}=useQuery({
        queryKey:["attendance"],
        queryFn:async()=>{
            const res=await axiosSecure.get("/api/getAttendanceOfWorker")
            return res.data
        }
      })
      
       if(isLoading){
         return Loading("Loading please wait")
       }
       if(isError){
         return ErrMsg("Something went wrong")
       }

    return (
        <div className="pt-28 px-4 space-y-4">

            <HeaderOfAttendancePage data={data}/>

            <SummaryCardsOfAttendance />

            <SearchAndFilterOfWorkerAttendance />

            <TableOfAttendance />

        </div>
    );
};

export default Attendance;