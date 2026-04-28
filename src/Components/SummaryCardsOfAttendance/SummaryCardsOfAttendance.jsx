

const SummaryCardsOfAttendance = ({ items = [] }) => {
    return (
        <div>
            {/* ===============
                  Summary Card
                =================*/}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-green-700 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-100">Present</p>
                    <p className="text-xl font-bold text-green-100">
                        {items.filter(i => i.status?.toLowerCase() === "present").length}
                    </p>
                </div>

                <div className="p-3 bg-red-700 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-100">Absent</p>
                    <p className="text-xl font-bold text-red-100">
                        {items.filter(i => i.status?.toLowerCase() === "absent").length}
                    </p>
                </div>

                <div className="p-3 bg-yellow-700 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-100">Late</p>
                    <p className="text-xl font-bold text-yellow-100">
                        {items.filter(i => i.status?.toLowerCase() === "late").length}
                    </p>
                </div>

                <div className="p-3 bg-blue-800 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-100">Leave</p>
                    <p className="text-xl font-bold text-blue-100">
                        {items.filter(i => i.status?.toLowerCase === "leave").length}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SummaryCardsOfAttendance;