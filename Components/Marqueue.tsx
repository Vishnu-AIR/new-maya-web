import VoiceButton from "./VoiceButton";

type Item = {
  img: string;
  text: string;
};

export default function Marqueue() {
  const items = [
    "I Am A Backend Dev",
    "I Am A Designer",
    "I Am A FreeLancer ",
    "I Am A Frontend Dev",
    "I Am A Full Stack Dev ",
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
      img: "https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fHww",
      text: "I New Cient",
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

      <div className="absolute top-0 left-[35%] lg:left-[45%] w-[6cm] h-full  flex items-center">
        <VoiceButton/>
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

        
        .left-track {
          animation: move-right var(--duration, 14s) linear infinite;
          min-width: 200%;
        }

   
        .right-track {
          animation: move-right var(--duration, 12s) linear infinite;
          min-width: 200%;
        }

        .left-parent:hover .left-track,
        .right-parent:hover .right-track {
          animation-play-state: paused;
        }

   
        @keyframes move-right {
          from { transform: translateX(calc(-100% / var(--groups))); }
          to   { transform: translateX(0%); }
        }

       
        .marquee-track img {
          flex-shrink: 0;
        }

     
        @media (prefers-reduced-motion: reduce) {
          .left-track, .right-track {
            animation: none !important;
            transform: none !important;
          }
        }

       
        @media (max-width: 640px) {
          .left-track {
            animation-duration: 5s !important; /* faster on mobile */
          }

          .right-track {
            animation-duration: 6s !important; /* slightly slower than left */
          }

         
          .left-parent, .right-parent {
            width: 100% !important;
          }


          .group { gap: 10px !important; }
          .marquee-item { font-size: 0.9rem !important; }
          .right-parent .group { padding: 0.5rem 0.75rem; }

        
          .absolute.top-0.left\\[30\\%] { left: 6% !important; width: auto !important; }
        }

        .marquee-item { white-space: nowrap; }
        .group { display: flex; align-items: center; }
      `}</style>
    </div>
  );
}
