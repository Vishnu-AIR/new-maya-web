"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";

type Item = {
  img: string;
  text: string;
};

export default function Marqueue() {
  const items = [
    "I Am A Backend Dev",
    "I Am A Designer",
    "I Am A FreeLancer ",
    "I Ship Clean Code",
    "Open To Freelance & Jobs",
  ];

  const rightItems: Item[] = [
    {
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=60",
      text: "I Got $1K Freelance Client",
    },
    {
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=60",
      text: "I Got 50 LPA Job",
    },
    {
      img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=60",
      text: "I Got 20k Internship",
    },
    {
      img: "https://images.unsplash.com/photo-1545996124-0b2d7a0d9d0f?w=600&auto=format&fit=crop&q=60",
      text: "Launched First Product",
    },
    {
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=60",
      text: "Interviewed at FAANG",
    },
  ];

  const leftGroups = 5;
  const repeatCount = 5;

  return (
    <div className="w-full h-full flex relative">
      {/* LEFT MARQUEE */}
      <div className="left-parent w-[50%] overflow-hidden flex justify-center items-center">
        <div
          className="marquee-track left-track flex whitespace-nowrap items-center gap-8 will-change-transform text-[#25170D]"
          style={
            {
              "--groups": leftGroups,
              "--duration": "14s",
            } as React.CSSProperties
          }
        >
          <div className="group flex items-center gap-6">
            {items.map((t, i) => (
              <span
                key={`a-${i}`}
                className="marquee-item px-3 py-1 text-md font-medium"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="group flex items-center gap-6">
            {items.map((t, i) => (
              <span
                key={`b-${i}`}
                className="marquee-item px-3 py-1 text-md font-medium"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="group flex items-center gap-6">
            {items.map((t, i) => (
              <span
                key={`c-${i}`}
                className="marquee-item px-3 py-1 text-md font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="right-parent w-[50%] overflow-hidden  flex items-center">
        <div
          className="marquee-track right-track flex gap-5 whitespace-nowrap items-center will-change-transform py-4 px-6 "
          style={
            {
              "--groups": repeatCount,
              "--duration": "12s",
            } as React.CSSProperties
          }
        >
          {Array.from({ length: repeatCount }).map((_, groupIdx) => (
            <div
              key={`grp-${groupIdx}`}
              className="group flex items-center gap-5 bg-[#FFE5C0]"
            >
              {rightItems.map((item, i) => (
                <span
                  key={`r-${groupIdx}-${i}`}
                  className="flex justify-center items-center gap-2 min-w-max"
                >
                  <img
                    className="w-10 h-10 rounded-full object-cover p-0.5 bg-orange-400"
                    src={item.img}
                    alt={item.text}
                    width={20}
                    height={20}
                  />
                  <span className="whitespace-nowrap text-orange-600 text-xl">
                    {item.text}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-0 left-[30%] lg:left-[43%] w-[6cm] h-full rounded-2xl flex items-center">
        <button
          className="py-2 px-2 pr-5 gap-2 hover:scale-[1.03] flex justify-center items-center bg-green-500 text-white text-xl rounded-2xl shadow-inner shadow-green-200 border border-b-4 border-green-600 hover:bg-green-700 hover:border-green-800 cursor-pointer transition duration-300"
          aria-label="Try now"
        >
          <span className="text-[#EDE3D8] p-px rounded-md">
            <FaWhatsapp size={30} />
          </span>
          Say hi to Maya
        </button>
      </div>

      <style>{`
        :root {
          --groups: 3;
          --duration: 14s;
        }

        .marquee-track {
          display: flex;
          align-items: center;
        }

        /* LEFT: move left->right (negative offset -> 0) */
        .left-track {
          animation: move-right var(--duration, 14s) linear infinite;
          min-width: 200%;
        }

        /* RIGHT: also move left->right */
        .right-track {
          animation: move-right var(--duration, 12s) linear infinite;
          min-width: 200%;
        }

        /* Pause on hover of parent */
        .left-parent:hover .left-track,
        .right-parent:hover .right-track {
          animation-play-state: paused;
        }

        /* Keyframes: translate by one group's fraction to loop exactly one group's width.
           Using calc(-100% / var(--groups)) ensures the shift equals one group chunk. */
        @keyframes move-right {
          from { transform: translateX(calc(-100% / var(--groups))); }
          to   { transform: translateX(0%); }
        }

        /* Avoid jittering when images shrink/grow */
        .marquee-track img {
          flex-shrink: 0;
        }

        /* Accessibility: respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .left-track, .right-track {
            animation: none !important;
            transform: none !important;
          }
        }

        /* MOBILE: make marquee faster on small screens */
        /* You can tweak the durations below (5s for left, 6s for right) to taste */
        @media (max-width: 640px) {
          .left-track {
            animation-duration: 5s !important; /* faster on mobile */
          }

          .right-track {
            animation-duration: 6s !important; /* slightly slower than left */
          }

          /* Make parents full width on mobile for better layout */
          .left-parent, .right-parent {
            width: 100% !important;
          }

          /* Tweak spacing so items don't overflow badly */
          .group { gap: 10px !important; }
          .marquee-item { font-size: 0.9rem !important; }
          .right-parent .group { padding: 0.5rem 0.75rem; }

          /* Adjust the absolute center button so it fits on small widths */
          .absolute.top-0.left\\[30\\%] { left: 6% !important; width: auto !important; }
        }

        /* Optional small visual niceties */
        .marquee-item { white-space: nowrap; }
        .group { display: flex; align-items: center; }
      `}</style>
    </div>
  );
}
