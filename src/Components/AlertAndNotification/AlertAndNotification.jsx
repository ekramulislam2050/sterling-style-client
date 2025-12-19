import {
    AlarmClock,
    PackageX,
    Wrench,
    Ban
} from "lucide-react";

const AlertAndNotification = () => {
    const alerts = [
        {
            id: 1,
            title: "Deadline Alert",
            message: "3 orders near deadline",
            icon: AlarmClock,
            color: "from-green-500 to-green-800",
            background: "bg-green-500",
        },
        {
            id: 2,
            title: "Low Stock Alert",
            message: "Fabric & trims below minimum",
            icon: PackageX,
            color: "from-yellow-400 to-yellow-700",
            background: "bg-yellow-400",
        },
        {
            id: 3,
            title: "Machine Breakdown",
            message: "2 machines stopped",
            icon: Wrench,
            color: "from-indigo-500 to-purple-800",
            background: "bg-indigo-400",
        },
        {
            id: 4,
            title: "Production Halt",
            message: "Line 3 halted",
            icon: Ban,
            color: "from-red-500 to-red-700",
            background: "bg-red-400",
        },
    ];

    return (
        <div className="flex flex-col items-center mt-5">
            <h1 className="mb-3 text-yellow-300 font-semibold text-lg">
                Alert & Notification
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {alerts.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.id}
                            className={`  rounded-2xl overflow-hidden  ${item.background}  `}
                        >
                            <div
                                className={`bg-linear-to-br ${item.color}
                               text-white py-5 px-13 shadow-lg
                                 hover:scale-105 hover:shadow-2xl
                                 transition-all duration-300
                                 rounded-tr-[60%]
                                 min-h-[180px]
                                 flex flex-col justify-between `}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <Icon className="w-10 h-10 opacity-90" />
                                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                                        Alert
                                    </span>
                                </div>

                                <h3 className="text-lg font-semibold">
                                    {item.title}
                                </h3>
                                <p className="text-sm opacity-90 mt-1">
                                    {item.message}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AlertAndNotification;
