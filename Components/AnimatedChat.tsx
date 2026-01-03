"use client";
import React, { useState, useEffect, useRef } from "react";
import { TypingAnimation } from "./ui/typing-animation";
import { TextAnimate } from "./ui/text-animate";
import {
  ArrowDownIcon,
  ChevronLeft,
  MoreVertical,
  Phone,
  SendHorizonalIcon,
} from "lucide-react";

// You can copy and paste this component into your Next.js project.
// Make sure you have Tailwind CSS configured.

// --- Type Definition for Safari compatibility ---
interface WindowWithAudio extends Window {
  webkitAudioContext?: typeof AudioContext;
  AudioContext?: typeof AudioContext;
}

const AnimatedChat: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  // Use a ref to hold the AudioContext to prevent re-creation on re-renders
  const [typedText, setTypedText] = useState<string>("");
  // Use a ref to hold the AudioContext to prevent re-creation on re-renders
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isAudioUnlocked, setIsAudioUnlocked] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- 1. THEME STATE (No change here) ---
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">("dark");
  const themedSectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // ✅ FIX 1: Only proceed if the scrollable sections are actually rendered.
    if (!isAudioUnlocked || step < 5) {
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px", // Trigger line at the vertical center
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const theme = entry.target.getAttribute("data-theme") as
            | "light"
            | "dark";
          if (theme) {
            setActiveTheme(theme);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    themedSectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();

    // ✅ FIX 2: Add 'step' to the dependency array.
    // This ensures the effect re-runs when the step changes, allowing it
    // to correctly set up the observer when step >= 5.
  }, [isAudioUnlocked, step]); // Run this effect when the content becomes visible

  // 2. Set up the timer on component mount
  useEffect(() => {
    initializeAudio();
    const timer = setTimeout(() => {
      playSound("typing");
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const initializeAudio = () => {
    if (!audioContextRef.current && typeof window !== "undefined") {
      try {
        const extendedWindow = window as WindowWithAudio;
        const AudioContext =
          extendedWindow?.AudioContext || extendedWindow.webkitAudioContext;

        if (!AudioContext) {
          console.error("Web Audio API is not supported on this browser.");
          return;
        }

        const audioCtx = new AudioContext();
        // A "silent" sound is played on the first tap to "unlock" audio playback
        const buffer = audioCtx.createBuffer(1, 1, 22050);
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.start(0);

        audioContextRef.current = audioCtx;
        console.log("AudioContext initialized successfully.");
      } catch (e) {
        console.error("Could not create AudioContext:", e);
      }
    }
  };

  // Viewport detection - starts animation when component enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAudioUnlocked) {
            initializeAudio();
            setIsAudioUnlocked(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isAudioUnlocked]);

  // Function to create simple tones for sound effects
  // Note: Browser requires user interaction (like a click) to enable audio.
  // This might not play automatically on page load in all browsers.
  const playSound = (type: "send" | "receive" | "reveal" | "typing") => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      switch (type) {
        case "typing":
          navigator.vibrate(5); // A very short, subtle tap
          break;
        case "send":
          navigator.vibrate(100); // A single, solid vibration
          break;
        case "receive":
          navigator.vibrate([50, 30, 50]); // A quick double-vibration
          break;
        case "reveal":
          navigator.vibrate(75); // A slightly longer buzz
          break;
      }
    }

    if (!audioContextRef.current) return;

    const audioCtx = audioContextRef.current;
    const now = audioCtx.currentTime;

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === "typing") {
      // A clean, short sine wave for a modern phone keypad tone
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(1200, now); // A mid-to-high frequency for the 'tap' sound

      // A very fast attack and decay envelope to make it sound like a quick tap
      gainNode.gain.setValueAtTime(0.2, now); // Start at a moderate volume
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.05); // Decay very quickly

      oscillator.start(now);
      oscillator.stop(now + 0.05); // Keep it very short
    } else {
      // Tonal sounds for other actions
      let duration = 0.2;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.3, now + 0.02); // Quick fade in

      switch (type) {
        case "send":
          oscillator.type = "triangle";
          oscillator.frequency.setValueAtTime(880, now); // High pitch
          duration = 0.1;
          break;
        case "receive":
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(660, now); // Medium pitch
          duration = 0.15;
          break;
        case "reveal":
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(440, now); // Lower pitch start
          oscillator.frequency.linearRampToValueAtTime(550, now + 0.1);
          duration = 0.2;
          break;
      }

      gainNode.gain.linearRampToValueAtTime(0, now + duration);
      oscillator.start(now);
      oscillator.stop(now + duration);
    }
  };

  // This effect controls the animation sequence: Input -> Hey -> Title Bar -> 1st Message -> 2nd Message -> CTA
  useEffect(() => {
    if (!isAudioUnlocked) return; // Wait for user interaction to start the sequence
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => {
        playSound("typing");
      }, 400),
      setTimeout(() => {
        setStep(1.5);
      }, 1000),
      setTimeout(() => {
        setStep(1.75);
        playSound("typing");
      }, 1300),
      setTimeout(() => {
        setStep(2);
      }, 1800),
      setTimeout(() => {
        setStep(3);
        playSound("receive");
      }, 2200),
      setTimeout(() => {
        setStep(4);
        playSound("reveal");
      }, 2800),
      // setTimeout(() => { playSound('reveal'); }, 4200),
      setTimeout(() => {
        setStep(5);
        playSound("reveal");
      }, 3400),
      // setTimeout(() => { playSound('reveal'); }, 6000),
      setTimeout(() => {
        setStep(6);
        playSound("typing");
      }, 4500),
    ];

    // Cleanup timers on component unmount
    return () => timers.forEach(clearTimeout);
  }, [isAudioUnlocked]);

  useEffect(() => {
    if (step === 1) {
      const targetText = "Hey";
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < targetText.length) {
          setTypedText((prev) => prev + targetText[i]);
          playSound("typing");
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 150); // Typing speed

      return () => clearInterval(typingInterval); // Cleanup
    }
    if (step === 1.75) {
      const targetText = "";
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < targetText.length) {
          setTypedText((prev) => prev + targetText[i]);
          playSound("typing");
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 150); // Typing speed

      return () => clearInterval(typingInterval); // Cleanup
    }
  }, [step]);

  // Helper function to manage animation classes
  const getAnimationClass = (animationStep: number): string => {
    return step >= animationStep
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-5";
  };

  return (
    <>
      <div
        ref={containerRef}
        className="relative h-screen w-full overflow-visible bg-black font-sans"
      >
       
        {/* Background Image */}
        <img
          src={isAudioUnlocked ? "/her0.png" : "/black.png"}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://placehold.co/000000/FFFFFF";
          }}
          alt="A smiling woman looking at her phone outdoors"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black via-black/30 via-20% to-transparent transition-opacity duration-700 ${
            step >= 2 ? "opacity-100 " : "hidden"
          }`}
        ></div>

        {/* Typing Input Container (Appears first in the middle) */}
        <div className="absolute left-0 right-0 top-1/3 mx-auto w-full max-w-md px-4 z-10">
          <div
            className={`flex gap-2 items-center transition-all duration-300 ${
              step >= 1 && step < 2
                ? "opacity-100 md:scale-125"
                : "opacity-0 scale-100"
            }`}
          >
            <div className="flex w-full items-center space-x-3 p-2 rounded-full bg-white/90 backdrop-blur-[10px] text-white max-w-md mx-auto shadow-lg">
              {/* Smiley Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {isAudioUnlocked && (
                <TypingAnimation
                  className="flex-1 text-left font-medium text-2xl text-black"
                  delay={400}
                >
                  Hey
                </TypingAnimation>
              )}
              {/* Paperclip Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
              {/* Send Button */}
            </div>
            <button
              className={`aspect-square h-12 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 transition-all duration-500 ${
                step >= 1.5 && step < 1.75
                  ? "opacity-100 scale-100"
                  : "scale-125"
              }`}
            >
              <SendHorizonalIcon />
            </button>
          </div>
        </div>

        {/* Animated Content Container (Main chat UI) */}
        <div className="relative max-w-sm md:max-w-md container mx-auto z-10 flex flex-col items-center justify-end h-full p-4 md:p-8 pb-16">
          {/* Chat messages container that moves up */}
          <div
            className={`w-full mt-12 md:mt-0 max-w-md mx-auto space-y-4 transition-transform duration-1000 h-full ease-in-out ${
              step >= 2 ? "" : ""
            }`}
          >
            {/* Name Plate */}
            <div
              className={`flex items-center justify-between p-4 rounded-t-4xl text-[#010101] w-full transition-all duration-700 ${
                step >= 2 ? "opacity-100  scale-100 " : "opacity-0 scale-75  "
              }  ${
                step > 5
                  ? "bg-white/30 backdrop-blur-md "
                  : "bg-black/0 border border-white text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <ChevronLeft />
                <img
                  src="/avtar2.png"
                  alt="Maya's Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-semibold text-xl">Maya</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-500 -ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="flex items-center gap-2">
                <Phone className="size-5" />
                <MoreVertical />
              </span>
            </div>

            {/* "Hey" bubble */}
            <div
              className={`flex justify-end transition-all duration-700 ${
                step >= 1.75
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-0"
              }`}
            >
              <div className=" text-black font-medium text-base md:text-xl bg-[#BFF7AB] py-2 px-4 rounded-lg rounded-tr-none shadow-xl border">
                Hey
              </div>
            </div>

            {/* First message from Maya */}
            <div
              className={`flex transition-all duration-700 ${
                step >= 4 ? "opacity-100 translate-y-0" : "hidden"
              }`}
            >
              <div className="shadow-2xl font-medium p-4 rounded-xl rounded-tl-none text-lg md:text-xl bg-white/90 backdrop-blur-[10px] text-black max-w-[70%] md:max-w-xs">
                {`Hey 👋, I’m Maya- a super AI built by IITians for job seekers & freelancers`}
                {/* <TextAnimate animation="slideRight" by="word" as="p" className='text-md font-normal' delay={0.3} duration={0.8}>
                            </TextAnimate> */}
              </div>
            </div>

            {/* Second message from Maya */}
            <div
              className={`flex transition-all duration-700 -mt-2.5 ${
                step >= 5 ? "opacity-100 translate-y-0" : "hidden"
              }`}
            >
              <div className="shadow-2xl font-medium p-4 rounded-xl text-lg md:text-xl bg-white/90 backdrop-blur-[10px] text-black/80 max-w-[90%]">
                I help 1000s of founders, HR’s and paying clients all around the world to connect with the right talent in their budget & scope<br/><br/>
                <strong className="font-semibold text-black/80">
                  {" "}
                  I keep sharing your CV/portfolio to people who need you directly on WhatsApp{" "}
                </strong>{" "}
                <br />
                
                <br />
                Are you a job seeker/freelancer or looking to hire someone?
                <br />
                {/* <ol className="list-none pl-2 mt-2">
                  <li>🔍 Find the right people </li>
                  <li>💬 Talk to them on your behalf </li>
                  <li>🫱🏻‍🫲🏽 Connect you when it’s a match</li>
                </ol> */}
                {/* <TextAnimate animation="slideUp" by="word" as="p" className='text-md font-normal' delay={0.3} duration={0.8}>
                                {`So basically, I'm an AI\nprofessional network- think of\nme as a giant professional\ncircle with 100,000+ people\n—founders, freelancers,\nrecruiters, investors, agencies\n—all just one chat away.`}

                            </TextAnimate> */}
              </div>
            </div>

            {/* Typing Simulation */}
            <div
              className={`flex transition-all duration-700 ${
                step >= 3 && step < 5
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-5"
              }`}
            >
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-[10px] text-white max-w-xs">
                <TextAnimate
                  className="text-base font-normal text-[#010101]/60"
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 30,
                      rotate: 45,
                      scale: 0.5,
                    },
                    show: (i:any) => ({
                      opacity: 1,
                      y: 0,
                      rotate: 0,
                      scale: 1,
                      transition: {
                        delay: i * 0.1,
                        duration: 0.4,
                        y: {
                          type: "spring",
                          damping: 12,
                          stiffness: 200,
                          mass: 0.8,
                        },
                        rotate: {
                          type: "spring",
                          damping: 8,
                          stiffness: 150,
                        },
                        scale: {
                          type: "spring",
                          damping: 10,
                          stiffness: 300,
                        },
                      },
                    }),
                    exit: (i:any) => ({
                      opacity: 0,
                      y: 30,
                      rotate: 45,
                      scale: 0.5,
                      transition: {
                        delay: i * 0.1,
                        duration: 0.4,
                      },
                    }),
                  }}
                  by="character"
                  delay={0}
                  once={false}
                >
                  typing...
                </TextAnimate>
              </div>
            </div>
            {/* Bottom call to action */}
            {/* <div className=" px-4 text-center space-y-5">
              <button
                className={`text-white border border-white rounded-full px-8 py-3 font-semibold text-lg transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(255,255,255,0.4),_0_0_5px_rgba(255,255,255,0.6)] duration-700 ${getAnimationClass(
                  6
                )}`}
              >
                Scroll to Explore Maya{" "}
                <ArrowDownIcon className="inline-block ml-2" />
              </button>
            </div> */}

            {/* { isAudioUnlocked && step>=5 && <span className="text-[#010101]/40 mt-8 md:mt-0 text-base flex items-center justify-center"><ArrowDownIcon/> scroll down for more</span>} */}
          </div>
        </div>
      </div>

    
    </>
  );
};

export default AnimatedChat;
