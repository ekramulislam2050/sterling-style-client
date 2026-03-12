import { format } from "date-fns"; // npm install date-fns

const InventoryRecentReceiveTable = ({ materials = {} }) => {
    const entries = Object.entries(materials);

    // recent receive sort
    const recent = entries
        .filter(([_, m]) => m.receivedQty > 0)
        .sort((a, b) => new Date(b.actualDate || 0) - new Date(a.actualDate || 0))
        .slice(0, 5);

    return (
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Recent Material Receive</h2>

            <table className="w-full text-sm">
                <thead className="text-gray-400 border-b border-white/10">
                    <tr>
                        <th className="text-left py-2">Material</th>
                        <th>Received Qty</th>
                        <th>Date</th>
                        <th>Progress</th>
                    </tr>
                </thead>
                <tbody>
                    {recent.length === 0 && (
                        <tr>
                            <td colSpan={4} className="text-center py-4 text-gray-400">
                                No recent receive
                            </td>
                        </tr>
                    )}
                    {recent.map(([name, m]) => {
                        const required = Number(m.requiredQty) || 0;
                        const received = Number(m.receivedQty) || 0;
                        const percent = required ? Math.round((received / required) * 100) : 0;

                        let color = "bg-red-500";
                        if (percent >= 50 && percent < 80) color = "bg-yellow-500";
                        if (percent >= 80) color = "bg-green-500";

                        return (
                            <tr key={name} className="border-b border-white/5 hover:bg-white/5">
                                <td className="capitalize py-2">{name}</td>
                                <td>{received}</td>
                                <td>{m.actualDate ? format(new Date(m.actualDate), "dd MMM yyyy") : "N/A"}</td>
                                <td className="w-32">
                                    <div className="w-full h-2 bg-white/10 rounded">
                                        <div
                                            className={`${color} h-2 rounded`}
                                            style={{ width: `${percent}%` }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryRecentReceiveTable;