import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import ErrMsg from "../../LoadingAndSuccessAndErrMsg/ErrMsg/ErrMsg";



const ExportWorkers = () => {
    const [workersDetail,setWorkersDetail]=useState([])
    const [loading,setLoading]=useState(false)
    const axiosSecure=useAxiosSecure()
    const location=useLocation()
     const selectedWorkersId=location.state?.selectedWorkersId || []
     useEffect(()=>{
        const getExportedWorkersDetails=async()=>{
            try{
                setLoading(true)
                const res=await axiosSecure.get(`/api/getExportWorkersDetailsById?ids=${selectedWorkersId.join(",")}`)
                 const data = res?.data 
                 setWorkersDetail(data)
  
                 
            }catch(err){
               ErrMsg("Failed to fetch ExportedWorkersDetail to (Component : ExportWorkers)")
            }finally{
                setLoading(false)
            }
        }
        getExportedWorkersDetails()
     },[])
    return (
        <div  >
             
        </div>
    );
};

export default ExportWorkers;