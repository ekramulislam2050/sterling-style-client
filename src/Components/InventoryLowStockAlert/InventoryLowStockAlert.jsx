const InventoryLowStockAlert = ({ materials = {} }) => {

    const materialEntries = Object.entries(materials);

    if (materialEntries.length === 0) return null;

    return (
        <div className="bg-orange-500/20 border border-orange-500/20 rounded-lg p-4">

            <h2 className="text-lg font-semibold mb-4">Material Stock Status</h2>

            <ul className="space-y-2">
                {materialEntries.map(([name, m]) => {
                    const required = Number(m.requiredQty) || 0;
                    const received = Number(m.receivedQty) || 0;
                    const percent = required ? Math.round((received / required) * 100) : 0;

                    let color = "bg-red-500";
                    if (percent >= 50 && percent < 80) color = "bg-yellow-500";
                    if (percent >= 80) color = "bg-green-500";

                    return (
                        <li key={name} className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="capitalize">{name}</span>
                                <span>{received} / {required}</span>
                            </div>
                            <div className="w-full h-2 bg-white/10 rounded">
                                <div
                                    className={`${color} h-2 rounded`}
                                    style={{ width: `${percent}%` }}
                                />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default InventoryLowStockAlert;