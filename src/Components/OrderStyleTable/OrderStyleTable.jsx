

const OrderStyleTable = () => {
    return (
        <div className="bg-slate-600/80 rounded-xl p-3 md:p-4 lg:col-span-2 overflow-x-auto">
            <h3 className="font-semibold mb-3">Order & Style Status</h3>

            <table className="min-w-[500px] w-full text-sm">
                <thead className="text-left text-slate-400">
                    <tr>
                        <th>Style</th>
                        <th>Buyer</th>
                        <th>Qty</th>
                        <th>Ship</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    <tr className="border-t border-slate-700">
                        <td>ST-1024</td>
                        <td>H&M</td>
                        <td>5,000</td>
                        <td>15-Jul</td>
                        <td className="text-green-400">In Production</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default OrderStyleTable;