"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { GoArrowRight } from "react-icons/go";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".footer-animate");

      gsap.set(items, {
        y: 60,
        opacity: 0,
        scale: 0.95,
        filter: "blur(10px)",
        willChange: "transform, opacity, filter",
      });

      gsap.to(items, {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".footer-mascot", {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="bg-[#DE9F33] w-full relative flex justify-end items-end py-8 sm:py-0"
    >
      <img
        className="footer-mascot absolute bottom-0 left-0 sm:left-[10%] md:left-[12%] lg:left-[10%] w-20 lg:w-[190px] h-auto select-none pointer-events-none"
        src="/Images/maya2.png"
        alt="maya"
      />

      <div className="absolute top-[7%] sm:-top-[10%] md:-top-[20%] left-[20%] sm:left-[26%] md:left-[26%] flex flex-col justify-center items-start gap-3 sm:gap-4  lg:font-semibold ">
        <button className="footer-animate flex items-center gap-1 lg:gap-3 py-2 px-2 lg:px-3 hover:scale-[1.03] bg-white text-black text-sm lg:text-lg rounded-xl transition-all  duration-300 hover:bg-gray-200 cursor-pointer">
          <span className="truncate">Need A Freelancer</span>
          <GoArrowRight className="-rotate-45 text-[#FF6900]" />
        </button>

        <button className="footer-animate flex items-center gap-1 lg:gap-3 py-2 px-2 lg:px-3 hover:scale-[1.03] bg-white text-black text-sm lg:text-lg rounded-xl transition-all duration-300 hover:bg-gray-200 cursor-pointer">
          <span className="truncate">Want to hire</span>
          <GoArrowRight className="-rotate-45 text-[#FF6900]" />
        </button>

        <button className="footer-animate flex items-center gap-1 lg:gap-3 py-2 px-2 lg:px-3 hover:scale-[1.03] bg-white text-black text-sm lg:text-lg rounded-xl transition-all duration-300 hover:bg-gray-200 cursor-pointer">
          <span className="truncate">Looking For Jobs And Gigs</span>
          <GoArrowRight className="-rotate-45 text-[#FF6900]" />
        </button>
      </div>

      <div className="footer-animate flex flex-col justify-end items-end p-4 sm:p-5 text-xs sm:text-lg text-[#25170D]/80 font-semibold space-y-1 sm:space-y-2">
        <h1>Terms & Conditions</h1>
        <h1>Privacy Policy</h1>
        <h1>Meshly Technologies Pvt. Ltd.</h1>
        <h1>© 2026</h1>
      </div>
    </div>
  );
}
