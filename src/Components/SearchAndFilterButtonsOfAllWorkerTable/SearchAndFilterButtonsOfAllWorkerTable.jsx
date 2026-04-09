import { FiSearch } from "react-icons/fi";

const SearchAndFilterButtonsOfAllWorkerTable = ({ searchInputRef, searchTerm, handleSearchKey, handleSearchClick }) => {
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
                <button className="px-4 py-2 rounded-lg text-white bg-pink-800">
                    All Departments
                </button>
                <button className="px-4 py-2 rounded-lg text-white bg-sky-800">
                    All Status
                </button>
            </div>
        </div>
    );
};

export default SearchAndFilterButtonsOfAllWorkerTable;