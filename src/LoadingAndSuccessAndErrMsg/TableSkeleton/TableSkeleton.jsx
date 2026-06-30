 

const TableSkeleton = () => {
    return (
        <div className="w-full rounded-lg overflow-hidden border border-gray-200 animate-pulse">
            {/* Header */}
            <div className="grid grid-cols-6 bg-slate-700 p-4 gap-4">
                {[...Array(6)].map((_, index) => (
                    <div
                        key={index}
                        className="h-5 rounded bg-slate-500"
                    />
                ))}
            </div>

            {/* Rows */}
            {[...Array(12)].map((_, rowIndex) => (
                <div
                    key={rowIndex}
                    className="grid grid-cols-6 gap-4 p-4 border-b border-gray-200"
                >
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
                </div>
            ))}
        </div>
    );
};

export default TableSkeleton;