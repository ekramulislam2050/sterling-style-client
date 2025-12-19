
import AlertAndNotification from "../../Components/AlertAndNotification/AlertAndNotification";
import HrWidgets from "../../Components/HrWidgets/HrWidgets";
import InventoryWidgets from "../../Components/InventoryWidgets/InventoryWidgets";
import OrderMonitoring from "../../Components/OrderMonitorin/OrderMonitoring";
import ProductionMonitoring from "../../Components/ProductionMonitoring/ProductionMonitoring";
import ProductionOverview from "../../Components/ProductionOverview/ProductionOverview";
 





const Dashboard = () => {
  return (
    <div className="p-3">
      <ProductionOverview></ProductionOverview>
      <ProductionMonitoring></ProductionMonitoring>
      <OrderMonitoring></OrderMonitoring>
      <InventoryWidgets></InventoryWidgets>
      <HrWidgets></HrWidgets>
      <AlertAndNotification></AlertAndNotification>
    </div>
  );
};

export default Dashboard;
