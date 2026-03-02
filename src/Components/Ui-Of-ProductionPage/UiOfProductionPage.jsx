import BasicOrderInfo from "../BasicOrderInfo/BasicOrderInfo";
import DailyProductionUpdate from "../DailyProductionUpdate/DailyProductionUpdate";
import ProductionProgress from "../ProductionProgress/ProductionProgress";
import StageWiseStatus from "../StageWiseStatus/StageWiseStatus";


const UiOfProductionPage = ({ runningOrder = [] }) => {
    const handleChange = (orderId, stage, field, value) => {
        const updated = orders.map((order) =>
            order._id === orderId
                ? {
                    ...order,
                    tna: {
                        ...order.tna,
                        production: {
                            ...order.tna.production,
                            [stage]: {
                                ...order.tna.production[stage],
                                [field]: value,
                            },
                        },
                    },
                }
                : order
        );

        setOrders(updated);
    };

    const handleSave = async (order) => {
        try {
            const res = await axiosSecure.patch(
                `/api/patchOrders/${order._id}`,
                {
                    "tna.production": order.tna.production,
                }
            );

            if (res.data.modifiedCount > 0) {
                toast.success("Production Updated");
            }
        } catch (error) {
            toast.error("Update Failed");
        }
    };

    const calculateProgress = (production) => {
        const total = Object.keys(production || {}).length;
        const completed = Object.values(production || {}).filter(
            (stage) => stage.status === "Completed"
        ).length;

        return total === 0 ? 0 : Math.floor((completed / total) * 100);
    };

    return (
        <div className="p-6   min-h-screen pt-30">
            <h1 className="text-2xl font-bold mb-6">Production Management</h1>

            {runningOrder.length === 0 && (
                <div>
                    <p className="text-gray-500">No Running Orders</p>
                    {/* basic order info---------- */}
                    <BasicOrderInfo></BasicOrderInfo>
                    {/* progress bar------------- */}
                    <ProductionProgress></ProductionProgress>
                    {/* stage wise status-------- */}
                    <StageWiseStatus></StageWiseStatus>
                    {/* daily production update------------- */}
                    <DailyProductionUpdate></DailyProductionUpdate>
                </div>
            )}


        </div>
    );

};

export default UiOfProductionPage;