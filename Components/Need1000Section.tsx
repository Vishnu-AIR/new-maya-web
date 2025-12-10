"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FaWhatsapp } from "react-icons/fa";
import { IoMdHelp } from "react-icons/io";
import WhatsAppChatPhone from "./Phone";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Need1000Section() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const elems = gsap.utils.toArray<HTMLElement>(".animate-in");

      gsap.from(elems, {
        y: 48,
        opacity: 0,
        scale: 0.95,
        filter: "blur(10px)",
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

     
      gsap.from(".phone", {
        y: 90,
        opacity: 0,
        scale: 0.85,
        filter: "blur(14px)",
        duration: 1.1,
        ease: "elastic.out(1, 0.55)",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#FFF4EC] w-full p-1 lg:p-3" ref={rootRef}>
      <section
        className="w-full bg-[#030201] text-white flex items-start rounded-2xl"
        aria-label="Maya on WhatsApp — Need freelancers"
      >
        <div className="max-w-[90%] mx-auto w-full px-6 pt-10 lg:pt-[4cm] pb-5">
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
            
            <div className="w-full lg:w-1/2 flex items-start">
              <div className="w-full animate-in">
                <h1
                  className="leading-none font-serif text-[4.5rem] sm:text-[5.5rem] md:text-[6.5rem] lg:text-[9rem] animate-in"
                  style={{ fontFamily: "Fontspring" }}
                >
                  <span className="text-[#ff7a1a]">1000</span>
                  <span className="text-white">'s</span>
                </h1>

                <div className="mt-6 md:mt-10 animate-in">
                  <span className="inline-block text-lg sm:text-3xl font-medium text-[#25170D] px-3 py-1.5 rounded-lg bg-[#FFF6EC]">
                    Of HRs, Founders & Paying Clients
                  </span>

                  <p className="mt-4 ml-0 sm:ml-2 text-base sm:text-xl md:text-2xl leading-relaxed max-w-[44ch] text-white animate-in">
                    Are Using <span className="font-semibold">Maya On WhatsApp</span> for Hiring And Finding Freelancer
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 animate-in">
                    <button className="flex items-center gap-3 px-3 py-3 hover:scale-[1.03] transition-transform bg-green-500 text-white text-base sm:text-xl rounded-2xl shadow-inner shadow-green-200 border border-b-4 border-green-600 hover:bg-green-600/90">
                      <FaWhatsapp size={26} />
                      <span>Need A Freelancer</span>
                      <IoMdHelp />
                    </button>

                    <button className="flex items-center gap-3 px-3 py-3 hover:scale-[1.03] transition-transform bg-green-500 text-white text-base sm:text-xl rounded-2xl shadow-inner shadow-green-200 border border-b-4 border-green-600 hover:bg-green-600/90">
                      <FaWhatsapp size={26} />
                      <span>Are You Hiring</span>
                      <IoMdHelp />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-start animate-in">
             <WhatsAppChatPhone/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
