
import "../../../src/boxShadow.css"

export default function Workflow() {
  const steps = [
    {
      title: "Raw Material Intake",
      icon: "📦",
      desc: "কাঁচামাল গ্রহণ ও ইনভেন্টরিতে আপডেট।",
      color: "bg-blue-600",
      border: "border-blue-50",
    },
    {
      title: "Production Planning",
      icon: "📋",
      desc: "Daily production plan তৈরি ও assign করা।",
      color: "bg-orange-500",
      border: "border-orange-200",
    },
    {
      title: "Work Assignment",
      icon: "👷",
      desc: "টিম ও মেশিনে কাজের task বিতরণ।",
      color: "bg-yellow-500",
      border: "border-yellow-200",
    },
    {
      title: "Quality Check",
      icon: "✔️",
      desc: "প্রোডাক্ট QC সম্পন্ন ও রিপোর্ট তৈরি।",
      color: "bg-yellow-600",
      border: "border-yellow-200",
    },
    {
      title: "HR & Attendance",
      icon: "📊",
      desc: " উপস্থিতি,leave,performance ট্র্যাক করা।",
      color: "bg-blue-500",
      border: "border-blue-50",
    },
    {
      title: "Final Delivery / Dispatch",
      icon: "🚚",
      desc: "Finished Goods প্রস্তুত এবং dispatch করা।",
      color: "bg-orange-600",
      border: "border-orange-200",
    },
  ];

  return (
    <div className="bg-[#0D1B2A] text-white py-16">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold">Workflow</h2>
        <p className="text-lg mt-2 text-gray-400">
          আপনার কারখানার প্রতিদিনের কাজ সহজভাবে ম্যানেজ করুন
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12 ">
          {steps.map((step, idx) => (
            <div className={`border-r-8 ${step.border} rounded-full`}>
              <div
                key={idx}
                className={` rounded-full bg-[#1B263B] shadow-lg hover:scale-105 transition ${step.color} px-2  `}
              >
                <div
                  className={`w-14 h-14 p-6  flex items-center justify-center text-3xl rounded-full mx-auto box-shadow `}
                >
                  {step.icon}
                </div>

                <h3 className="text-xl font-semibold mt-1 ">{step.title}</h3>
                <p className="text-gray-700 mt-2 pb-5 ">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
