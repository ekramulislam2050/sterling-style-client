const InventorySummaryCards = ({ order }) => {

    const shipment = order?.tna?.shipment || {};
    const production = order?.tna?.production || {};

    return (
        <div className="grid md:grid-cols-4 gap-4">

            {/* Order Qty */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <p className="text-blue-300 text-sm">Order Qty</p>
                <h2 className="text-xl font-semibold text-blue-200">
                    {order?.orderQty}
                </h2>
            </div>

            {/* Ship Date */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <p className="text-green-300 text-sm">Ship Date</p>
                <h2 className="text-xl font-semibold text-green-200">
                    {shipment?.plannedDate || "N/A"}
                </h2>
            </div>

            {/* Shipped Qty */}
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <p className="text-purple-300 text-sm">Shipped Qty</p>
                <h2 className="text-xl font-semibold text-purple-200">
                    {shipment?.shippedQty || 0}
                </h2>
            </div>

            {/* Production Progress */}
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                <p className="text-orange-300 text-sm">Production</p>

                <div className="text-sm space-y-1 mt-1 text-orange-200">
                    <p>Cutting: {production?.cutting?.actualQty || 0}</p>
                    <p>Sewing: {production?.sewing?.actualQty || 0}</p>
                    <p>Finishing: {production?.finishing?.actualQty || 0}</p>
                </div>
            </div>

        </div>
    );
};

export default InventorySummaryCards;