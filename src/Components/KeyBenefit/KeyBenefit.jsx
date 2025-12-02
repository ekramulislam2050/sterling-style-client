const KeyBenefits = () => {


    return (

        <div className="mt-15">
            <div className="flex flex-col items-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex justify-center  ">
                    Key Benefits
                </h2>
                <p className="text-gray-400 pt-2 text-center lg:w-[80%] px-1 ">আপনি কেন আপনার কারখানার এই সিস্টেম ব্যবহার করবেন তা নিম্নে দেখুন</p>
            </div>
            <div className="md:flex justify-center">

                <div className="flex flex-col mt-22 items-center">
                    {/* first avatar------------- */}
                    <div className="avatar">
                        <div className="mask mask-hexagon-2 w-59  bg-blue-500 shadow-lg hover:scale-105 transition ">
                            <div className="flex flex-col items-center ">
                                <p className="text-5xl py-4"> ⚡</p>
                                <h3 className="font-bold text-lg">Real-Time Data</h3>
                                <p className="text-sm tracking-wide text-center pt-1 px-1">উৎপাদন, উপস্থিতি ও স্টক সব কিছু মুহূর্তেই আপডেট।</p>
                            </div>
                        </div>
                    </div>

                    {/* 2nd avatar------------- */}
                    <div className="avatar">
                        <div className="mask mask-hexagon-2 w-59  bg-[#cc9b1b]   shadow-lg hover:scale-105 transition">
                            <div className="flex flex-col items-center ">
                                <p className="text-5xl py-4"> 📈</p>
                                <h3 className="font-bold text-lg">Efficiency Monitoring</h3>
                                <p className="text-sm tracking-wide text-center pt-1 px-1">SMV ও Efficiency রিয়েল-টাইমে মনিটর করা যায়।</p>
                            </div>
                        </div>
                    </div>

                    {/* 3rd avatar------------- */}
                    <div className="avatar">
                        <div className="mask mask-hexagon-2 w-59  bg-blue-500 shadow-lg hover:scale-105 transition   ">
                            <div className="flex flex-col items-center ">
                                <p className="text-5xl py-4"> 🤖</p>
                                <h3 className="font-bold text-lg">Automated HR</h3>
                                <p className="text-sm tracking-wide text-center pt-1 px-1">উপস্থিতি, লিভ, ও টিম ম্যানেজমেন্ট স্বয়ংক্রিয়ভাবে পরিচালনা।</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 4th avatar-------------------- */}
                <div className="flex flex-col items-center">
                    <div className="avatar">
                        <div className="mask mask-hexagon-2 w-59  bg-[#cc9b1b]   shadow-lg hover:scale-105 transition">
                            <div className="flex flex-col items-center ">
                                <p className="text-5xl py-4"> 📊</p>
                                <h3 className="font-bold text-lg">Smart Reports</h3>
                                <p className="text-sm tracking-wide text-center pt-1 px-1">প্রোডাকশন, HR ও QC-এর উন্নত রিপোর্ট তৈরি।</p>
                            </div>
                        </div>
                    </div>

                    {/* 5th avatar------------- */}
                    <div className="avatar">
                        <div className="mask mask-hexagon-2 w-59  bg-blue-500  shadow-lg hover:scale-105 transition">
                            <div className="flex flex-col items-center ">
                                <p className="text-5xl py-4"> ☁️</p>
                                <h3 className="font-bold text-lg">Cloud-Based System</h3>
                                <p className="text-sm tracking-wide text-center pt-1 px-1">যেকোনো ডিভাইস থেকে নিরাপদে সিস্টেম ব্যবহার।</p>
                            </div>
                        </div>
                    </div>

                    {/* 6th avatar------------- */}
                    <div className="avatar">
                        <div className="mask mask-hexagon-2 w-59  bg-[#cc9b1b]   shadow-lg hover:scale-105 transition">
                            <div className="flex flex-col items-center ">
                                <p className="text-5xl py-4"> 📱</p>
                                <h3 className="font-bold text-lg">Mobile Optimized</h3>
                                <p className="text-sm tracking-wide text-center pt-1 px-1">মোবাইল/ট্যাব থেকেও সব ফিচার ব্যবহারযোগ্য।</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KeyBenefits;
