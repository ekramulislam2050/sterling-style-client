import { useState } from "react";
import { Search } from "lucide-react"; // npm i lucide-react

const SearchAndFilterOfWorkerAttendance = ({ filter, setFilter }) => {

    const { status, date } = filter;
    const [localSearch, setLocalSearch] = useState("");

    // 🔥 reusable search handler
    const handleSearch = () => {
        const value = localSearch.trim();

        setFilter({
            search: value,
            status: "",
            date: "",
            fromDate: "",
            toDate: ""
        });
    };

    return (
        <div className="w-full bg-teal-500/60 rounded-2xl shadow-md p-4 space-y-4">

            {/* 🔍 Search Input + Icon */}
            <div className="flex items-center border rounded px-2 py-1 ">

                <input
                    className="flex-1 outline-none text-sm"
                    placeholder="Type worker ID & press Enter"
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />

                {/* 🔥 Search Icon */}
                <Search
                    className="w-4 h-4 cursor-pointer text-gray-100 hover:scale-110 transition"
                    onClick={handleSearch}
                />
            </div>

            {/* 📊 Status */}
            <select
                className="border px-2 py-1"
                value={status}
                onChange={(e) => {
                    const value = e.target.value;

                    setFilter({
                        search: "",
                        status: value,
                        date: "",
                        fromDate: "",
                        toDate: ""
                    });

                    setLocalSearch("");
                }}
            >

                <option value="all">All</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
                <option value="leave">Leave</option>
            </select>

            {/* 📅 Date */}
            <input
                className="border px-2 py-1"
                type="date"
                value={date}
                onChange={(e) => {
                    const value = e.target.value;

                    setFilter({
                        search: "",
                        status: "all",
                        date: value,
                        fromDate: "",
                        toDate: ""
                    });

                    setLocalSearch("");
                }}
            />
        </div>
    );
};

export default SearchAndFilterOfWorkerAttendance;