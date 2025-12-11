"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWhatsapp } from "react-icons/fa";
import { IoMdHelp } from "react-icons/io";
import WhatsAppChatPhone from "./Phone";
import { Highlighter } from "./ui/highlighter";

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
    <div className="w-full" ref={rootRef}>
      <section
        className="w-full bg-[#030201] text-white flex items-start lg:pt-[4cm] lg:pb-[6cm]  overflow-hidden"
        aria-label="Maya on WhatsApp — Need freelancers"
      >
        <div className="lg:w-[86%] mx-auto w-full px-6 py-5 pb-5">
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
            <div
              style={{ fontFamily: "DavidLibre" }}
              className="w-full lg:w-1/2 flex justify-end items-end pt-0  pl-0 lg:pl-[1cm]"
            >
              <div className="w-full animate-in">
                <h1 className="leading-none text-5xl lg:text-8xl animate-in">
                  <span className="text-[#ff7a1a]">1000</span>
                  <span className="text-white">'s</span>
                </h1>

                <div className="animate-in text-lg lg:text-3xl">
                  <span className=""> Of</span>
                  <span className=" lg:text-4xl ml-2 text-white ">
                    <Highlighter action="highlight" color="#4e2D00">
                      HRs, Founders & Paying Clien
                      <span className="bg-[#4E2D00]">ts</span>
                    </Highlighter>{" "}
                  </span>

                  <p className=" lg:text-4xl leading-relaxed max-w-[44ch] text-white animate-in">
                    Are Using <span className="">Maya On WhatsApp</span> for
                    Hiring And Finding Freelancer
                  </p>

                  <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 mt-6 animate-in">
                    <button className=" lg:w-[6cm] w-[5cm] flex items-center gap-2 px-5 py-3 hover:scale-[1.03] transition-all text-white text-base sm:text-xl rounded-full border  border-gray-300">
                      <span>Need A Freelancer</span>
                      <IoMdHelp className="text-[#F54A00]" aria-hidden="true" />
                    </button>

                    <button className="  lg:w-[6cm] w-[5cm]  flex items-center gap-2 px-5 py-3 hover:scale-[1.03] transition-all text-white text-base sm:text-xl rounded-full border  border-gray-300">
                      <span>Are You Hiring</span>
                      <IoMdHelp className="text-[#F54A00]" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-start animate-in ">
              <div className="lg:absolute ">
                <WhatsAppChatPhone />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
