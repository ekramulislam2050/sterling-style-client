const getStatusConfig = (material = {}) => {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const plannedDate = material?.plannedDate
        ? new Date(material.plannedDate)
        : null;

    if (plannedDate) {
        plannedDate.setHours(0, 0, 0, 0);
    }

    const plannedQty = Number(material.plannedQty) || 0;
    const actualQty = Number(material.actualQty) || 0;

    if (actualQty >= plannedQty && plannedQty !== 0) {
        return { icon: "✅", text: "In Stock", color: "text-green-400", line: "bg-green-400" };
    }

    if (plannedDate && today > plannedDate) {
        return { icon: "⚠️", text: "Delayed", color: "text-yellow-400", line: "bg-yellow-400" };
    }

    if (plannedDate) {
        return { icon: "⏳", text: "On Track", color: "text-blue-400", line: "bg-blue-400" };
    }

    return { icon: "⏳", text: "Not Arrived", color: "text-red-400", line: "bg-red-400" };
};

const MaterialStatus = ({ order }) => {

    const materials = order?.tna?.materials || {};

    const steps = Object.entries(materials).map(([name, material]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        status: getStatusConfig(material)
    }));

    return (
        <div className="bg-orange-900/70 rounded-xl p-4 shadow-lg border border-orange-800">

            <h3 className="font-semibold mb-4 text-sm md:text-base flex items-center gap-2">
                📦 Material Status
            </h3>

            <ul className="space-y-3">

                {steps.map((step) => (
                    <li
                        key={step.name}
                        className="flex items-center justify-between bg-orange-950/40 rounded-lg p-3 hover:bg-orange-950/60 transition"
                    >
                        <div className="flex items-center gap-3">

                            {/* Left status line */}
                            <div className={`w-1 h-6 rounded ${step.status.line}`}></div>

                            <span className="flex items-center gap-2 font-medium">
                                <span>{step.status.icon}</span>
                                {step.name}
                            </span>

                        </div>

                        <span className={`text-xs md:text-sm font-semibold ${step.status.color}`}>
                            {step.status.text}
                        </span>

                    </li>
                ))}

            </ul>

        </div>
    );
};

export default MaterialStatus;