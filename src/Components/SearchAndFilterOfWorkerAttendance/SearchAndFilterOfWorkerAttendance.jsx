import { useState, useEffect } from "react";

const SearchAndFilterOfWorkerAttendance = ({ onFilterChange }) => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");

    // 🔥 mode: single | range
    const [mode, setMode] = useState("single");

    const [date, setDate] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {

            // ✅ clean payload based on mode
            onFilterChange({
                search,
                status,
                date: mode === "single" ? date : "",
                fromDate: mode === "range" ? fromDate : "",
                toDate: mode === "range" ? toDate : ""
            });

        }, 100);

        return () => clearTimeout(timer);
    }, [search, status, date, fromDate, toDate, mode]);

    return (
        <div className="w-full bg-teal-500/60 rounded-2xl shadow-md p-4 space-y-4">

            {/* 🔥 Mode Toggle */}
            <div className="flex gap-6 text-sm font-medium">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        checked={mode === "single"}
                        onChange={() => {
                            setMode("single");
                            setFromDate("");
                            setToDate("");
                        }}
                    />
                    Single Date
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        checked={mode === "range"}
                        onChange={() => {
                            setMode("range");
                            setDate("");
                        }}
                    />
                    Date Range
                </label>
            </div>

            <div className="flex flex-wrap gap-4 items-center">

                {/* 🔍 Search */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-teal-500">
                    <span>🔍</span>
                    <input
                        type="text"
                        placeholder="Worker ID"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-transparent outline-none text-sm w-40"
                    />
                </div>

                {/* 📊 Status */}
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="px-3 py-2 rounded border border-teal-500 text-sm bg-teal-700"
                >
                    <option value="all">All Status</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                    <option value="Leave">Leave</option>
                </select>

                {/* 📅 Conditional Date UI */}
                {mode === "single" ? (
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="px-3 py-2 rounded border border-teal-500 text-sm"
                    />
                ) : (
                    <>
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="px-3 py-2 rounded border border-teal-500 text-sm"
                        />

                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="px-3 py-2 rounded border border-teal-500 text-sm"
                        />
                    </>
                )}

                {/* 🔄 Reset */}
                <button
                    onClick={() => {
                        setSearch("");
                        setStatus("all");
                        setDate("");
                        setFromDate("");
                        setToDate("");
                        setMode("single");
                    }}
                    className="ml-auto px-4 py-2 rounded-lg bg-gray-800 text-white text-sm hover:scale-105 transition"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default SearchAndFilterOfWorkerAttendance;