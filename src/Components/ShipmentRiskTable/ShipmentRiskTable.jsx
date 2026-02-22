


const ShipmentRiskTable = ({ runningOrder = [] }) => {
    const calculateRisk = (shipDate) => {
        if (!shipDate) {
            return { label: "No Date", color: "text-gray-400" }

        }
        const today = new Date()
        const ship = new Date(shipDate)

        // remove time portion------
        today.setHours(0, 0, 0, 0)
        ship.setHours(0, 0, 0, 0)

        const diffTime = ship.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays < 0) {
            return { label: "Overdue", color: "text-red-600" };
        } else if (diffDays <= 7) {
            return { label: "High Risk", color: "text-red-400" };
        } else if (diffDays <= 15) {
            return { label: "Medium Risk", color: "text-yellow-400" };
        } else {
            return { label: "Low Risk", color: "text-green-400" };
        }
    }
    return (
        <div className="bg-teal-700/60 rounded-xl p-3 md:p-4 overflow-x-auto">
            <h3 className="font-semibold mb-3">Shipment Risk Alert</h3>

            <table className="min-w-[500px] w-full text-sm">
                <thead className="text-slate-400 text-left">
                    <tr>
                        <th>Buyer</th>
                        <th>Style</th>
                        <th>Ship Date</th>
                        <th>Risk</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        runningOrder.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-4 text-slate-400">
                                    No order found
                                </td>
                            </tr>
                        ) : (
                            runningOrder.map((order) => {

                                const shipDate = order?.tna?.shipment?.planned || order?.exFactoryDate
                                const risk = calculateRisk(shipDate)
                                return (
                                    <tr className="border-t border-slate-700" key={order._id}>
                                        <td>{order.buyer}</td>
                                        <td>{order.styleNo}</td>
                                        <td>{shipDate && !isNaN(new Date(shipDate)) ? new Date(shipDate).toLocaleDateString("en-GB") : "N/A"}</td>
                                        <td className={risk.color}>{risk.label}</td>
                                    </tr>
                                )
                            })
                        )
                    }

                </tbody>
            </table>
        </div>
    );
};

export default ShipmentRiskTable;