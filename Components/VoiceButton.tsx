export default function VoiceWaveButton() {
  return (
    <>
      <button
        className="flex items-center justify-center  w-[3.3cm] h-14 rounded-full border-2 cursor-pointer transition-transform duration-200 hover:scale-[1.04]"
        aria-label="Voice wave"
        style={{
          background: "#ffd7c8", 
          borderColor: "#ff6a00", 
          color: "#ff5000", 
        }}
      >
        {/* Sound-wave */}
        <svg
          className="w-12 h-8"
          viewBox="0 0 120 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
      
          <rect
            x="6"
            y="16"
            width="10"
            height="16"
            rx="6"
            fill="currentColor"
            className="wave wave-1"
          />
   
          <rect
            x="24"
            y="10"
            width="12"
            height="28"
            rx="8"
            fill="currentColor"
            className="wave wave-2"
          />
    
          <rect
            x="46"
            y="6"
            width="12"
            height="36"
            rx="9"
            fill="currentColor"
            className="wave wave-3"
          />

          <rect
            x="68"
            y="10"
            width="12"
            height="28"
            rx="8"
            fill="currentColor"
            className="wave wave-4"
          />
    
          <rect
            x="90"
            y="16"
            width="10"
            height="16"
            rx="6"
            fill="currentColor"
            className="wave wave-5"
          />
  
          <rect
            x="106"
            y="18"
            width="8"
            height="12"
            rx="6"
            fill="currentColor"
            className="wave-dot"
          />
        </svg>
      </button>

      <style>{`
      
        @keyframes wave {
          0%   { transform: scaleY(0.7); }
          35%  { transform: scaleY(1.25); }
          70%  { transform: scaleY(0.9); }
          100% { transform: scaleY(0.7); }
        }

        @keyframes dotBob {
          0%   { transform: translateY(0) scale(1); }
          50%  { transform: translateY(-6%) scale(1.06); }
          100% { transform: translateY(0) scale(1); }
        }

        .wave {
          transform-origin: center bottom;
          animation: wave 960ms ease-in-out infinite;
          will-change: transform;
        }

        .wave-1 { animation-delay: 0ms; }
        .wave-2 { animation-delay: 110ms; }
        .wave-3 { animation-delay: 220ms; }
        .wave-4 { animation-delay: 110ms; }
        .wave-5 { animation-delay: 40ms; }

        .wave-dot {
          transform-origin: center;
          animation: dotBob 1000ms ease-in-out infinite;
          will-change: transform;
          animation-delay: 340ms;
        }


        button:hover .wave {
          animation-duration: 700ms;
        }
        button:hover .wave-3 {
       
          animation-name: wave;
          animation-duration: 700ms;
        }

       
        @media (prefers-reduced-motion: reduce) {
          .wave, .wave-dot {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
}
