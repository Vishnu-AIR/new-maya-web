"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Image() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLImageElement | null>(null);
  const phoneRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // protect SSR
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const targets = [bgRef.current, phoneRef.current].filter(Boolean) as Element[];

      targets.forEach((el) => {
        // initial state
        gsap.set(el, {
          y: 80,
          scale: 0.9,
          opacity: 0,
          filter: "blur(12px)",
          willChange: "transform, opacity, filter",
        });

        // animate when wrapper enters viewport
        gsap.to(el, {
          y: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            // markers: true, // uncomment for debugging
          },
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="w-full h-full flex items-center justify-center relative"
    >
      {/* show on large screens (laptop/desktop) only */}
      <img
        ref={bgRef}
        src="/Images/md-bg1.png"
        alt="background"
        className="hidden lg:block w-full h-full object-contain"
      />

      {/* show on small & medium screens only */}
      <img
        ref={phoneRef}
        src="/Images/iPhone 16 Pro - 2.svg"
        alt="phone mockup"
        className="block lg:hidden w-full h-full object-contain"
      />
    </div>
  );
}
