"use client";
import { useRef, useEffect } from "react";
// Assuming you still want the GSAP animations from the original CTA
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Icons needed for the input field
import { SlPaperClip } from "react-icons/sl"; // For the paper clip icon
import { BsEmojiSmile } from "react-icons/bs"; // For the smiley icon
import { IoSend } from "react-icons/io5"; // For the send icon (using a solid version for the green button)

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function NewCTA() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Re-using the animation logic from your original CTA component
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
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  // --- Utility styles based on the image ---
  // Background color from the image: a light, slightly peachy/tannish color (#FAEBD7 is close)
  const containerBgColor = "#FAEBD7"; 
  // Text color (dark brown/black): #362312 is close to the headline text
  const headlineColor = "#362312";
  // WhatsApp green color: #25D366 (standard WhatsApp green)
  const whatsappGreen = "#25D366";

  return (
    <section 
      ref={wrapperRef} 
      className="relative w-full overflow-hidden flex justify-center items-center py-20 md:py-32 min-h-[300px]"
      style={{ backgroundColor: containerBgColor }}
    >
      <div className="relative z-10 w-full max-w-xl mx-auto text-center px-4">
        
        {/* Headline Text */}
        <h2
          className="cta-animate text-3xl md:text-5xl font-serif leading-snug"
          style={{ color: headlineColor, fontFamily: "serif" }} // Using generic serif as the specific font 'DavidLibre' might not be available
        >
          Just tell maya what you need
          <br />
          <span className="font-bold" style={{ color: whatsappGreen }}>
            on WhatsApp
          </span>
        </h2>

        {/* Input/CTA Container */}
        <div className="cta-animate mt-10 flex justify-center items-center p-2">
          <div className="relative flex items-center w-full max-w-lg h-14 bg-white rounded-full shadow-lg border border-gray-300">
            
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
            className="ml-2 w-14 h-14 rounded-full flex justify-center items-center shadow-lg transform active:scale-95 transition-transform duration-150"
            style={{ backgroundColor: whatsappGreen }}
            aria-label="Send message"
          >
            <IoSend className="text-white text-2xl rotate-90" />
          </button>
        </div>
      </div>
    </section>
  );
}