import { useState } from "react";

const DailyProductionUpdate = ({ production = {}, onSave }) => {
    const [dailyUpdates, setDailyUpdates] = useState(
        Object.keys(production).map((stage) => ({
            stage,
            date: "",
            actualQty: production[stage].actualQty || 0,
            remarks: "",
        }))
    );

    const handleChange = (index, field, value) => {
        const updated = [...dailyUpdates];
        updated[index][field] = value;
        setDailyUpdates(updated);
    };

    return (
        <div className="mb-4 border p-4 rounded-lg  ">
            <h3 className="font-semibold mb-2">Daily Production Update</h3>
            <table className="w-full text-left table-auto border-collapse">
                <thead>
                    <tr className=" ">
                        <th className="p-2 border">Stage</th>
                        <th className="p-2 border">Date</th>
                        <th className="p-2 border">Actual Qty</th>
                        <th className="p-2 border">Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    {dailyUpdates.map((update, index) => (
                        <tr key={update.stage}>
                            <td className="p-2 border">{update.stage}</td>
                            <td className="p-2 border">
                                <input
                                    type="date"
                                    value={update.date}
                                    onChange={(e) => handleChange(index, "date", e.target.value)}
                                    className="border p-1 rounded w-full"
                                />
                            </td>
                            <td className="p-2 border">
                                <input
                                    type="number"
                                    value={update.actualQty}
                                    onChange={(e) => handleChange(index, "actualQty", e.target.value)}
                                    className="border p-1 rounded w-full"
                                />
                            </td>
                            <td className="p-2 border">
                                <input
                                    type="text"
                                    value={update.remarks}
                                    onChange={(e) => handleChange(index, "remarks", e.target.value)}
                                    className="border p-1 rounded w-full"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                onClick={() => onSave(dailyUpdates)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Save
            </button>
        </div>
    );
};

export default DailyProductionUpdate;