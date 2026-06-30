

const SearchAndFilterOfAttendance = ({
    handleSearch,
    handleStatus,
    handleDate,
    handleReset,
    search,
    status,
    date,
}) => {
    return (
        <div className="  rounded-xl shadow  p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Search */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Search Worker
                    </label>

                    <input
                        type="text"
                        placeholder="Worker ID / Name..."
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="input input-bordered w-full text-zinc-500"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Status
                    </label>

                    <select
                        value={status}
                        onChange={(e) => handleStatus(e.target.value)}
                        className="select select-bordered w-full text-zinc-500"
                    >
                        <option value="all">All Status</option>
                        <option value="present">Present</option>
                        <option value="late">Late</option>
                        <option value="absent">Absent</option>
                    </select>
                </div>

                {/* Date */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Date
                    </label>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => handleDate(e.target.value)}
                        className="input input-bordered w-full text-zinc-500"
                    />
                </div>

                {/* Reset */}
                <div className="flex items-end">
                    <button
                        onClick={handleReset}
                        className="btn bg-teal-600 hover:bg-teal-700 text-white w-full"
                    >
                        Reset Filters
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SearchAndFilterOfAttendance;