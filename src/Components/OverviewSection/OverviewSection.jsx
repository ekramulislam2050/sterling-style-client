import "../../Css/rotateBorder.css"

const OverviewSection = () => {
    return (
        <div className="relative w-full p-5">
            <div className="flex flex-col items-center mb-8 p-5">
                <h1 className="text-4xl text-center font-bold">Overview Section</h1>
                <p className="text-gray-400 pt-2 text-center lg:w-[80%] px-1 ">“আমাদের গার্মেন্টস ম্যানেজমেন্ট সিস্টেম একটি সম্পূর্ণ ইন্টিগ্রেটেড <span className="text-blue-500 ">ERP</span> যা উৎপাদন, HR, Inventory, QC, IE Efficiency সহ সব বিভাগকে একসাথে যুক্ত করে।”</p>
            </div>
            <span className="absolute inset-0 rounded-xl border-b-2 border-t-2 border-cyan-400 
        animate-rotate-border"></span>
        </div>
    );
};

export default OverviewSection;