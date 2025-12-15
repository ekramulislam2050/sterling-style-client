const LineWiseProduction = () => {
    const maxTarget = 1000;

    const lines = [
        { name: "Line 1", pcs: 850, color: "bg-emerald-400" },
        { name: "Line 2", pcs: 920, color: "bg-indigo-500" },
        { name: "Line 3", pcs: 740, color: "bg-amber-500" },
        { name: "Line 4", pcs: 740, color: "bg-amber-500" },
    ];

    return (
        <div className=" flex flex-col items-center   w-full h-full">
            <h3 className='py-1 text-green-300'>
               Line Wise Production
            </h3>
            <div className="bg-linear-to-bl from-green-500 to-green-800  rounded-xl space-y-1   p-4  w-full h-full ">
                {lines.map((line, index) => {
                    const percent = Math.round((line.pcs / maxTarget) * 100);

                    return (
                        <div key={index} className="space-y-1">
                            <div className="flex justify-between text-sm tex-[#ffffff]">
                                <span>{line.name}</span>
                                <span>{line.pcs} pcs</span>
                            </div>

                            <div className="w-full bg-gray-700 rounded-full h-1 overflow-hidden">
                                <div
                                    className={`${line.color} h-1 rounded-full transition-all duration-700`}
                                    style={{ width: `${percent}%` }}
                                />
                            </div>

                            <div className="text-xs text-gray-200 text-right">
                                {percent}%
                            </div>
                        </div>
                    );
                })}
            </div>


        </div>
    );
};

export default LineWiseProduction;
