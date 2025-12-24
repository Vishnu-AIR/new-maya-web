import React, { useEffect, useRef } from "react";
import { SlPaperClip } from "react-icons/sl";
import { BsEmojiSmile } from "react-icons/bs";
import { IoSend } from "react-icons/io5";

type Props = {
  /** Optional: WhatsApp number in international format without +, e.g. '919999999999' */
  whatsappNumber?: string;
  placeholder?: string;
};

export default function NewCTA({ whatsappNumber = "", placeholder = "Tell Maya what you are looking for..." }: Props) {
  const containerBgColor = "#FAEBD7";
  const headlineColor = "#362312";
  const whatsappGreen = "#25D366";

  const revealRef = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver-based reveal (works across browsers and respects prefers-reduced-motion)
  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;

    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // If user prefers reduced motion, just reveal instantly
      el.querySelectorAll(".reveal").forEach((c) => c.classList.add("is-visible"));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    el.querySelectorAll(".reveal").forEach((c) => obs.observe(c));

    return () => obs.disconnect();
  }, []);

  const openWhatsApp = () => {
    if (!whatsappNumber) return;
    const encoded = encodeURIComponent(placeholder);
    const url = `https://wa.me/${whatsappNumber}?text=${encoded}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      className="cta-section relative w-full overflow-hidden flex justify-center items-center"
      style={{ backgroundColor: containerBgColor }}
      aria-labelledby="cta-heading"
    >
      <div ref={revealRef} className="relative z-10 w-full max-w-5xl mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-28">
        {/* content wrapper centers and gives responsive width */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Headline */}
          <h2
            id="cta-heading"
            className="reveal text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif leading-tight"
            style={{ color: headlineColor }}
          >
            Just tell Maya what you need
            <br />
            <span className="font-bold" style={{ color: whatsappGreen }}>
              on WhatsApp
            </span>
          </h2>

          {/* Input / CTA: stacked on small screens, horizontal on md+ */}
          <div className="reveal mt-6 sm:mt-8 flex flex-col md:flex-row items-stretch justify-center gap-3 md:gap-4">
            <div className="flex-1">
              <label htmlFor="maya-input" className="sr-only">
                {placeholder}
              </label>

              <div className="relative w-full">
                <div className="flex items-center w-full bg-white rounded-full shadow-sm border border-gray-200 h-12 sm:h-14 md:h-16 px-3 sm:px-4">
                  <div className="flex items-center shrink-0 text-gray-500 text-lg sm:text-xl mr-3" aria-hidden>
                    <BsEmojiSmile />
                  </div>

                  <input
                    id="maya-input"
                    type="text"
                    readOnly
                    aria-readonly
                    placeholder={placeholder}
                    className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none text-sm sm:text-base md:text-lg"
                    // keep readOnly so designers can control behaviour externally; remove if you want it actually editable
                  />

                  <button
                    type="button"
                    className="ml-3 shrink-0 p-2 rounded-full hover:bg-gray-100 active:scale-95 transition-transform"
                    aria-label="Attach file"
                    title="Attach"
                  >
                    <SlPaperClip className="text-gray-500 text-lg sm:text-xl" />
                  </button>
                </div>
              </div>
            </div>

            {/* Send button: full width on small screens, circular icon on medium+ */}
            <div className="flex-shrink-0 w-full md:w-auto">
              {/* On small screens show a full-width action button for easier tapping */}
              <button
                onClick={openWhatsApp}
                className="w-full md:w-14 h-12 sm:h-14 md:h-14 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ backgroundColor: whatsappGreen }}
                aria-label={whatsappNumber ? "Send via WhatsApp" : "Send"}
                title={whatsappNumber ? "Open WhatsApp chat" : "Send"}
              >
                {/* On narrow screens, show label + icon; on md+ only icon */}
                <span className="hidden md:inline-block sr-only">Send</span>
                <IoSend className="text-white text-lg sm:text-2xl md:text-2xl rotate-90" aria-hidden />
              </button>
            </div>
          </div>

          {/* small helper text */}
          <p className="reveal mt-3 text-xs sm:text-sm text-gray-600">
            Quick, personal help — reply on WhatsApp for faster back-and-forth.
          </p>
        </div>
      </div>

      {/* Scoped styles for the reveal animation and responsive tweaks */}
      <style jsx>{`
        /* Reveal animations (CSS driven, triggered by JS observer) */
        .reveal {
          opacity: 0;
          transform: translateY(24px) scale(0.995);
          filter: blur(6px);
          transition: opacity 520ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 520ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 520ms ease;
        }

        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
        }

        /* Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .reveal,
          .reveal.is-visible {
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
            filter: none !important;
          }
        }

        /* Slight layout refinement on very small screens */
        @media (max-width: 420px) {
          .cta-section {
            padding-top: 1rem;
            padding-bottom: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
