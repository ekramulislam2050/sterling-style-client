
import { useEffect, useRef } from "react";
import CosmicWavesShaders from "../CosmicWavesShaders/CosmicWavesShaders"
import "../../Css/rotateBorder.css"


const Banner = () => {
  const typeRef = useRef(null)
  const typedOne = useRef(false)
  useEffect(() => {
    if (typedOne.current) return
    typedOne.current = true
    const text = "SSL ERP SYSTEM"
    let i = 0
    const type = () => {
      if (i < text.length) {
        typeRef.current.textContent += text[i];
        i++;
        setTimeout(type, 70)
      }

    }
    type()
  }, [])

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

          <p ref={typeRef}></p>
        </h1>

        <p className="text-md md:text-xl mt-4 max-w-2xl opacity-90 leading-relaxed">
          প্রোডাকশন, ইনভেন্টরি, কোয়ালিটি ও কার্যকারিতা নিয়ন্ত্রণ করুন

        </p>

        {/* <button className="px-6 py-2 mt-6 md:px-8 md:py-3 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur border border-white/40 
                transition text-lg ">
          Explore Dashboard
        </button> */}

       <button className="relative px-6 py-2 mt-6 md:px-8 md:py-3 bg-white/20 
        hover:bg-white/30 rounded-xl backdrop-blur border border-white/40 
        transition text-lg overflow-hidden">

  <span className="relative z-10">Explore Dashboard</span>

  {/* Rotating Border */}
  <span className="absolute inset-0 rounded-xl border-2 border-cyan-400 
        animate-rotate-border"></span>
</button>


         
      </div>
    </div>
  );
};

export default Banner;


