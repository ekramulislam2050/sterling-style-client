
const getStatusConfig = (material) => {
    if (material.actual) {
        return { icon: "✔", text: "In Stock", color: "text-green-400" };
    }
    const plannedDate = new Date(material.planned)
    plannedDate.setHours(0, 0, 0,)
    const today = new Date()
    today.setHours(0, 0, 0,)
    if (today.getTime() > plannedDate.getTime()) {
        return { icon: "⚠", text: "Delayed", color: "text-yellow-400" };
    }
    return { icon: "❌", text: "Not Arrived", color: "text-red-400" };

}
const MaterialStatus = ({ order }) => {
    const materials = order?.tna?.materials
    const steps = Object.entries(materials).map(([name, material]) => ({
        name,
        status: getStatusConfig(material)
    }))

    console.log(steps)
    return (
        <div className="bg-orange-900/70 rounded-xl p-3 md:p-4">
            <h3 className="font-semibold mb-3">Material Status</h3>

            <ul className="space-y-2 text-xs md:text-sm">
              {
                steps.map((step)=>(
                    <li key={step.name} className={`${step.status.color}`}>{step.status.icon} {step.name} : {step.status.text}</li>
                ))
              }
            </ul>
        </div>

    );
};

export default MaterialStatus;