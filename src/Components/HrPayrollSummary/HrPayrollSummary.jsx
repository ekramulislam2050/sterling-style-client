const HrPayrollSummary = ({ runningOrder = {} }) => {
    const payroll = runningOrder?.hr?.payrollImpact || {};
    const {
        overtimeCost = 0,
        totalSalaryPerDay = 0,
        totalWorkers = 0
    } = payroll;

    return (
        <div className="space-y-4">
            {/* Heading */}
             <h2 className="text-white font-bold text-lg">HR Payroll Summary</h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="bg-white/5 p-4 rounded-xl">
                    <h3 className="text-gray-400">Daily Salary</h3>
                    <p className="text-white text-xl font-bold">
                        ৳ {totalSalaryPerDay}
                    </p>
                </div>

                <div className="bg-yellow-500/10 p-4 rounded-xl">
                    <h3 className="text-yellow-400">Overtime Cost</h3>
                    <p className="text-yellow-300 text-xl font-bold">
                        ৳ {overtimeCost}
                    </p>
                </div>

                <div className="bg-blue-500/10 p-4 rounded-xl">
                    <h3 className="text-blue-400">Total Workers</h3>
                    <p className="text-blue-300 text-xl font-bold">
                        {totalWorkers}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default HrPayrollSummary;