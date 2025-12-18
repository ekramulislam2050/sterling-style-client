import { Users, UserX, CalendarOff, Clock } from "lucide-react";

const HrWidgets = () => {
    const widgets = [
        {
            title: "Today Present",
            subtitle: "শ্রমিক / স্টাফ কতজন উপস্থিত",
            value: "82 জন",
            icon: Users,
            gradient: "from-green-500 to-green-700",
            bg: "bg-green-50",
        },
        {
            title: "Absent",
            value: "17 জন",
            icon: UserX,
            gradient: "from-red-500 to-red-700",
            bg: "bg-red-50",
        },
        {
            title: "Leave",
            value: "9 জন",
            icon: CalendarOff,
            gradient: "from-orange-400 to-orange-600",
            bg: "bg-orange-50",
        },
        {
            title: "OT Hours",
            value: "5.5 ঘন্টা",
            icon: Clock,
            gradient: "from-blue-500 to-blue-700",
            bg: "bg-blue-50",
        },
    ];
    return (
        <div className="mt-5 flex flex-col items-center">
             <h1 className="my-3">HR & Attendance Widgets
</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-12">
                {widgets.map((w, i) => (
                    <div
                        key={i}
                        className={`rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105 ${w.bg} `}
                    >
                        <div
                            className={`flex items-center gap-3 px-5 py-3 bg-linear-to-r ${w.gradient} text-white `}
                        >
                            <w.icon className="w-6 h-6" />
                            <h3 className="text-lg font-semibold">{w.title}</h3>
                        </div>


                        <div className="p-6 flex items-center justify-between">
                            <div>
                                {w.subtitle && (
                                    <p className="text-sm text-gray-600 mb-1">{w.subtitle}</p>
                                )}
                                <p className="text-3xl font-bold text-gray-800">{w.value}</p>
                            </div>
                            <div
                                className={`w-14 h-14 rounded-full flex items-center justify-center bg-linear-to-r ${w.gradient} text-white shadow-md`}
                            >
                                <w.icon className="w-7 h-7" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HrWidgets;