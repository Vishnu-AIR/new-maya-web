"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { IoMdHelp } from "react-icons/io";
import WhatsAppChatPhone from "./Phone";
import { Highlighter } from "./ui/highlighter";
import Link from "next/link";

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
          <div className="flex flex-col lg:flex-row items-start ">
            <div className="w-full lg:w-1/2 flex justify-end items-end pt-4  pl-4 lg:pl-[1cm]">
              <div className=" animate-in w-full lg:w-[15cm] ">
                <h1 className="leading-none text-5xl lg:text-8xl animate-in">
                  <span className="text-[#ff7a1a]">1000</span>
                  <span className="text-white">'s</span>
                </h1>

                <div className="animate-in text-2xl lg:text-3xl">
                  <span style={{ fontFamily: "DavidLibre" }}>
                    <span className=""> Of</span>
                    <span className=" lg:text-4xl ml-2 text-white ">
                      <span className="">HRs, Founders & Paying Clients</span>
                    </span>

                    <span className=" lg:text-4xl leading-relaxed max-w-[44ch] text-white animate-in">
                      Are Using <span className="">Maya On WhatsApp</span> for
                      Hiring And Finding Freelancer
                    </span>
                  </span>

                  <div className="flex  gap-3 sm:gap-4 mt-6 animate-in">
                    <Link href="/free">
                      <button className=" lg:w-[6cm] w-auto p-3  gap-2 lg:px-5 lg:py-3 hover:scale-[1.03] transition-all text-white text-sm lg:text-lg rounded-full border  border-gray-300 flex justify-center items-center cursor-pointer">
                        <span>Need A Freelancer</span>
                        <IoMdHelp
                          className="text-[#F54A00]"
                          aria-hidden="true"
                        />
                      </button>
                    </Link>
                    <Link href="/hr">
                      <button className="  lg:w-[6cm] w-auto p-3  gap-2 lg:px-5 lg:py-3 hover:scale-[1.03] transition-all text-white text-sm lg:text-lg rounded-full border  border-gray-300 flex justify-center items-center cursor-pointer">
                        <span>Are You Hiring</span>
                        <IoMdHelp
                          className="text-[#F54A00]"
                          aria-hidden="true"
                        />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-start animate-in mt-10 ">
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
