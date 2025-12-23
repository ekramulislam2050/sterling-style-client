

const TNAProgress = () => {
    return (
        <div className="bg-slate-800 rounded-xl p-3 md:p-4">
            <h3 className="font-semibold mb-3">TNA Progress</h3>

            <div className="flex flex-wrap gap-2 text-xs md:text-sm">
                <span className="bg-green-600 px-3 py-1 rounded">Fabric</span>
                <span className="bg-green-600 px-3 py-1 rounded">Cutting</span>
                <span className="bg-red-600 px-3 py-1 rounded">Sewing</span>
                <span className="bg-slate-600 px-3 py-1 rounded">Finishing</span>
                <span className="bg-slate-600 px-3 py-1 rounded">Shipment</span>
            </div>

            <p className="text-red-400 mt-3 text-xs md:text-sm">
                ⚠ Sewing Delayed (Due: 18 Jul → Now: 21 Jul)
            </p>
        </div>

    );
};

export default TNAProgress;