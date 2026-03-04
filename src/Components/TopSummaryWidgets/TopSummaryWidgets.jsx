import { Info } from "lucide-react";

const TopSummaryWidgets = ({ orders = [] }) => {

    const today = new Date();

    // -----------------------------
    // RUNNING ORDERS
    // -----------------------------
    const runningOrders = orders.filter(
        o => o.tna?.shipment?.status !== "completed"
    );

    // -----------------------------
    // SAMPLE KPI
    // -----------------------------
    const pendingSamples = runningOrders.filter(o =>
        o.samples?.some(s => s.status?.toLowerCase() === "pending")
    ).length;

    const rejectedSamples = runningOrders.filter(o =>
        o.samples?.some(s => s.status?.toLowerCase() === "rejected")
    ).length;

    // -----------------------------
    // FABRIC KPI
    // -----------------------------
    const fabricNotInHouse = runningOrders.filter(o =>
        o.tna?.materials?.fabric?.status &&
        o.tna.materials.fabric.status !== "in-house"
    ).length;

    // -----------------------------
    // SHIPMENT RISK ENGINE
    // -----------------------------
    const atRiskShipments = runningOrders.filter(o => {
        const shipment = o.tna?.shipment;
        if (!shipment?.plannedDate) return false;

        const planned = new Date(shipment.plannedDate);
        const actual = shipment.actualDate
            ? new Date(shipment.actualDate)
            : null;

        const delayedByDate = !actual && planned < today;

        return shipment.status === "delayed" || delayedByDate;
    }).length;

    // -----------------------------
    // PRODUCTION KPI (SEWING BASED)
    // -----------------------------
    const totalOrderQty = runningOrders.reduce(
        (sum, o) => sum + Number(o.orderQty || 0),
        0
    );

    const totalProducedQty = runningOrders.reduce(
        (sum, o) =>
            sum + Number(o.tna?.production?.sewing?.actualQty || 0),
        0
    );

    const productionCompletion = totalOrderQty
        ? ((totalProducedQty / totalOrderQty) * 100).toFixed(1)
        : 0;

    // -----------------------------
    // ON-TIME SHIPMENT %
    // -----------------------------
    const onTimeShipments = runningOrders.filter(o => {
        const shipment = o.tna?.shipment;
        if (!shipment?.plannedDate || !shipment?.actualDate) return false;

        return new Date(shipment.actualDate) <=
               new Date(shipment.plannedDate);
    }).length;

    const onTimeShipmentRate = runningOrders.length
        ? ((onTimeShipments / runningOrders.length) * 100).toFixed(1)
        : 0;

    // -----------------------------
    // COLOR LOGIC
    // -----------------------------
    const getPerformanceColor = (value) => {
        if (value >= 90) return "bg-emerald-700";
        if (value >= 70) return "bg-yellow-600";
        return "bg-red-700";
    };

    // -----------------------------
    // SUMMARY DATA
    // -----------------------------
    const summaryData = [
        {
            title: "Running Styles",
            value: runningOrders.length,
            color: "bg-blue-800",
        },
        {
            title: "Production %",
            value: `${productionCompletion}%`,
            color: getPerformanceColor(Number(productionCompletion)),
        },
        {
            title: "On-Time Shipment %",
            value: `${onTimeShipmentRate}%`,
            color: getPerformanceColor(Number(onTimeShipmentRate)),
        },
        {
            title: "At-Risk Shipments",
            value: atRiskShipments,
            color: "bg-red-800",
        },
        {
            title: "Pending Samples",
            value: pendingSamples,
            color: "bg-purple-800",
        },
        {
            title: "Rejected Samples",
            value: rejectedSamples,
            color: "bg-rose-800",
        },
        {
            title: "Fabric Not In-House",
            value: fabricNotInHouse,
            color: "bg-emerald-800",
        },
    ];

    const SummaryCard = ({ title, value, color }) => (
        <div className={`${color} rounded-xl p-4 shadow-md`}>
            <div className="flex justify-between items-center">
                <p className="text-xs md:text-sm opacity-80">{title}</p>
                <Info className="w-4 h-4 opacity-70" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold">{value}</h2>
        </div>
    );

    return (
        <div>
            <h1 className="flex justify-center font-semibold pb-3 text-lg md:text-xl">
                Factory Control Tower
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {summaryData.map((item, index) => (
                    <SummaryCard key={index} {...item} />
                ))}
            </div>
        </div>
    );
};

export default TopSummaryWidgets;