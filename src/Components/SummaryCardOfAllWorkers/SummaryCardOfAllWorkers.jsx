import {
    FiUsers,
    FiCheckCircle,
    FiClock,
    FiGrid,
    FiUserX,
    FiUserMinus,
} from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";

const SummaryCardOfAllWorkers = () => {
    const axiosSecure = useAxiosSecure();
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await axiosSecure.get("/api/getWorkersSummary");
                setSummary(res.data);
            } catch (error) {
                console.error("Summary fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, [axiosSecure]);

    const summaryData = useMemo(() => {
        if (!summary) return [];

        return [
            {
                title: "Total Workers",
                value: summary.total,
                icon: FiUsers,
                bg: "bg-blue-900",
                iconBg: "bg-blue-800",
                iconColor: "text-blue-400",
            },
            {
                title: "Active",
                value: summary.active,
                icon: FiCheckCircle,
                bg: "bg-green-900",
                iconBg: "bg-green-800",
                iconColor: "text-green-400",
            },
            {
                title: "On Leave",
                value: summary.onLeave,
                icon: FiClock,
                bg: "bg-yellow-900",
                iconBg: "bg-yellow-800",
                iconColor: "text-yellow-400",
            },
            {
                title: "Inactive",
                value: summary.inactive,
                icon: FiUserMinus,
                bg: "bg-gray-800",
                iconBg: "bg-gray-700",
                iconColor: "text-gray-300",
            },
            {
                title: "Resigned",
                value: summary.resigned,
                icon: FiUserX,
                bg: "bg-red-900",
                iconBg: "bg-red-800",
                iconColor: "text-red-400",
            },
            {
                title: "Departments",
                value: summary.departments,
                icon: FiGrid,
                bg: "bg-purple-900",
                iconBg: "bg-purple-800",
                iconColor: "text-purple-400",
            },
        ];
    }, [summary]);

    if (loading) {
        return <p className="text-white">Loading summary...</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {summaryData.map((card, index) => {
                const Icon = card.icon;

                return (
                    <div
                        key={index}
                        className={`flex items-center justify-between rounded-2xl p-5 ${card.bg} shadow-sm hover:shadow-md transition duration-300`}
                    >
                        <div>
                            <p className="text-sm text-gray-300">{card.title}</p>
                            <h2 className="text-2xl font-bold text-white">
                                {card.value}
                            </h2>
                        </div>

                        <div className={`p-3 rounded-xl ${card.iconBg}`}>
                            <Icon className={`text-2xl ${card.iconColor}`} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SummaryCardOfAllWorkers;