const HrTopStats = ({ runningOrder={} }) => {
    console.log("hrtopStats=", runningOrder)

    const totalEmployees = runningOrder?.hr?.assignedEmployees?.length;
    const presentToday = runningOrder?.attendance?.filter(a => a.status === 'Present').length;
    const absentToday = totalEmployees - presentToday;
    const lateComings = runningOrder?.attendance?.filter(a => a.status === 'Late').length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {/* Total Employees */}
            <div className="bg-white/10  rounded-2xl p-5 flex flex-col items-center justify-center   hover:scale-[1.03] transition-all duration-300">
                <h3 className="text-sm text-gray-300">Total Employees</h3>
                <p className="text-2xl font-bold text-white">{totalEmployees}</p>
            </div>

            {/* Present Today */}
            <div className="bg-linear-to-br from-green-700 to-green-800  rounded-2xl p-5 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:scale-[1.03] transition-all duration-300">
                <h3 className="text-sm text-gray-300">Present Today</h3>
                <p className="text-2xl font-bold text-white">{presentToday}</p>
            </div>

            {/* Absent Today */}
            <div className="bg-linear-to-br from-red-800  to-red-900    rounded-2xl p-5 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:scale-[1.03] transition-all duration-300">
                <h3 className="text-sm text-gray-300">Absent Today</h3>
                <p className="text-2xl font-bold text-white">{absentToday}</p>
            </div>

            {/* Late Comings */}
            <div className="bg-linear-to-br from-yellow-700 to-yellow-800  rounded-2xl p-5 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:scale-[1.03] transition-all duration-300">
                <h3 className="text-sm text-gray-300">Late Comings</h3>
                <p className="text-2xl font-bold text-white">{lateComings}</p>
            </div>
        </div>
    );
};

export default HrTopStats;