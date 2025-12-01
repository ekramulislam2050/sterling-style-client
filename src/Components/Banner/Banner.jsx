import CosmicWavesShaders from "../CosmicWavesShaders/CosmicWavesShaders"

const Banner = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">

            {/* Background Shader */}
            <CosmicWavesShaders className="z-10"></CosmicWavesShaders>

            {/* Overlay */}
            <div className=" 
            absolute inset-0 z-10 flex flex-col items-center justify-center 
                      text-white   px-4 text-center">

                {/* Stylish Title */}
                <h1 className="text-4xl lg:text-5xl md:text-5xl font-extrabold tracking-wide 
               bg-linear-to-r from-cyan-300 via-blue-400 to-cyan-300 
               text-transparent bg-clip-text 
               drop-shadow-[0_0_35px_rgba(0,200,255,0.6)]">
                    SSL ERP SYSTEM
                </h1>

                <p className="text-md md:text-xl mt-4 max-w-2xl opacity-90 leading-relaxed">
                    প্রোডাকশন, ইনভেন্টরি, কোয়ালিটি ও কার্যকারিতা নিয়ন্ত্রণ করুন

                </p>

                <button className="px-6 py-2 mt-6 md:px-8 md:py-3 bg-white/20 hover:bg-white/30 
                           rounded-xl backdrop-blur border border-white/40 
                           transition text-lg">
                    Explore Dashboard
                </button>

            </div>
        </div>
    );
};

export default Banner;