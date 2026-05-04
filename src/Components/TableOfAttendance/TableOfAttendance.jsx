

const TableOfAttendance = ({ isFetchingNextPage, parentRef, virtualizer, virtualItems, items }) => {
 
    // ===============================
    // FORMATE IN/OUT TIME TO AM PM
    // ===============================
    const formateToAmPm = (time) => {
        if (!time) return "-"

        const [hourStr, minuteStr] = time.split(":")
        const hours = Number(hourStr)
        const minutes = Number(minuteStr)

        const amPm = hours >= 12 ? "pm" : "am"
        // Convert 24-hour clock (0–23) to 12-hour display (1–12)
        const convertedHours = hours % 12 || 12

        const formattedTime = `${String(convertedHours)} : ${String(minutes)} ${amPm}`

        return formattedTime

    }
    
    // =========================
    // 🎨 STATUS COLOR FUNCTION
    // =========================
    const getStatusStyle = (status) => {
        switch (status) {
            case "present":
                return "bg-green-300 text-green-800 border border-green-300";

            case "absent":
                return "bg-red-300 text-red-800 border border-red-300";

            case "late":
                return "bg-yellow-200 text-yellow-800 border border-yellow-300";

            case "leave":
                return "bg-blue-300 text-blue-800 border border-blue-300";

            default:
                return "bg-gray-200 text-gray-800 border border-gray-300";
        }
    };
    return (
        <div>
            {/* =========================
                📋 TABLE HEADER
            ========================= */}
            <div className="grid grid-cols-4 p-3 rounded-md font-semibold text-sm">
                <span>Worker ID</span>
                <span>In Time</span>
                <span>Status</span>
                <span>Out Time</span>
            </div>

            {/* =========================
                📜 VIRTUAL LIST
            ========================= */}
            <div
                ref={parentRef}
                className="h-[500px] overflow-auto border rounded-md custom-scrollbar"
            >
                <div
                    style={{
                        height: virtualizer.getTotalSize(),
                        position: "relative",
                    }}
                >
                    {virtualItems.map((virtualRow) => {
                        const item = items[virtualRow.index];

                        return (
                            <div
                                key={virtualRow.key}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    transform: `translateY(${virtualRow.start}px)`,
                                }}
                                className="grid grid-cols-4 px-3 py-2 border-b hover:bg-gray-700 text-sm items-center"
                            >
                                <span className="font-medium">
                                    {item.workerId}
                                </span>

                                <span className="text-green-300">{formateToAmPm(item.checkIn)}</span>

                                <span>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                                            item.status
                                        )}`}
                                    >
                                        {item.status}
                                    </span>
                                </span>

                                <span className="text-red-400">{formateToAmPm(item.checkOut)}</span>
                            </div>
                        );
                    })}
                </div>

                {/* LOADING MORE */}
                {isFetchingNextPage && (
                    <div className="p-2 text-center text-gray-500 text-sm">
                        Loading more attendance...
                    </div>
                )}
            </div>
        </div>
    );
};

export default TableOfAttendance;