import OrderStatusSummary from "../OrderStatusSummary/OrderStatusSummary";
import UpcomingShipment from "../UpcomingShipment/UpcomingShipment";

 

const OrderMonitoring = () => {
    return (
        <div className="grid grid-cols-2  ">
            <div className="border">
                <OrderStatusSummary></OrderStatusSummary>
            </div>
            <div className="border">
                <UpcomingShipment></UpcomingShipment>
            </div>
        </div>
    );
};

export default OrderMonitoring;