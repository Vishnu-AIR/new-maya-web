"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// register plugin on client only
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Video() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // starting state
      gsap.set(el, {
        y: 100,
        scale: 0.9,
        opacity: 0,
        filter: "blur(12px)",
        willChange: "transform, opacity, filter",
      });

      // scroll-triggered entrance
      gsap.to(el, {
        y: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      <section
        ref={wrapperRef}
        className="w-full p-4 rounded-2xl overflow-hidden"
        aria-label="Hero video"
      >
        <div className="w-full h-[48vh] sm:h-[56vh] md:h-[70vh] lg:h-[80vh] rounded-xl overflow-hidden">
          <video
            className="w-full h-full object-cover rounded-xl"
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
            src="https://mayaai-pi.vercel.app/v.mp4"
            aria-label="Background video"
          />
        </div>
      </section>
    </div>
  );
}
