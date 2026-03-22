const HrEmployeeLIst = ({ runningOrder = {} }) => {
    // Safe access
    const employees = runningOrder?.hr?.assignedEmployees || [];
    
    return (
        <div className="space-y-3">
            <h2 className="text-white font-bold text-lg">Assigned Employees</h2>
            {employees.length === 0 ? (
                <p className="text-gray-300">No employees assigned.</p>
            ) : (
                <ul className="space-y-2">
                    {employees.map((emp, index) => (
                        <li
                            key={emp.employeeId || index}
                            className="bg-white/10 p-3 rounded-lg flex justify-between items-center text-white shadow-sm"
                        >
                            <span>{emp.name} ({emp.role})</span>
                            <span className="text-gray-300 text-sm">{emp.department}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HrEmployeeLIst;