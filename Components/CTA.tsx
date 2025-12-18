"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { GoArrowRight } from "react-icons/go";
import { SlPaperClip } from "react-icons/sl";
import { BsEmojiSmile } from "react-icons/bs";
import { IoSend } from "react-icons/io5";

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
    <section  className="relative w-full overflow-hidden">
      <div
        style={{
          zIndex: 5,
          background:
            "linear-gradient(to bottom, rgba(255,244,236,1) 0%, rgba(241,194,139,0.60) 30%, rgba(241,180,120,0.35) 75%, rgba(243,205,160,1) 100%)",
          mixBlendMode: "multiply",
        }}
        className="relative z-10 w-full mx-auto text-center pt-20 px-4"
      >
        <h2
          style={{ fontFamily: "DavidLibre" }}
          className="cta-animate text-4xl lg:text-6xl text-[#25170D] leading-tight font-semibold"
        >
          Just tell maya what you need
          <br />
          <span className="block md:inline  text-green-500"> On WhatsApp</span>
        </h2>

        {/* Input/CTA Container */}
        <div className="cta-animate mt-10 flex justify-center items-center p-2">
          <div className="relative flex items-center w-full max-w-lg h-14 bg-white rounded-full  border border-b-4 hover:border-b border-black">
            {/* Left Icons: Smiley */}
            <div className="px-4 text-gray-500 text-xl flex items-center">
              <BsEmojiSmile />
            </div>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Tell Maya what you are looking for..."
              className="flex-grow h-full bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-base"
              aria-label="Search or message input"
              readOnly // Assuming this is just a visual representation
            />

            {/* Right Icons: Paper Clip */}
            <div className="px-4 text-gray-500 text-xl flex items-center">
              <SlPaperClip />
            </div>

            {/* Send Button (Green Circle) - Note: Positioned outside the main input bar in the image */}
          </div>

          {/* Send Button */}
          <button
            className="ml-2 w-14 h-14 rounded-full flex justify-center items-center shadow-lg transform active:scale-95 transition-transform duration-150 bg-[#1CAB5F] border border-b-4  border-r-2 hover:border-b border-black"
            aria-label="Send message"
          >
            <IoSend className="text-white text-2xl " />
          </button>
        </div>
      </div>

      <img
        src="/Images/pp1.png"
        alt="Maya background"
        className="cta-bg w-full h-auto md:h-full object-cover object-center  relative"
        aria-hidden
        style={{ zIndex: 0 }}
      />
    </section>
  );
}
