"use client";

import React, { useEffect, useRef } from "react";
import { GoArrowRight } from "react-icons/go";
import gsap from "gsap";

const HRHeroSection: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const socialRef = useRef<HTMLParagraphElement | null>(null);
  const audioRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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
      className="h-[60vh] lg:h-[69vh] flex items-start justify-center relative overflow-hidden font-sans selection:bg-orange-300 px-4 md:px-8"
      aria-label="Maya hiring hero"
    >
      <div
        className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none"
        aria-hidden
      >
        <div className="hero-circle absolute -top-[53%] rounded-full border-2 border-dashed border-[#25170D]/50 opacity-50 animate-pulse w-[220px] h-[220px] sm:w-[420px] sm:h-[420px] md:w-[700px] md:h-[700px] lg:w-[900px] lg:h-[900px] xl:w-[1400px] xl:h-[1400px]" />
        <div className="hero-circle absolute -top-[30%] rounded-full border-2 border-dashed border-[#25170D]/50 opacity-40 animate-pulse w-[180px] h-[180px] sm:w-[360px] sm:h-[360px] md:w-[600px] md:h-[600px] lg:w-[750px] lg:h-[750px] xl:w-[1000px] xl:h-[1000px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl">
        <div
          ref={cardRef}
          className="w-full bg-[#FFEFE3] border border-r-2 border-b-4 border-black rounded-lg px-6 py-12 md:py-16 text-center relative shadow-[0_2px_0px_rgba(0,0,0,0.08)]"
        >
          <h1
            ref={headlineRef}
            style={{ fontFamily: "DavidLibre" }}
            className="text-4xl md:text-6xl text-[#8E8E8E] mt-10 mb-4 md:mb-8 tracking-wide font-extrabold"
          >
            Too many CVs? <br className="lg:hidden" /> <span className="text-black ">Hand them to </span>
            <span className="text-[#F54A00]  ">Maya</span>
          </h1>

          <p
            ref={subRef}
            className="text-base sm:text-lg md:text-xl text-[#555555] lg:max-w-2xl mx-auto leading-relaxed mb-8  font-semibold mt-10"
          >
            She{" "}
            <span className=" text-[#F54A00]">talks to 1000+ applicants</span>{" "}
            on your behalf
            <br className="hidden lg:block" />
            &amp; sends profiles that fit in your <span className="text-black">budget + timeline + experience</span>
          </p>

          <div
            ref={actionsRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6"
          >
            <button
              type="button"
              className="group px-6 py-2 rounded-full border border-b-4 border-black  bg-[#F54A00] hover:border-b-2 text-white font-medium flex items-center gap-2 transition-all duration-200 shadow-[0_2px_10px_rgba(255,107,53,0.12)]"
              aria-label="Try Maya now"
            >
              Try Now
              <span className="p-px rounded-md">
                <GoArrowRight />
              </span>
            </button>
          </div>

          <p ref={socialRef} className="text-gray-600 text-sm sm:text-lg">
            <span className="font-bold text-black">1000+</span> HRs &amp;
            founders are already using Maya
          </p>
        </div>
      </div>
    </section>
  );
};

export default HRHeroSection;
