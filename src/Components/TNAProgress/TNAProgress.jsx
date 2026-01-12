const statusColor = (status) => {
    switch (status) {
        case "completed":
            return "bg-green-600";
        case "delayed":
            return "bg-red-600";
        case "in-progress":
            return "bg-yellow-500";
        default:
            return "bg-slate-600"
    }
}

const getTNAStatus = (planned, actual) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (actual) {
        return "completed"
    }
    if (planned) {
        const plannedDate = new Date(planned)
        plannedDate.setHours(0, 0, 0, 0)

        if (plannedDate < today) return "delayed"

        if (plannedDate.getTime() === today.getTime()) return "in-progress"
    }

    return "pending"
}

const TNAProgress = ({ order }) => {
    if (!order?.tna) return null

    const steps = Object.entries(order.tna).map(([name, value]) => ({

        name,
        planned: value.planned,
        actual: value.actual,
        status: getTNAStatus(value.planned, value.actual)
    }))

    const delayedStep = steps.filter(step => step.status === "delayed")

    return (
        <div className="bg-green-600/50 rounded-xl p-3 md:p-4">
            <h3 className="font-semibold mb-3">TNA Progress</h3>

            <div className="flex flex-wrap gap-2 text-xs md:text-sm">
                {
                    steps.map((step) => (
                        <span key={step.name} className={`px-3 py-1 rounded ${statusColor(step.status)}`}>{step.name}</span>
                    ))
                }

            </div>

            {
                delayedStep.map(step => (
                    <p key={step.name} className="text-red-400 mt-3 text-xs md:text-sm">
                        ⚠ {step.name} Delayed (Due:{step.planned})
                    </p>
                ))
            }


        </div>

    );
};

export default TNAProgress;