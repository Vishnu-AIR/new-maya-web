"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Side = "left" | "right";
type Message = {
  id: number;
  side: Side;
  text: string;
  time: string;
};

// Put these images in /public/images:
// - whatsapp-wallpaper.png
// - maya-avatar.png

const LoadingBubble = React.forwardRef<HTMLDivElement, { side: Side }>(
  ({ side }, ref) => {
    return (
      <div
        className={`typing-wrapper self-${side === "right" ? "end" : "start"} mt-1`}
        aria-hidden="false"
      >
        <motion.div
          ref={ref}
          initial={{
            opacity: 0,
            y: 8,
            x: side === "right" ? 8 : -8,
            scale: 0.98,
          }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.28 }}
          className={`typing-bubble inline-flex items-center p-1 rounded-lg`}
          role="status"
          aria-live="polite"
        >
          <div className="typing-inner">
            <div className="dots flex gap-2 items-end">
              <span className="dot" style={{ animationDelay: "0s" }} />
              <span className="dot" style={{ animationDelay: "0.12s" }} />
              <span className="dot" style={{ animationDelay: "0.24s" }} />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
);
LoadingBubble.displayName = "LoadingBubble";

export default function WhatsAppChatPhone() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const typingRef = useRef<HTMLDivElement | null>(null);
  const [showTyping, setShowTyping] = useState(false);
  const [typingSide, setTypingSide] = useState<Side>("left");
  const [visibleCount, setVisibleCount] = useState(0);

  const messages: Message[] = [
    { id: 1, side: "right", text: "Hey Maya", time: "3:34 PM" },
    {
      id: 2,
      side: "right",
      text: "I'm Ankur - Founder of CirclePe Really need to hire a back end developer ASAP",
      time: "3:36 PM",
    },
    {
      id: 3,
      side: "right",
      text: "Budget is around 15-20LPA, and the role is based out of gurgaon",
      time: "3:36 PM",
    },
    { id: 4, side: "left", text: "Okay got it 👍", time: "3:36 PM" },
    {
      id: 5,
      side: "left",
      text: "I think I know a few folks who'd be perfect for this",
      time: "3:36 PM",
    },
    {
      id: 6,
      side: "left",
      text: "Let me talk to them & get back to you",
      time: "3:37 PM",
    },
  ];

  // resolvers for waiting until each message's animation completes
  const resolversRef = useRef<Array<() => void>>([]);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;

    const container = wrapRef.current;
    if (!container) return;

    const sleep = (ms: number) =>
      new Promise((res) => {
        const t = setTimeout(() => res(undefined), ms);
        // cleanup handled by cancelledRef
      });

    (async () => {
      for (let i = 0; i < messages.length; i++) {
        if (cancelledRef.current) break;

        // set typing side for this upcoming message
        setTypingSide(messages[i].side === "right" ? "right" : "left");
        setShowTyping(true);

        // small timeout to allow render & typing bubble to be added
        await sleep(60);
        if (cancelledRef.current) break;

        // <-- changed typing duration from 2000ms to 1000ms -->
        await sleep(1000);
        if (cancelledRef.current) break;

        setShowTyping(false);

        // reveal the next message and wait until its animation completes
        await new Promise<void>((resolve) => {
          // push resolver so message's onAnimationComplete can call it
          resolversRef.current[i] = resolve;
          setVisibleCount((v) => v + 1);
        });

        // wait a tick for layout (animation will run)
        await sleep(40);

        // slight pause between messages
        await sleep(120);
      }

      setShowTyping(false);
    })();

    return () => {
      cancelledRef.current = true;
      // clear resolvers to avoid memory leaks
      resolversRef.current = [];
    };
  }, []); // run once

  // message animation variants
  const msgVariants = {
    hidden: (side: Side) => ({
      opacity: 0,
      y: 18,
      scale: 0.985,
      x: side === "right" ? 8 : -8,
    }),
    visible: { opacity: 1, y: 0, x: 0, scale: 1 },
  };

  return (
    <div className=" flex items-center justify-center p-1 bg-white rounded-3xl">
      {/* Phone frame */}
      <div className="w-[380px] h-[650px] rounded-3xl border-2 border-black/60 overflow-hidden shadow-2xl bg-[#0b0b0b]">
        {/* Header */}
        <header className="flex items-center gap-3 px-4 py-3 bg-[#0B1014]">
          <img
            src="/images/maya.png"
            alt="maya"
            className="w-9 h-9 rounded-full object-cover object-top"
          />
          <div className="flex-1 text-white">
            <div className="font-medium">Maya</div>
            <div className="text-[11px] text-white/70">online</div>
          </div>
        </header>

        {/* Chat area with wallpaper background */}
        <div className="relative h-full bg-[url('https://content.puch.ai/features/wtsp-bg.png')] bg-center bg-cover">
          <div className="absolute inset-0 flex flex-col">
            {/* messages container */}
            <div
              ref={wrapRef}
              className="flex-1 overflow-auto p-4 flex flex-col gap-3"
              // Add some bottom padding so final message isn't obscured by input
              style={{ paddingBottom: 12 }}
            >
              {messages.map((m, idx) => {
                const isVisible = idx < visibleCount;
                return (
                  <motion.div
                    key={m.id}
                    data-side={m.side}
                    data-id={m.id}
                    custom={m.side}
                    variants={msgVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                    onAnimationComplete={() => {
                      // if this message just became visible, resolve the waiting promise
                      if (
                        isVisible &&
                        typeof resolversRef.current[idx] === "function"
                      ) {
                        resolversRef.current[idx]();
                        // remove resolver after calling
                        resolversRef.current[idx] = undefined as any;
                      }
                    }}
                    className={`message max-w-[78%] wrap-break-word whitespace-pre-line p-3 rounded-xl text-sm leading-snug shadow-sm self-${
                      m.side === "right" ? "end" : "start"
                    }`}
                  >
                    <div
                      className={`${
                        m.side === "right"
                          ? "bg-[#154D38] text-white"
                          : "bg-[#1F272A] text-white/95"
                      } px-2 py-2 rounded-lg`}
                    >
                      <div>{m.text}</div>
                    </div>
                  </motion.div>
                );
              })}

              {/* typing indicator - only show when typingSide is 'left' */}
              {showTyping && typingSide === "left" && (
                <LoadingBubble ref={typingRef as any} side={typingSide} />
              )}
            </div>

            {/* input area (non-functional demo) */}
          </div>
        </div>
      </div>

      {/* small styles injected to keep component self-contained for demo */} 
      <style jsx>{`
        .self-end {
          align-self: flex-end;
        }
        .self-start {
          align-self: flex-start;
        }

        /* Loading bubble styling */
        .typing-wrapper {
          margin-top: 6px;
        }

        .typing-bubble {
          will-change: transform, opacity;
        }

        /* bubble background and inner container */
        .typing-inner {
          background: rgba(44, 44, 44, 0.98);
          color: #ffffff;
          padding: 8px 10px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          box-shadow: 0 4px 10px rgba(2, 6, 23, 0.35);
          min-width: 42px;
          justify-content: center;
        }

        /* dots baseline - align to bottom so they look like they pop up */
        .dots {
          height: 10px;
          display: flex;
          align-items: flex-end;
        }

        .dots .dot {
          background: rgba(255, 255, 255, 0.95);
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 999px;
          transform: translateY(0);
          opacity: 0.9;
          animation-name: dotUp;
          animation-duration: 0.72s;
          animation-iteration-count: infinite;
          animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        /* keyframes — dots move upwards then settle */
        @keyframes dotUp {
          0% {
            transform: translateY(0);
            opacity: 0.7;
          }
          40% {
            transform: translateY(-6px);
            opacity: 1;
          }
          80% {
            transform: translateY(0);
            opacity: 0.85;
          }
          100% {
            transform: translateY(0);
            opacity: 0.7;
          }
        }

        /* small responsive tweaks */
        @media (max-width: 420px) {
          .typing-inner {
            padding: 6px 8px;
            min-width: 36px;
          }
          .dots .dot {
            width: 5px;
            height: 5px;
          }
        }
      `}</style>
    </div>
  );
}
