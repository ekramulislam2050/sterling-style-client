const InventoryMaterialTable = ({ materials = {} }) => {
    
    const materialEntries = Object.entries(materials);

    return (
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">

            <h2 className="text-lg font-semibold mb-4">
                Materials Status
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">

                    <thead className="text-gray-400 border-b border-white/10">
                        <tr>
                            <th className="text-left py-2">Material</th>
                            <th className="text-left py-2">Required</th>
                            <th className="text-left py-2">Received</th>
                            <th className="text-left py-2">Issued</th>
                            <th className="text-left py-2">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {materialEntries.map(([key, material]) => {

                            const required = Number(material?.requiredQty) || 0;
                            const received = Number(material?.receivedQty) || 0;
                            const issued = Number(material?.issuedQty) || 0;

                            let status = "Pending";
                            let color = "text-red-400";

                            if (received >= required && required !== 0) {
                                status = "Ready";
                                color = "text-green-400";
                            } else if (received > 0) {
                                status = "Partial";
                                color = "text-yellow-400";
                            }

                            return (
                                <tr
                                    key={key}
                                    className="border-b border-white/5 hover:bg-white/5"
                                >

                                    <td className="py-2 capitalize">
                                        {key}
                                    </td>

                                    <td>{required}</td>

                                    <td>{received}</td>

                                    <td>{issued}</td>

                                    <td className={color}>
                                        {status}
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default InventoryMaterialTable;