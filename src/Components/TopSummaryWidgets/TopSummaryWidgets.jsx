

const TopSummaryWidgets = ({runningOrder=[]}) => {

    const SummaryCard = ({ title, value, color }) => (
        <div className={`rounded-xl p-4 bg-${color}-800`}>
            <p className="text-xs md:text-sm opacity-80">{title}</p>
            <h2 className="text-xl md:text-2xl font-bold">{value}</h2>
        </div>
    );
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 ">
            <SummaryCard title="Running Styles" value={runningOrder.length} color="blue" />
            <SummaryCard title="Pending Samples" value="3" color="purple" />
            <SummaryCard title="Fabric Not In-House" value="2" color="emerald" />
            <SummaryCard title="At-Risk Shipments" value="5" color="red" />
        </div>
    );
};

export default TopSummaryWidgets;