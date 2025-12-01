const features = [
    {
        icon: "🗂️",
        title: "Production Planning",
        desc: "উৎপাদন পরিকল্পনা এবং সময়সূচি নির্ধারণ"
    },
    {
        icon: "📦",
        title: "Inventory Management",
        desc: "কাঁচামাল ও সমাপ্ত পণ্যের স্টক ট্র্যাক করুন"
    },
    {
        icon: "✅",
        title: "QC & Compliance",
        desc: "গুণগত মান নিশ্চিত করুন এবং কমপ্লায়েন্স বজায় রাখুন"
    },
    {
        icon: "📊",
        title: "Efficiency & SMV Tracking",
        desc: "লাইন দক্ষতা ও SMV রিয়েল-টাইমে পর্যবেক্ষণ"
    },
    {
        icon: "👥",
        title: "HR / Attendance",
        desc: "কর্মীদের উপস্থিতি ও HR কার্যক্রম পরিচালনা"
    }
];

const FeatureAndModules = () => {
    return (
        <div className="w-full py-16 bg-black/20 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 text-center">
                     {/* heading------------------ */}
                <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg ">
                    Key Modules & Features

                </h2>
                <p className="mb-8 text-gray-400 pt-2 ">গুরুত্বপূর্ণ বিভাগ ও সুবিধাসমূহ</p>

                  {/* card---------------------- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {features.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col items-center justify-center 
                         hover:scale-105 transition-transform duration-300 shadow-lg shadow-cyan-900/20 border border-blue-400 border-r-0 border-b-0"
                        >
                            <div className="text-4xl mb-4 text-cyan-300">{item.icon}</div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                                {item.title}
                            </h3>
                            <p className="text-sm text-white/80 text-center">{item.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default FeatureAndModules;
