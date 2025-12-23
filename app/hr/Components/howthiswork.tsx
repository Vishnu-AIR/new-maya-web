"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Highlighter } from "@/Components/ui/highlighter";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HowThisWorks({}: {}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const firstCardRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const secondCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // collect elements to animate (only those that exist)
    const targets: Element[] = [];
    if (headingRef.current) targets.push(headingRef.current);
    if (firstCardRef.current) targets.push(firstCardRef.current);
    if (arrowRef.current) targets.push(arrowRef.current);
    if (secondCardRef.current) targets.push(secondCardRef.current);

    // set initial state to avoid flicker
    gsap.set(targets, { y: 50, scale: 0, opacity: 0, transformOrigin: "center bottom" });

    const anim = gsap.to(targets, {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: container,
        start: "top 80%", // when the top of the container is 80% down the viewport
        toggleActions: "play none none none",
        once: true, // ensure animation runs only once when triggered
      },
    });

    return () => {
      // clean up the animation and its ScrollTrigger
      if ((anim as any).scrollTrigger) (anim as any).scrollTrigger.kill();
      anim.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section  id="how-it-works" className="w-full flex justify-center lg:py-16 px-6 " aria-label="How Maya Works">
      <div className="w-full max-w-4xl text-center" ref={containerRef}>
        <h2
          ref={headingRef}
          style={{ fontFamily: "DavidLibre" }}
          className="text-3xl md:text-6xl font-semibold text-[#231915]"
        >
          <Highlighter action="underline" color="#FF6A2E">
            How Maya Works <span className="text-[#FF6A2E]">?</span>
          </Highlighter>
        </h2>

        <div className="mt-[2cm] flex items-center justify-center w-full">
          <div className="flex items-center   ">
            <div className=" justify-start items-start rounded-lg " ref={firstCardRef}>
              <h3 className="text-2xl lg:text-4xl text-center font-semibold text-[#151515]  ">
                <span className="text-[#F54A00] italic"> Too many</span> CV’s, {" "}
                <br />
                from different platforms ?
              </h3>

              <img
                className="w-full h-[8cm] object-contain  lg:ml-10 lg:mt-10"
                src="/Images/Group 1171276869.png"
                alt="cv pile"
              />
            </div>
          </div>
        </div>
        <div className="lg:mt-[1cm] lg:mb-[1cm] w-full flex justify-center items-center" ref={arrowRef}>
          <img className="h-[3cm] lg:h-[5cm]" src="/SVG/arrow.svg" alt="arrow" />
        </div>

        <div className="mt-6 flex items-center justify-center">
          <div className="w-full  max-w-[13cm]">
            <div className="flex items-center gap-6 md:gap-8">
              <div className="flex justify-start items-start  rounded-lg  relative" ref={secondCardRef}>
                <img
                  className="w-[4cm] lg:w-[9cm] h-[4cm] lg:h-[6cm] object-contain border border-b-4 border-r-4 border-black bg-[#FFEFE3] rounded-lg"
                  src="/Images/maya2.png"
                  alt="maya"
                />
                <div className=" pl-5">
                  <h3 className="text-2xl lg:text-4xl font-medium text-[#151515] text-left mt-5">
                    Just hand <br />
                    them <span className="text-[#F54A00] italic">Maya</span>
                  </h3>

                  <p className=" text-md lg:text-2xl text-[#6b6b6b]  text-left mt-5">
                    Send/Upload all your CV's from any where to maya
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:mt-[1cm] w-full flex justify-center items-center">
          <img className="h-[3cm] lg:h-[5cm]" src="/SVG/arrow.svg" alt="" />
        </div>
      </div>
    </section>
  );
}
