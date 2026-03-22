const HrTodaysAttendance = ({ runningOrder = {} }) => {
    const attendance = runningOrder?.hr?.attendance || [];

    return (
        <div className="space-y-3">
            <h2 className="text-white font-bold text-lg">Today's Attendance</h2>
            {attendance.length === 0 ? (
                <p className="text-gray-300">No attendance data.</p>
            ) : (
                <ul className="space-y-2">
                    {attendance.map((a, index) => (
                        <li
                            key={a.employeeId || index}
                            className="bg-white/10 p-3 rounded-lg flex justify-between items-center text-white shadow-sm"
                        >
                            <span>{a.employeeId}</span>
                            <span className="text-gray-300 text-sm">{a.status} ({a.checkIn} - {a.checkOut})</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HrTodaysAttendance;