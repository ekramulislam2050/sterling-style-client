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

const AttendanceSummaryCards = () => {
    const axiosSecure = useAxiosSecure()
    const [summaryData, setSummaryData] = useState(0)


    // get all worker data----------------
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axiosSecure.get("/api/getAttendanceSummaryCardData")
                console.log("attendanceSummary====", res.data)
                setSummaryData(res.data)

            } catch (err) {
                if (err) {
                    ErrMsg("Failed to fetch totalNumberOfWorkers to(component :AttendanceSummaryCards;line: 19-20 )")
                }
            }
        }
        fetch()
    }, [axiosSecure])


    const cards = [
        {
            title: "Active Workers",
            value: summaryData.totalNumberOfActiveWorker,
            icon: Users,
            bg: "bg-blue-900",
            iconBg: "bg-blue-800",
            text: "text-blue-400",
        },
        {
            title: "Present",
            value: summaryData.present,
            icon: CheckCircle,
            bg: "bg-green-900",
            iconBg: "bg-green-700",
            text: "text-green-500",
        },
        {
            title: "Late",
            value: summaryData.late,
            icon: Clock3,
            bg: "bg-yellow-900",
            iconBg: "bg-yellow-700",
            text: "text-yellow-500",
        },
        {
            title: "Absent",
            value: summaryData.absent,
            icon: XCircle,
            bg: "bg-red-900",
            iconBg: "bg-red-700",
            text: "text-red-500",
        },
        {
            title: "Attendance Rate",
            value: `${summaryData.attendanceRate}%`,
            icon: TrendingUp,
            bg: "bg-purple-900",
            iconBg: "bg-purple-700",
            text: "text-purple-400",
        },
        {
            title: "Inside Factory",
            value: summaryData.insideFactory,
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