import {
    Users,
    CheckCircle,
    Clock3,
    XCircle,
    TrendingUp,
    Building2,
} from "lucide-react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { useEffect, useState } from "react";
import ErrMsg from "../../LoadingAndSuccessAndErrMsg/ErrMsg/ErrMsg";

const AttendanceSummaryCards = ({ attendance = [] }) => {
    const axiosSecure = useAxiosSecure()
    const [totalNumberOfWorkers,setTotalNumberOfWorkers] = useState(0)
    

    // get all worker data----------------
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axiosSecure.get("/api/getTotalNumberOfWorkers")
                setTotalNumberOfWorkers(res.data.totalNumberOfWorkers)
            } catch (err) {
                if (err) {
                    ErrMsg("Failed to fetch totalNumberOfWorkers to(component :AttendanceSummaryCards;line: 19-20 )")
                }
            }  
        }
        fetch()
    }, [axiosSecure])
    const presentCount = attendance.filter((items) => items.status === "present").length

    const lateCount = attendance.filter((items) => items.status === "late").length

    const absentCount = attendance.filter((items) => items.status === "absent").length

    const insideFactoryCount = attendance.filter((items) => items.checkIn && !items.checkOut).length

    const attendanceRate =
        totalNumberOfWorkers > 0 ? (
            ((presentCount + lateCount) /totalNumberOfWorkers) * 100
        ).toFixed(1) : 0

    const cards = [
        {
            title: "Total Workers",
            value: totalNumberOfWorkers,
            icon: Users,
            bg: "bg-blue-900",
            iconBg: "bg-blue-800",
            text: "text-blue-400",
        },
        {
            title: "Present",
            value: presentCount,
            icon: CheckCircle,
            bg: "bg-green-900",
            iconBg: "bg-green-700",
            text: "text-green-500",
        },
        {
            title: "Late",
            value: lateCount,
            icon: Clock3,
            bg: "bg-yellow-900",
            iconBg: "bg-yellow-700",
            text: "text-yellow-500",
        },
        {
            title: "Absent",
            value: absentCount,
            icon: XCircle,
            bg: "bg-red-900",
            iconBg: "bg-red-700",
            text: "text-red-500",
        },
        {
            title: "Attendance Rate",
            value: `${attendanceRate}%`,
            icon: TrendingUp,
            bg: "bg-purple-900",
            iconBg: "bg-purple-700",
            text: "text-purple-400",
        },
        {
            title: "Inside Factory",
            value: insideFactoryCount,
            icon: Building2,
            bg: "bg-cyan-900",
            iconBg: "bg-cyan-700",
            text: "text-cyan-400",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
            {cards.map((card, index) => {
                const Icon = card.icon;

                return (
                    <div
                        key={index}
                        className={`${card.bg}
              rounded-2xl
              p-5
              shadow-sm          
              transition-all
              duration-300
              hover:shadow-lg
              hover:-translate-y-1`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400 font-medium">
                                    {card.title}
                                </p>

                                <h2 className={`text-3xl font-bold mt-2 ${card.text}`}>
                                    {card.value}
                                </h2>
                            </div>

                            <div
                                className={`${card.iconBg}
                p-3
                rounded-xl`}
                            >
                                <Icon
                                    size={28}
                                    className={card.text}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default AttendanceSummaryCards;