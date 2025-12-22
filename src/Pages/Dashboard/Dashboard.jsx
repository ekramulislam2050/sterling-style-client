import OrderMonitoring from "../../Components/OrderMonitorin/OrderMonitoring";
import ProductionMonitoring from "../../Components/ProductionMonitoring/ProductionMonitoring";
import ProductionOverview from "../../Components/ProductionOverview/ProductionOverview";
import WidgetsLayout from "../../Components/WidgetsLayout/WidgetsLayout";
import HrWidgets from "../../Components/HrWidgets/HrWidgets"


const Dashboard = () => {
  return (
    <div className="p-3">
      <ProductionOverview></ProductionOverview>
      <ProductionMonitoring></ProductionMonitoring>
      <OrderMonitoring></OrderMonitoring>
      <WidgetsLayout></WidgetsLayout>
      <HrWidgets></HrWidgets>

    </div>
  );
};

export default Dashboard;
