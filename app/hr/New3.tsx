"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function New3() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets: Element[] = [];
    if (arrowRef.current) targets.push(arrowRef.current);
    if (headingRef.current) targets.push(headingRef.current);
    if (imgRef.current) targets.push(imgRef.current);

    // initial state
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
        start: "top 85%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    return () => {
      if ((anim as any).scrollTrigger) (anim as any).scrollTrigger.kill();
      anim.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div id="faqs" className="w-full flex flex-col justify-center items-center lg:pb-20 lg:px-20" ref={containerRef} aria-label="New3-section">
      <div className="lg:mt-[1cm] w-full flex justify-center items-center" ref={arrowRef}>
       <img className="h-[3cm] lg:h-[5cm]" src="/SVG/arrow.svg" alt="" />
      </div>
      <h1 className="text-2xl lg:text-4xl w-[12cm]  text-center  font-semibold mt-5 mb-5 " ref={headingRef}>
        Sends to the perfect
        <br />
<span className="text-[#F54A00] italic">        high intent</span> profiles only
      </h1>

      <div>
        <img className=" w-full  h-full" ref={imgRef} src="/Images/resume.png" alt="resume" />

      </div>
    </div>
  );
}
