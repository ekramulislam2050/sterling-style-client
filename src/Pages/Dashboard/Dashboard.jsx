 
import ProductionMonitoring from "../../Components/ProductionMonitoring/ProductionMonitoring";
import ProductionOverview from "../../Components/ProductionOverview/ProductionOverview";





const Dashboard = () => {
  return (
   <div className="p-3">
      <ProductionOverview></ProductionOverview>
      <ProductionMonitoring></ProductionMonitoring>
       
   </div>
  );
};

export default Dashboard;
