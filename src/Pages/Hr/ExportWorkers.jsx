import { useLocation } from "react-router-dom";



const ExportWorkers = () => {
    const location=useLocation()
     const selectedWorkersId=location.state?.selectedWorkersId || []
    return (
        <div className="pt-30">
             <h1>selectedWorkersId:{selectedWorkersId}</h1>
        </div>
    );
};

export default ExportWorkers;