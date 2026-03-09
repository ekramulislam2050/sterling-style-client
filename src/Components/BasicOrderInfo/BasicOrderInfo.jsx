const BasicOrderInfo = ({ order }) => {

    return (
        <div className="bg-linear-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 
        rounded-xl p-5 shadow-md">

            <h2 className="text-lg font-bold mb-4 text-indigo-500">
                {order.buyer} | {order.styleNo}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">

                <div className="bg-white/10 p-3 rounded-lg shadow-sm">
                    <p className="text-slate-200 text-xs">Order Qty</p>
                    <p className="font-semibold">{order.orderQty}</p>
                </div>

                <div className="bg-white/10 p-3 rounded-lg shadow-sm">
                    <p className="text-slate-200 text-xs">Order Date</p>
                    <p className="font-semibold">
                        {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                </div>

                <div className="bg-white/10 p-3 rounded-lg shadow-sm">
                    <p className="text-slate-200 text-xs">Ex-Factory</p>
                    <p className="font-semibold">
                        {new Date(order.exFactoryDate).toLocaleDateString()}
                    </p>
                </div>

                <div className="bg-white/10 p-3 rounded-lg shadow-sm">
                    <p className="text-slate-200 text-xs">Season</p>
                    <p className="font-semibold">{order.season}</p>
                </div>

            </div>

        </div>
    );
};

export default BasicOrderInfo;