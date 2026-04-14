import { FiSearch } from "react-icons/fi";
import { useMemo } from "react";

const SearchAndFilterButtonsOfAllWorkerTable = ({
    searchInputRef,
    searchTerm,
    fetchWorkers,
    setSearchTerm,
    workers = [],
    selectedDepartment,
    setSelectedDepartment,
    selectedStatus,
    setSelectedStatus,
}) => {


    // search
    const handleSearchClick = () => {
        fetchWorkers(true);
    };

    const handleSearchKey = (e) => {
        if (e.key === "Enter") {
            fetchWorkers(true);
        }
    };

    // dynamic departments
    const departments = useMemo(() => {
        return [
            "All Departments",
            ...new Set(
                workers
                    .map((worker) => worker.department)
                    .filter(Boolean)
            ),
        ];
    }, [workers]);

    // dynamic status
    const statuses = useMemo(() => {
        return [
            "All Status",
            ...new Set(
                workers
                    .map((worker) => worker.status)
                    .filter(Boolean)
            ),
        ];
    }, [workers]);

    return (
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div className="relative w-full lg:w-1/2">
                <input
                    type="text"
                    ref={searchInputRef}
                    placeholder="Search by Worker ID or Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearchKey}
                    className="w-full p-3 pl-10 rounded-lg border outline-none"
                />

                <FiSearch
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                    size={20}
                    onClick={handleSearchClick}
                />
            </div>

            <div className="flex flex-wrap gap-3">
                {/* department */}
                <select
                    value={selectedDepartment}
                    onChange={(e) =>
                        setSelectedDepartment(e.target.value)
                    }
                    className="px-4 py-2 rounded-lg bg-pink-800 text-white outline-none"
                >
                    {departments.map((dept, index) => (
                        <option key={index} value={dept}>
                            {dept}
                        </option>
                    ))}
                </select>

                {/* status */}
                <select
                    value={selectedStatus}
                    onChange={(e) =>
                        setSelectedStatus(e.target.value)
                    }
                    className="px-4 py-2 rounded-lg bg-sky-800 text-white outline-none"
                >
                    {statuses.map((status, index) => (
                        <option key={index} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SearchAndFilterButtonsOfAllWorkerTable;