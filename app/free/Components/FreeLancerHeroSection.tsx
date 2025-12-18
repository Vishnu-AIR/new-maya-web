"use client";

import React, { useEffect, useRef } from "react";
import { GoArrowRight } from "react-icons/go";
import { IoMdHelp } from "react-icons/io";

import gsap from "gsap";
import HrMusic from "@/app/hr/Components/HrMusic";

const FreeLancerHeroSection: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const socialRef = useRef<HTMLParagraphElement | null>(null);
  const audioRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // GSAP context for safe scoping (works well in React 18 strict mode)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(cardRef.current, {
        autoAlpha: 0,
        y: 18,
        scale: 0.995,
        duration: 0.6,
      }).from(
        [
          headlineRef.current,
          subRef.current,
          actionsRef.current,
          socialRef.current,
          audioRef.current,
        ],
        { autoAlpha: 0, y: 8, stagger: 0.1, duration: 0.45 },
        "-=0.25"
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="min-h-[60vh] sm:min-h-[68vh] md:min-h-[72vh] lg:min-h-[69vh] flex flex-col items-center justify-center relative overflow-hidden font-sans selection:bg-orange-300 px-4 md:px-8"
      aria-label="Maya hiring hero"
    >
   

      {/* Card container */}
      <div className="relative z-10 w-full max-w-6xl">
        <div
          ref={cardRef}
          className="bg-[#FDF2EA] border  border-[#F54A00] rounded-2xl px-6 py-12 md:py-16 text-center relative shadow-[0_2px_0px_rgba(0,0,0,0.08)]"
        >
          <h1
            ref={headlineRef}
            style={{ fontFamily: "DavidLibre" }}
            className="text-2xl sm:text-3xl md:text-4xl text-[#766F6A] font-semibold mb-4 md:mb-8 tracking-wide"
          >
            {" "}
            <span className=" text-black  mr-2">Stop asking</span>
            every freelancer/agency <br />
            the same <span className="text-black ">“</span>
            <span className="text-[#F54A00]">
              Can you do this in my budget?
            </span>
            <span className="text-black">”</span>
          </h1>

          <p
            ref={subRef}
            className="text-base sm:text-lg md:text-xl text-[#555555] max-w-2xl mx-auto leading-relaxed mb-8 font-semibold"
          >
            Let Maya
            <span className=" text-[#F54A00]">
              {" "}
              talk to 100+ devs, agencies, designers
            </span>
            on your behalf
            <br className="" />
            You only get the ones who say yes to your scope + price, all in one
            chat!
          </p>


         

          {/* Floating audio player */}
          <div
            ref={audioRef}
            className="absolute left-1/2 -translate-x-1/2 -bottom-9 sm:-bottom-10  rounded-3xl py-3 px-4 w-[92%] max-w-[390px] flex items-center justify-between"
            role="region"
            aria-label="Maya audio player"
          >
            
          <div
            ref={actionsRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 "
          >
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-2 bg-[#FDF2EA] rounded-full border border-b-4 border-black text-black font-medium hover:border-b-2 transition-all duration-200"
              aria-label="How it works"
            >
              How it works <IoMdHelp className="text-lg" />
            </button>

            <button
              type="button"
              className="group px-6 py-2 rounded-full border border-b-4 border-[#F54A00] hover:border-b-2 text-black font-medium flex items-center gap-2 bg-[#ffcaa8] transition-all duration-200 shadow-[0_2px_10px_rgba(255,107,53,0.12)]"
              aria-label="Try Maya now"
            >
              Try Now
              <span className="p-px rounded-md">
                <GoArrowRight />
              </span>
            </button>
          </div>
          </div>
        </div>
      </div>



      <div className="p-10 flex flex-col justify-center items-center text-center mt-12 space-y-4">

        <h1 className="text-lg text-[#766F6A]">
         <span className="text-black font-semibold"> 1000+</span> of Clients are already using maya
        </h1>
      <div className="bg-white p-2 rounded-3xl border-2 border-black">
        <HrMusic/>
      </div>
      </div>
    </section>
  );
};

export default FreeLancerHeroSection;
