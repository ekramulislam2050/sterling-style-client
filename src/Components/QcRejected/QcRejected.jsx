

const QcRejected = () => {
    const qcData = {
        passed: 842,
        rejected: 58,
    };

    const total = qcData.passed + qcData.rejected;
    return (
        <div className="px-1 mt-3">
            <div className=" bg-linear-to-br to-red-900 via-green-900 from-indigo-900 p-5 rounded-xl shadow-lg text-white">
                <h3 className="text-lg font-semibold mb-4">QC Status</h3>

                <div className="flex justify-between items-center mb-3">
                    <span className="text-green-400">✔ Passed</span>
                    <span className="font-bold">{qcData.passed}</span>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <span className="text-red-400">✖ Rejected</span>
                    <span className="font-bold">{qcData.rejected}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                    <div
                        className="bg-green-500 h-3"
                        style={{ width: `${(qcData.passed / total) * 100}%` }}
                    />
                </div>

                <p className="text-xs text-slate-300 mt-2">
                    Passed Rate: {Math.round((qcData.passed / total) * 100)}%
                </p>
            </div>
        </div>




    );
};

export default QcRejected;