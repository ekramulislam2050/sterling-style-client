import { Info } from "lucide-react";

const TopSummaryWidgets = ({ runningOrder = [], totalPlannedOrders = 50 }) => {
    // Dynamic metrics
    const pendingSamples = runningOrder.filter(o => o.samples?.some(s => s.status !== 'approved')).length;
    const fabricNotInHouse = runningOrder.filter(o => o.tna?.fabric?.status !== 'in-house').length;
    const atRiskShipments = runningOrder.filter(o => o.tna?.shipment?.status === 'delayed').length;

    const summaryData = [
        {
            title: 'Running Styles',
            value: runningOrder.length,
            color: 'bg-blue-800',
            progress: Math.min((runningOrder.length / totalPlannedOrders) * 100, 100),
            tooltip: `Out of ${totalPlannedOrders} planned orders`,
        },
        {
            title: 'Pending Samples',
            value: pendingSamples,
            color: 'bg-purple-800',
            progress: Math.min((pendingSamples / totalPlannedOrders) * 100, 100),
            tooltip: `Samples pending approval`,
        },
        {
            title: 'Fabric Not In-House',
            value: fabricNotInHouse,
            color: 'bg-emerald-800',
            progress: Math.min((fabricNotInHouse / totalPlannedOrders) * 100, 100),
            tooltip: `Fabric yet to arrive in-house`,
        },
        {
            title: 'At-Risk Shipments',
            value: atRiskShipments,
            color: 'bg-red-800',
            progress: Math.min((atRiskShipments / totalPlannedOrders) * 100, 100),
            tooltip: `Shipments delayed or at risk`,
        },
    ];

    const SummaryCard = ({ title, value, color, progress, tooltip }) => (
        <div className={`${color} rounded-xl p-4 shadow-md hover:shadow-xl transition-shadow relative group`}>
            <div className="flex justify-between items-center">
                <p className="text-xs md:text-sm opacity-80">{title}</p>
                <Info className="w-4 h-4 text-slate-200 opacity-70 cursor-pointer" title={tooltip} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold">{value}</h2>
            {/* Mini Progress Bar */}
            <div className="w-full h-2 bg-slate-700 rounded mt-2 overflow-hidden">
                <div
                    className="h-2 rounded bg-white transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                    title={tooltip}
                />
            </div>
        </div>
    );

    return (
        <div>
            <h1 className="flex justify-center font-semibold pb-2 text-lg md:text-xl">Top Summary Widgets</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {summaryData.map((item, index) => (
                    <SummaryCard
                        key={index}
                        title={item.title}
                        value={item.value}
                        color={item.color}
                        progress={item.progress}
                        tooltip={item.tooltip}
                    />
                ))}
            </div>
        </div>
    );
};

export default TopSummaryWidgets;