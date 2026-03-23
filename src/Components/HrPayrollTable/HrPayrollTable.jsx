
const calculatePayroll = (employees = [], attendance = [], production = []) => {
    return employees.map(emp => {
        const empAttendance = attendance.filter(att => att.employeeId === emp.employeeId);
        const presentDays = empAttendance.filter(att => att.status === "Present").length;
        const lateDays = empAttendance.filter(att => att.isLate).length;

        // 🔥 Daily rate based on role
        let dailyRate = 0;
        if (emp.role === "Cutting Operator") dailyRate = 800;
        else if (emp.role === "Sewing Operator") dailyRate = 1000;
        else dailyRate = 700;

        // 🔥 Per piece salary (optional)
        const piecesProduced = production.find(p => p.employeeId === emp.employeeId)?.pieces || 0;
        const ratePerPiece = emp.ratePerPiece || 0;
        const pieceSalary = piecesProduced * ratePerPiece;

        // 🔥 Overtime calculation
        const overtime = presentDays > 26 ? (presentDays - 26) * 100 : 0;

        // 🔥 Late deduction
        const lateDeduction = lateDays * 50; // 50৳ per late day

        // 🔥 Total Salary
        const totalSalary = pieceSalary || (presentDays * dailyRate) + overtime - lateDeduction;

        // Default payment status
        const status = emp.status || "unpaid";

        return {
            ...emp,
            presentDays,
            lateDays,
            dailyRate,
            piecesProduced,
            ratePerPiece,
            pieceSalary,
            overtime,
            lateDeduction,
            totalSalary,
            status
        };
    });
};

const HrPayrollTable = ({ runningOrder = {} }) => {
    const employees = runningOrder?.hr?.assignedEmployees || [];
    const attendance = runningOrder?.hr?.attendance || [];
    const production = runningOrder?.production?.workerProduction || []; // optional

    const payrollData = calculatePayroll(employees, attendance, production);

    return (
        <div className="space-y-4">
            {/* Heading */}
            <h2 className="text-white font-bold text-lg">
               HR Payroll Details
            </h2>

            {/* Payroll Table */}
            <div className="overflow-x-auto w-full">
                <table className="min-w-[800px] md:min-w-full text-white text-sm border-collapse">
                    <thead className="bg-white/10">
                        <tr className="text-left text-gray-400">
                            <th className="px-3 py-2 sticky top-0 bg-white/10 z-10">Name</th>
                            <th className="px-3 py-2 sticky top-0 bg-white/10 z-10">Role</th>
                            <th className="px-3 py-2 sticky top-0 bg-white/10 z-10">Present</th>
                            <th className="px-3 py-2 sticky top-0 bg-white/10 z-10">Late</th>
                            <th className="px-3 py-2 sticky top-0 bg-white/10 z-10">Daily Rate</th>
                            <th className="px-3 py-2 sticky top-0 bg-white/10 z-10">Pieces</th>
                            <th className="px-3 py-2 sticky top-0 bg-white/10 z-10">Piece Salary</th>
                            <th className="px-3 py-2 sticky top-0 bg-white/10 z-10">OT</th>
                            <th className="px-3 py-2 sticky top-0 bg-white/10 z-10">Late Deduction</th>
                            <th className="px-3 py-2 sticky top-0 bg-white/10 z-10">Total</th>
                            <th className="px-3 py-2 sticky top-0 bg-white/10 z-10">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payrollData.map(emp => (
                            <tr key={emp.employeeId} className="border-t border-white/10 hover:bg-white/5 transition-all">
                                <td className="px-3 py-2">{emp.name}</td>
                                <td className="px-3 py-2">{emp.role}</td>
                                <td className="px-3 py-2">{emp.presentDays}</td>
                                <td className="px-3 py-2">{emp.lateDays}</td>
                                <td className="px-3 py-2">৳ {emp.dailyRate}</td>
                                <td className="px-3 py-2">{emp.piecesProduced}</td>
                                <td className="px-3 py-2">৳ {emp.pieceSalary}</td>
                                <td className="px-3 py-2">৳ {emp.overtime}</td>
                                <td className="px-3 py-2">৳ {emp.lateDeduction}</td>
                                <td className="px-3 py-2 text-green-400 font-bold">৳ {emp.totalSalary}</td>
                                <td className="px-3 py-2">
                                    <span className={`px-2 py-1 rounded text-xs ${emp.status === "paid"
                                        ? "bg-green-500/20 text-green-400"
                                        : "bg-red-500/20 text-red-400"
                                        }`}>
                                        {emp.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HrPayrollTable;

