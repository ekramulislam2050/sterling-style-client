const ShipmentRiskTable = ({ runningOrder = [] }) => {

    const calculateRisk = (shipDate) => {
        if (!shipDate) {
            return { label: "No Date", color: "text-gray-400", bg: "bg-gray-500/10" }
        }

        const today = new Date()
        const ship = new Date(shipDate)

        today.setHours(0,0,0,0)
        ship.setHours(0,0,0,0)

        const diffTime = ship.getTime() - today.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays < 0) {
            return { label: "Overdue", color: "text-red-500", bg: "bg-red-500/10" }
        } 
        else if (diffDays <= 7) {
            return { label: "High Risk", color: "text-red-400", bg: "bg-red-400/10" }
        } 
        else if (diffDays <= 15) {
            return { label: "Medium Risk", color: "text-yellow-400", bg: "bg-yellow-400/10" }
        } 
        else {
            return { label: "Low Risk", color: "text-green-400", bg: "bg-green-400/10" }
        }
    }

    return (
        <div className="bg-teal-900/60 rounded-xl p-4 shadow-md border border-teal-800">

            <h3 className="font-semibold mb-4 flex items-center gap-2">
                🚚 Shipment Risk Alert
            </h3>

            <div className="overflow-x-auto">

                <table className="min-w-[520px] w-full text-sm">

                    <thead className="text-slate-400 border-b border-slate-700">
                        <tr>
                            <th className="py-2 text-left">Buyer</th>
                            <th className="py-2 text-left">Style</th>
                            <th className="py-2 text-left">Ship Date</th>
                            <th className="py-2 text-left">Risk</th>
                        </tr>
                    </thead>

                    <tbody>

                        {runningOrder.length === 0 ? (

                            <tr>
                                <td colSpan={4} className="text-center py-6 text-slate-400">
                                    No running orders
                                </td>
                            </tr>

                        ) : (

                            runningOrder.map((order) => {

                                const shipDate =
                                    order?.tna?.shipment?.plannedDate ||
                                    order?.exFactoryDate

                                const risk = calculateRisk(shipDate)

                                return (
                                    <tr
                                        key={order._id}
                                        className="border-b border-slate-800 hover:bg-teal-950/40 transition"
                                    >

                                        <td className="py-3">{order.buyer}</td>

                                        <td>{order.styleNo}</td>

                                        <td>
                                            {shipDate && !isNaN(new Date(shipDate))
                                                ? new Date(shipDate).toLocaleDateString("en-GB")
                                                : "N/A"}
                                        </td>

                                        <td>
                                            <span
                                                className={`px-2 py-1 rounded-md text-xs font-semibold ${risk.color} ${risk.bg}`}
                                            >
                                                {risk.label}
                                            </span>
                                        </td>

                                    </tr>
                                )
                            })

                        )}

                    </tbody>

                </table>

            </div>
        </div>
    )
}

export default ShipmentRiskTable