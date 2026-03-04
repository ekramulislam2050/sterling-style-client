import { Info } from "lucide-react";

const getTNAStatus = (plannedDateStr, actualQty, plannedQty) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (actualQty >= plannedQty) return "completed";

  if (plannedDateStr) {
    const plannedDate = new Date(plannedDateStr);
    plannedDate.setHours(0, 0, 0, 0);

    if (plannedDate.getTime() === today.getTime()) return "in-progress";
    if (plannedDate > today) return "pending";
    if (plannedDate < today) return "delayed";
  }
  return "pending";
};

const statusColor = (status) => {
  switch (status) {
    case "completed": return "text-green-600";
    case "delayed": return "text-red-600";
    case "in-progress": return "text-yellow-500";
    case "pending": return "text-slate-400";
    default: return "text-slate-400";
  }
};

const ringColor = (status) => {
  switch (status) {
    case "completed": return "#16a34a";
    case "delayed": return "#dc2626";
    case "in-progress": return "#facc15";
    default: return "#6b7280";
  }
};

const TNAProgress = ({ order }) => {
  const productions = order?.tna?.production || {};
  const stepsOrder = ["cutting", "sewing", "finishing", "shipment"];

  const steps = stepsOrder.map(key => {
    const step = productions[key] || {};
    const plannedQty = Number(step.plannedQty || 1);
    const actualQty = Number(step.actualQty || 0);
    const progress = Math.min((actualQty / plannedQty) * 100, 100).toFixed(0);

    return {
      name: key.charAt(0).toUpperCase() + key.slice(1),
      planned: step.plannedDate,
      actual: step.actualDate,
      plannedQty,
      actualQty,
      remainingQty: Math.max(plannedQty - actualQty, 0),
      progress,
      status: getTNAStatus(step.plannedDate, actualQty, plannedQty)
    };
  });

  const delayedSteps = steps.filter(step => step.status === "delayed");

  return (
    <div className="bg-green-800/40 rounded-xl p-4">
      <h3 className="font-semibold mb-3 text-slate-100">TNA Progress</h3>

      <div className="flex justify-between items-center relative">
        {steps.map((step, idx) => (
          <div key={step.name} className="flex-1 flex flex-col items-center relative">
            
            {/* Circle with progress ring and tooltip */}
            <div className="relative w-16 h-16 md:w-20 md:h-20 group" title={`Planned: ${step.plannedQty}, Actual: ${step.actualQty}, Remaining: ${step.remainingQty}`}>
              <svg className="w-full h-full rotate-[-90deg]">
                <circle
                  cx="50%" cy="50%" r="30%"
                  stroke="#808080"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50%" cy="50%" r="30%"
                  stroke={ringColor(step.status)}
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray="188.4"
                  strokeDashoffset={188.4 - (188.4 * step.progress) / 100}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 1s ease" }}
                />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center text-center">
                <span className={`text-sm font-bold ${statusColor(step.status)}`}>
                  {step.progress}%
                </span>
              </div>
            </div>

            {/* Step Name below circle */}
            <div className="mt-2 text-center text-xs md:text-sm text-slate-100 flex items-center gap-1">
              <span>{step.name}</span>
              {step.planned && (
                <Info className="w-3 h-3 text-slate-400" title={`Planned: ${step.planned}`} />
              )}
            </div>

            {/* Connector Line with gradient */}
            {idx < steps.length - 1 && (
              <div
                className="absolute top-1/2 right-0 -z-10"
                style={{
                  width: "100%",
                  height: "4px",
                  background: `linear-gradient(to right, ${ringColor(step.status)}, ${ringColor(steps[idx + 1].status)})`,
                  transform: "translateX(50%)"
                }}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Delayed Warnings */}
      {delayedSteps.length > 0 && (
        <div className="mt-3 space-y-1">
          {delayedSteps.map(step => (
            <p key={step.name} className="text-red-400 text-xs md:text-sm">
              ⚠ {step.name} Delayed (Due: {step.planned})
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default TNAProgress;