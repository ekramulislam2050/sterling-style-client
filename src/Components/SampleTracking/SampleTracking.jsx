const getSampleStatus = (status) => {
    const s = status?.toLowerCase();

    if (s === "approved") {
        return {
            icon: "✔",
            circle: "bg-green-600",
            text: "text-green-300"
        };
    }

    if (s === "rejected") {
        return {
            icon: "✖",
            circle: "bg-red-600",
            text: "text-red-300"
        };
    }

    return {
        icon: "⏳",
        circle: "bg-yellow-500",
        text: "text-yellow-300"
    };
};

const SampleStep = ({ sample, isLast }) => {

    const config = getSampleStatus(sample.status);

    return (
        <div className="flex items-center">

            {/* circle */}
            <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${config.circle}`}>
                {config.icon}
            </div>

            {/* text area */}
            <div className="ml-3 min-w-[120px]">

                <p className="text-sm font-semibold">
                    {sample.name}
                </p>

                <p className={`text-xs ${config.text}`}>
                    {sample.status}
                </p>

                {sample.date && (
                    <p className="text-[11px] text-gray-300">
                        {sample.date}
                    </p>
                )}

            </div>

            {/* line */}
            {!isLast && (
                <div className="w-20 h-[3px] bg-gray-400 mx-4"></div>
            )}

        </div>
    );
};

const SampleTracking = ({ order }) => {

    const samples = order?.samples || [];

    return (
        <div className="bg-indigo-600/50 rounded-xl p-5">

            <h3 className="font-semibold mb-5 text-lg">
                Sample Development Timeline
            </h3>

            {samples.length === 0 ? (
                <p className="text-sm text-gray-200">
                    No sample data available
                </p>
            ) : (

                <div className="flex items-center overflow-x-auto pb-2">

                    {samples.map((sample, index) => (
                        <SampleStep
                            key={index}
                            sample={sample}
                            isLast={index === samples.length - 1}
                        />
                    ))}

                </div>

            )}

        </div>
    );
};

export default SampleTracking;