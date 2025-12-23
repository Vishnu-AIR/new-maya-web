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
      className="h-[55vh] lg:h-[69vh] flex flex-col items-center justify-center relative overflow-hidden font-sans selection:bg-orange-300 px-4 md:px-8"
      aria-label="Maya hiring hero"
    >
      {/* Card container */}
      <div className="relative z-10 w-full max-w-6xl">
        <div
          ref={cardRef}
          className="bg-[#FFEFE3] border-2 border-orange-600  rounded-2xl px-6 py-12 md:py-16 text-center relative "
        >
          <h1
            ref={headlineRef}
            style={{ fontFamily: "DavidLibre" }}
            className="text-2xl lg:text-5xl text-[#766F6A] font-semibold mb-4 md:mb-8 text-center "
          >
            {" "}
            <span className=" text-black  mr-2">Stop asking</span>
            every freelancer <br className="block  lg:hidden " /> agency{" "}
            <br className="hidden lg:block" />
            the same <span className="text-black ">“</span>
            <span className="text-orange-600">
              Can you <br className="block  lg:hidden " /> do this in my budget?
            </span>
            <span className="text-black">”</span>
          </h1>

          <p
            ref={subRef}
            className="text-sm  lg:text-xl text-[#555555] max-w-2xl mx-auto  mb-8 font-semibold text-center mt-10 lg:mt-0 w-[7cm]  lg:w-auto "
          >
            Let Maya
            <span className=" text-orange-600 ">
              {" "}
              talk to 100+ devs, agencies, designers{" "}
            </span>
            on your behalf You only get the ones who say yes to your scope +
            price, all in one chat!
          </p>
        <div className="lg:hidden w-full flex justify-center items-center">
            <button
            type="button"
            className="group px-6 py-2 rounded-full border border-b-4 border-black bg-orange-600  hover:border-b-2 text-white font-medium flex items-center gap-2  transition-all duration-200 shadow-[0_2px_10px_rgba(255,107,53,0.12)]"
            aria-label="Try Maya now"
          >
            Try Now
            <span className="p-px rounded-md">
              <GoArrowRight />
            </span>
          </button>
        </div>
          <p className="block lg:hidden   text-gray-600 text-sm sm:text-lg mt-10">
            <span className="font-bold text-black">1000+</span> HRs &amp;
            founders are already using Maya
          </p>

          {/* Floating audio player */}
          <div
            ref={audioRef}
            className="hidden  absolute left-[58%] -translate-x-1/2 -bottom-9 sm:-bottom-10  rounded-3xl py-3 px-4 w-[92%] max-w-[390px] lg:flex items-center justify-between"
            role="region"
            aria-label="Maya audio player"
          >
            <div
              ref={actionsRef}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 "
            >
              <button
                type="button"
                className="group px-6 py-2 rounded-full border border-b-4 border-black bg-orange-600  hover:border-b-2 text-white font-medium flex items-center gap-2  transition-all duration-200 shadow-[0_2px_10px_rgba(255,107,53,0.12)]"
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

      <p className="hidden lg:block  text-gray-600 text-sm sm:text-lg mt-20">
        <span className="font-bold text-black">1000+</span> HRs &amp; founders
        are already using Maya
      </p>
    </section>
  );
};

export default FreeLancerHeroSection;
