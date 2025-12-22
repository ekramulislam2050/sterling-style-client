
import InventoryWidgets from "../InventoryWidgets/InventoryWidgets";
import AlertAndNotification from "../AlertAndNotification/AlertAndNotification";



const WidgetsLayout = () => {
    return (
        <div className="grid lg:grid-cols-2 xl:grid-cols-2 gap-3">
            <div className="">
                <InventoryWidgets></InventoryWidgets>
            </div>
            <div className=" ">
                <AlertAndNotification></AlertAndNotification>

            </div>
        </div>
    );
};

export default WidgetsLayout;