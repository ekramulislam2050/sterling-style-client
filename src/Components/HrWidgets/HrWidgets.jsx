import { Users, UserX, CalendarOff, Clock } from "lucide-react";

const HrWidgets = () => {
    const widgets = [
        {
            title: "Present",
            value: "82 জন",
            icon: Users,
            gradient: "from-green-500 to-green-700",
            bg: "bg-green-50",
            color: "from-orange-400 to-orange-600",
        },
        {
            title: "Absent",
            value: "17 জন",
            icon: UserX,
            gradient: "from-red-500 to-red-700",
            bg: "bg-red-50",
            color: "from-blue-500 to-blue-700",
        },
        {
            title: "Leave",
            value: "9 জন",
            icon: CalendarOff,
            gradient: "from-orange-400 to-orange-600",
            bg: "bg-orange-50",
            color: "from-green-500 to-green-700",
        },
        {
            title: "OT Hours",
            value: "5.5 ঘন্টা",
            icon: Clock,
            gradient: "from-blue-500 to-blue-700",
            bg: "bg-blue-50",
            color: "from-yellow-400 to-yellow-600",
        },
    ];

    return (
        <div className="mt-5 sm:p-4">

            <div className="mt-10 flex flex-col bg-linear-to-br from-red-900 via-green-900 to-indigo-900 pt-4 pb-6 px-3 rounded-3xl">

                {/* Heading */}
                <h1 className="text-center mb-4 text-base sm:text-lg md:text-xl font-semibold text-red-300">
                  HR & Attendance Widgets
                </h1>

                {/* Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 place-items-center">
                    {widgets.map((data) => {
                        const Icon = data.icon;
                        return (
                            <div key={data.id} className="flex justify-center w-full">
                                <div className="avatar">
                                    <div
                                        className={`mask mask-hexagon-2 bg-linear-to-br ${data.color} w-36 h-36 sm:w-40 sm:h-40  md:w-44 md:h-44 lg:w-50 lg:h-50 shadow-xl transition-transform duration-300 hover:scale-105`}
                                    >
                                        <div className="flex flex-col items-center justify-center h-full px-3 text-white text-center">
                                            <Icon size={26} className="mb-1 sm:mb-2 opacity-90" />
                                            <p className="text-xs sm:text-sm font-medium opacity-90 leading-tight">
                                                {data.title}
                                            </p>
                                            <p className="text-xl sm:text-2xl md:text-3xl font-bold">
                                                {data.value}
                                                <span className="text-xs sm:text-sm font-normal ml-1">
                                                    {data.unit}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default HrWidgets;
