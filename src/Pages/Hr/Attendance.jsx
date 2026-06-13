import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import ErrMsg from "../../LoadingAndSuccessAndErrMsg/ErrMsg/ErrMsg";
import ListOfAllAttendance from "../../Components/ListOfAllAttendance/ListOfAllAttendance";



const Attendance = () => {
    const axiosSecure = useAxiosSecure()
    const [attendance, setAttendance] = useState([])
     const [loading,setLoading]=useState(true)
    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const res = await axiosSecure.get("/api/getAllAttendanceData")
                setAttendance(res.data)
            } catch (err) {
               if(err){
                       ErrMsg('Failed to fetch allAttendance data to attendancePage(line:14)')
               }
            }finally{
                setLoading(false)
            }
        }
        fetchAttendance()
    }, [axiosSecure])
    return (
        <div>
             <ListOfAllAttendance attendance={attendance} loading={loading}></ListOfAllAttendance>
        </div>
    );
};

export default Attendance;