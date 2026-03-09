const StageWiseStatus = ({ production = {} }) => {
  const stages = Object.keys(production);

  // Status অনুযায়ী রঙের ক্লাস
  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-red-500 text-white";
      case "In Progress":
        return "bg-yellow-400 text-black";
      case "Completed":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <div className="mb-4 p-4 rounded-xl shadow-lg bg-linear-to-r from-pink-500/40 via-purple-500/20 to-indigo-500/40">
      <h3 className="font-bold mb-4 text-lg text-gray-300">Stage Wise Status</h3>
      <table className="w-full text-left table-auto border-collapse">
        <thead>
          <tr className="bg-linear-to-r from-indigo-900/50 via-purple-700/40 to-pink-900/50 text-slate-300">
            <th className="p-3 rounded-tl-xl">Stage</th>
            <th className="p-3">Planned Qty</th>
            <th className="p-3">Actual Qty</th>
            <th className="p-3 rounded-tr-xl">Status</th>
          </tr>
        </thead>
        <tbody>
          {stages.map((stage, idx) => (
            <tr
              key={stage}
              className={
                idx % 2 === 0
                  ? "bg-indigo-50/20 backdrop-blur-sm"
                  : "bg-purple-50/20 backdrop-blur-sm"
              }
            >
              <td className="p-2 font-medium text-gray-300">{stage}</td>
              <td className="p-2">
                <input
                  type="number"
                  value={production[stage].plannedQty || ""}
                  readOnly
                  className="w-full rounded-md text-gray-300 text-center cursor-not-allowed bg-transparent border border-gray-300/40"
                />
              </td>
              <td className="p-2">
                <input
                  type="number"
                  value={production[stage].actualQty || ""}
                  readOnly
                  className="w-full rounded-md text-gray-300 text-center cursor-not-allowed bg-transparent border border-gray-300/40"
                />
              </td>
              <td className="p-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(
                    production[stage].status
                  )}`}
                >
                  {production[stage].status || "N/A"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StageWiseStatus;