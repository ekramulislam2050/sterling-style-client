const OrderStyleTable = ({ runningOrder = [] }) => {
    return (
        <div className="bg-slate-600/80 rounded-xl p-3 md:p-4 lg:col-span-2 overflow-x-auto">
            <h3 className="font-semibold mb-3">Order & Style Status</h3>

            <table className="min-w-[600px] w-full text-sm">
                <thead className="text-left text-slate-300">
                    <tr>
                        <th>Style</th>
                        <th>Buyer</th>
                        <th>Qty</th>
                        <th>Ship</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {runningOrder.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center py-4 text-slate-400">
                                No orders found
                            </td>
                        </tr>
                    ) : (
                        runningOrder.map(order => (
                            <tr
                                key={order._id}
                                className="border-t border-slate-700 hover:bg-slate-700/40"
                            >
                                <td className="font-medium">{order.styleNo}</td>
                                <td>{order.buyer}</td>
                                <td>{Number(order.orderQty).toLocaleString()}</td>
                                <td>
                                    {order.exFactoryDate
                                        ? new Date(order.exFactoryDate).toLocaleDateString("en-GB", {
                                              day: "2-digit",
                                              month: "short",
                                          })
                                        : "—"}
                                </td>
                                <td className="text-green-400">
                                    In Production
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrderStyleTable;
