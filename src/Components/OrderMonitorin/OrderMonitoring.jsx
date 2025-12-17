import OrderStatusSummary from "../OrderStatusSummary/OrderStatusSummary";
import UpcomingShipment from "../UpcomingShipment/UpcomingShipment";

 

const OrderMonitoring = () => {
    return (
        <div className="grid lg:grid-cols-2  gap-3  ">
            <div className=" ">
                <OrderStatusSummary></OrderStatusSummary>
            </div>
            <div className="  ">
                <UpcomingShipment></UpcomingShipment>
            </div>
        </div>
    );
};

export default OrderMonitoring;