"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function FreeNew1() {
  const containerRef = useRef<HTMLElement | null>(null);
  const topBlockRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLImageElement | null>(null);
  const bottomBlockRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets: Element[] = [];
    if (topBlockRef.current) targets.push(topBlockRef.current);
    if (arrowRef.current) targets.push(arrowRef.current);
    if (bottomBlockRef.current) targets.push(bottomBlockRef.current);

    if (targets.length === 0) return;

    gsap.set(targets, { y: 60, scale: 0.95, opacity: 0, transformOrigin: "center bottom" });

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
      try {
        if ((animation as any).scrollTrigger) (animation as any).scrollTrigger.kill();
      } catch (e) {
        /* ignore */
      }
      animation.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="w-full flex justify-center  ">
      <div className="w-full max-w-4xl text-center">
        {/* Top block */}
        <div ref={topBlockRef} className=" flex items-center justify-center">
          <div className="flex items-center w-full lg:max-w-[18cm]  lg:ml-36">
            <div className="lg:flex justify-start items-start  rounded-lg w-full ">
              <div className="text-2xl lg:text-4xl font-semibold text-[#151515] text-start w-[50%]  ml-16 lg:mx-0">
                <div className="text-start  text-[#948E89] italic mt-8">then ,</div>
                <div
                  className="mt-8  w-[8cm] lg:w-auto"
                >
                  Maya will <span className="text-[#F54A00] italic">find</span> the right folks <span className="text-[#F54A00] italic">& talk</span> to them on your behalf
                </div>
              </div>

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

        <div className="mt-[1cm] w-full flex justify-center items-center">
          <img ref={arrowRef} className="h-[3cm] lg:h-[5cm]" src="/SVG/arrow.svg" alt="" />
        </div>

        {/* Bottom block (avatar left + card right but reversed layout like image) */}
        <div ref={bottomBlockRef} className=" flex items-center justify-center">
          <div className="flex items-center w-full lg:max-w-[19cm]  lg:ml-44">
            <div className="lg:flex justify-start items-start  rounded-lg w-full ">
              <div className="text-2xl lg:text-4xl font-semibold text-[#151515] text-start w-[50%]  ml-16 lg:mx-0">
                <div className="mt-20 w-[8cm] lg:w-auto">
                  <span className="text-[#F54A00] italic"> Confirms </span>
                  the budget, timeline, availability, past exp & intent
                </div>
              </div>

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
