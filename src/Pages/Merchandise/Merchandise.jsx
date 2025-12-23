import MaterialStatus from "../../Components/MaterialStatus/MaterialStatus";
import OrderStyleTable from "../../Components/OrderStyleTable/OrderStyleTable";
import SampleTracking from "../../Components/SampleTracking/SampleTracking";
import ShipmentRiskTable from "../../Components/ShipmentRiskTable/ShipmentRiskTable";
import TNAProgress from "../../Components/TNAProgress/TNAProgress";
import TopSummaryWidgets from "../../Components/TopSummaryWidgets/TopSummaryWidgets";


const Merchandise = () => {
    return (
        <div className="p-3 md:p-4 space-y-4   min-h-screen text-slate-100 ">

            {/* TOP SUMMARY */}
            <TopSummaryWidgets />

            {/* ORDER + SAMPLE */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <OrderStyleTable />
                <SampleTracking />
            </div>

            {/* TNA + MATERIAL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TNAProgress />
                <MaterialStatus />
            </div>

            {/* SHIPMENT RISK */}
            <ShipmentRiskTable />
        </div>
    );
};

export default Merchandise;