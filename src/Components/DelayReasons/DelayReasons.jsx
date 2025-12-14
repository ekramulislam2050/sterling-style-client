const delayReasons = [
    { reason: "Machine Breakdown", count: 12 },
    { reason: "Power Failure", count: 8 },
    { reason: "Worker Absence", count: 6 },
    { reason: "Fabric Shortage", count: 4 },
];

const total = delayReasons.reduce((sum, r) => sum + r.count, 0);


const DelayReasons = () => {
    return (
        <div className="flex flex-col items-center ">
            <h3 className="py-1 text-blue-300">
                Top Delay Reasons
            </h3>
            <div className="bg-linear-to-bl from-blue-600 to-blue-900 p-5 rounded-2xl text-white shadow-lg w-full ">


                <div className="space-y-5 pb-2">
                    {delayReasons.map((item, i) => {
                        const percent = Math.round((item.count / total) * 100);

                        return (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>{item.reason}</span>
                                    <span>{percent}%</span>
                                </div>

                                <div className="w-full bg-white/20 rounded-full h-2">
                                    <div
                                        className="bg-white h-2 rounded-full transition-all"
                                        style={{ width: `${percent}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DelayReasons;