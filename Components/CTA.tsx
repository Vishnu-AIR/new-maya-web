"use client";
import  { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWhatsapp } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CTA() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".cta-animate");

     
      gsap.set(items, {
        y: 60,
        scale: 0.95,
        opacity: 0,
        filter: "blur(10px)",
        willChange: "transform, opacity, filter",
      });

     
      gsap.to(items, {
        y: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      
      gsap.from(".cta-bg", {
        y: 80,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapperRef} className="relative w-full overflow-hidden bg-[#F1CBA4]">
      <div className="relative z-10 max-w-6xl mx-auto text-center mt-20 px-4">
        <h2
          style={{ fontFamily: "Fontspring" }}
          className="cta-animate text-4xl lg:text-6xl text-[#25170D] leading-tight"
        >
          Just Say <span className="text-orange-500">Hey</span> To{' '}
          <span>Maya</span>
          <br className="hidden md:block" />
          <span className="block md:inline"> On WhatsApp</span>
        </h2>

        <div className="cta-animate mt-8 w-full flex justify-center items-center">
          <button
            className="py-2 px-3 sm:px-5 gap-2 hover:scale-[1.03] flex justify-center items-center bg-green-500 text-white text-lg sm:text-xl rounded-2xl shadow-inner shadow-green-200 border border-b-4 border-green-600 hover:bg-green-600/90 transition duration-300"
            aria-label="Try now"
          >
            <span className="text-[#EDE3D8] p-px rounded-md">
              <FaWhatsapp className="size-8" />
            </span>
            Hey Maya
          </button>
        </div>
      </div>

      <img
        src="/Images/pp1.png"
        alt="Maya background"
        className="cta-bg w-full h-auto md:h-full object-cover object-center mt-10 md:mt-0"
        aria-hidden
      />
    </section>
  );
}
