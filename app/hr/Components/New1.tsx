"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function New1() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const topBlockRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const bottomBlockRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets: Element[] = [];
    if (topBlockRef.current) targets.push(topBlockRef.current);
    if (arrowRef.current) targets.push(arrowRef.current);
    if (bottomBlockRef.current) targets.push(bottomBlockRef.current);

    gsap.set(targets, { y: 60, scale: 0, opacity: 0, transformOrigin: "center bottom" });

    const animation = gsap.to(targets, {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    return () => {
      if ((animation as any).scrollTrigger) (animation as any).scrollTrigger.kill();
      animation.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="w-full flex justify-center  " aria-label="New1-section">
      <div className="w-full max-w-4xl text-center" ref={containerRef}>
        <div className=" flex items-center justify-center">
          <div className="flex items-center w-full lg:max-w-[18cm]  lg:ml-36">
            <div className="lg:flex justify-start items-start  rounded-lg w-full " ref={topBlockRef}>
              <h3 className="text-2xl lg:text-4xl font-semibold text-[#151515] text-start w-[50%]  ml-16 lg:mx-0">
                <h1 className="text-start  text-[#948E89] italic mt-8">then ,</h1>
                <h1 className="mt-8  w-[8cm] lg:w-auto
                ">
                  Maya will <span className="text-[#F54A00] italic">find</span> the right folks <span className="text-[#F54A00] italic">& talk</span> to them on your behalf
                </h1>
              </h3>

              <div className="">
                <img
                  className="w-[8cm] h-[8cm] object-contain ml-10  "
                  src="/SVG/Group 1171276868.svg"
                  alt="cv pile"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:mt-[1cm] w-full flex justify-center items-center" ref={arrowRef}>
            <img className="h-[3cm] lg:h-[5cm]" src="/SVG/arrow.svg" alt="" />
        </div>

        <div className=" flex items-center justify-center">
          <div className="flex items-center w-full lg:max-w-[19cm]  lg:ml-44">
            <div className="lg:flex justify-start items-start  rounded-lg w-full " ref={bottomBlockRef}>
              <h3 className="text-2xl lg:text-4xl font-semibold text-[#151515] text-start w-[50%]  ml-16 lg:mx-0">
                <h1 className="mt-20 w-[8cm] lg:w-auto">
                  <span className="text-[#F54A00] italic"> Confirms </span>
                  the budget, timeline, availability, past exp & intent
                </h1>
              </h3>

              <div className="">
                <img
                  className="w-[8cm] h-[8cm] object-contain ml-10  "
                  src="/SVG/Screenshot 2025-12-22 at 10.55.17 PM 1 (1).svg"
                  alt="cv pile"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
