import { useState, useEffect } from "react";

const SearchAndFilterOfWorkerAttendance = ({ onFilterChange }) => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [date, setDate] = useState("");

    // debounce search (important)
    useEffect(() => {
        const timer = setTimeout(() => {
            onFilterChange({
                search,
                status,
                date,
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [search, status, date]);

    return (
        <div className="flex flex-wrap gap-3 items-center p-3 rounded-lg shadow">

            {/* 🔍 Search */}
            <input
                type="text"
                placeholder="Search by Worker ID / Name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-3 py-2 rounded w-64"
            />

            {/* 📌 Status Filter */}
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border px-3 py-2 rounded"
            >
                <option value="all">All</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
                <option value="Leave">Leave</option>
            </select>

            {/* 📅 Date Filter */}
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border px-3 py-2 rounded"
            />

            {/* 🔄 Reset */}
            <button
                onClick={() => {
                    setSearch("");
                    setStatus("all");
                    setDate("");
                }}
                className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
                Reset
            </button>
        </div>
    );
};

export default SearchAndFilterOfWorkerAttendance;