 
import ProductionMonitoring from "../../Components/ProductionMonitoring/ProductionMonitoring";
import ProductionOverview from "../../Components/ProductionOverview/ProductionOverview";
import QcRejected from "../../Components/QcRejected/QcRejected";





const Dashboard = () => {
  return (
   <div className="p-3">
      <ProductionOverview></ProductionOverview>
      <ProductionMonitoring></ProductionMonitoring>
      <QcRejected></QcRejected>
       
   </div>
  );
};

export default Dashboard;
