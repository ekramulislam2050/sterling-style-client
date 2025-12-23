

const SampleItem = ({ name, status }) => {
    const color =
        status === "Approved"
            ? "text-green-400"
            : status === "Pending"
                ? "text-yellow-400"
                : "text-red-400";
    return (
        <div className="flex justify-between text-sm border-b border-slate-700 py-2">
            <span>{name}</span>
            <span className={color}>{status}</span>
        </div>
    );



};

export default SampleItem;