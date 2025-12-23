

const ShipmentRiskTable = () => {
    return (
        <div className="bg-slate-800 rounded-xl p-3 md:p-4 overflow-x-auto">
            <h3 className="font-semibold mb-3">Shipment Risk Alert</h3>

            <table className="min-w-[500px] w-full text-sm">
                <thead className="text-slate-400 text-left">
                    <tr>
                        <th>Buyer</th>
                        <th>Order</th>
                        <th>Ship</th>
                        <th>Risk</th>
                    </tr>
                </thead>

                <tbody>
                    <tr className="border-t border-slate-700">
                        <td>H&M</td>
                        <td>ST-1024</td>
                        <td>15-Jul</td>
                        <td className="text-red-400">High Risk</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ShipmentRiskTable;