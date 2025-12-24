"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Highlighter } from "@/Components/ui/highlighter";


if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function FreeHowThisWork() {
  const containerRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const firstCardRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLImageElement | null>(null);

  const secondCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;


    const targets: (Element | null)[] = [
      headingRef.current,
      firstCardRef.current,
      arrowRef.current,
      secondCardRef.current,
    ].filter(Boolean);

    if (targets.length === 0) return;

    gsap.set(targets, {
      y: 50,
      scale: 0.95,
      opacity: 0,
      transformOrigin: "center bottom",
    });

    const anim = gsap.to(targets, {
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
      try {
        if ((anim as any).scrollTrigger) (anim as any).scrollTrigger.kill();
      } catch (e) {
        console.error(e);
      }
      anim.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="w-full flex justify-center py-16 px-6 "
    >
      <div className="w-full max-w-4xl text-center">
        <h2
          ref={headingRef}
          style={{ fontFamily: "DavidLibre" }}
          className="text-3xl md:text-4xl font-semibold text-[#231915]"
        >
          <Highlighter action="underline" color="#FF6A2E">
            How Maya Works <span className="text-[#FF6A2E]">?</span>
          </Highlighter>
        </h2>

        <div className="mt-[2cm] flex items-center justify-center">
          <div className="w-full  max-w-[13cm]">
            <div className="flex items-center gap-6 md:gap-8">
              <div
                ref={firstCardRef}
                className="flex justify-start items-start h-[34vh] rounded-lg border border-r-3 border-b-3 border-[#1f1f1f]  relative bg-[#FFEADA]"
              >
                <img
                  className="w-[3cm] mt-8 lg:mt-0 lg:w-[5cm] h-full object-contain  "
                  src="/Images/maya2.png"
                  alt="cv pile"
                />
                <div className=" p-6">
                  <h3 className="text-xl lg:text-2xl font-semibold text-[#151515] text-left ">
                    Just tell
                    <span
                      style={{ fontFamily: "DavidLibre" }}
                      className="text-[#F54A00] ml-1 mr-1"
                    >
                      Maya
                    </span>
                    your
                    <br />
                    project requirements
                  </h3>

                  <div className="mt-4 text-sm md:text-base text-black text-left">
                    <div className="lg:flex gap-10">
                      <div className="flex gap-3">
                        <img
                          className="w-6 h-6 "
                          src="/Images/streamline-freehand-color_money-bag.png"
                          alt="Timeline"
                        />
                        <span>Budget</span>
                      </div>

                      <div className="flex gap-3 mt-3 lg:mt-0">
                        <img
                          className="w-6 h-6 "
                          src="/Images/game-icons_sands-of-time.png"
                          alt="Budget"
                        />
                        <span>Timeline</span>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-2 mb-2">
                      <img
                        className="w-6 h-6 "
                        src="/Images/solar_telescope-broken.png"
                        alt="Budget"
                      />
                      <span>Scope of work</span>
                    </div>

                    <div className="flex gap-3 mt-2 mb-2">
                      <img
                        className="w-6 h-6 "
                        src="/Images/carbon_term-reference.png"
                        alt="Budget"
                      />
                      <span>Reference work</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:mt-[1cm] lg:mb-[1cm] w-full flex justify-center items-center">
          <img
            ref={arrowRef}
            className="h-[3cm] lg:h-[5cm]"
            src="/SVG/arrow.svg"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
