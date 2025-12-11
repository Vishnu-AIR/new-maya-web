"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Side = "left" | "right";
type Message = {
  id: number;
  side: Side;
  text: string;
  time?: string;
};

type Conversation = {
  id: string;
  name: string;

  messages: Message[];
};

const LoadingBubble = React.forwardRef<HTMLDivElement, { side: Side }>(
  ({ side }, ref) => {
    return (
      <div
        className={`typing-wrapper self-${
          side === "right" ? "end" : "start"
        } mt-1`}
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
  const [currentConvIdx, setCurrentConvIdx] = useState(0);

  const conversations: Conversation[] = [
    {
      id: "conv-1",
      name: "Ankur",

      messages: [
        { id: 1, side: "right", text: "Hi Maya" },
        {
          id: 2,
          side: "right",
          text: "I'm Ankur - Founder of CirclePe. Need to hire a back-end developer ASAP",
        },
        {
          id: 3,
          side: "left",
          text: "Got it — I can help. I know a few folks.",
        },
      ],
    },
    {
      id: "conv-2",
      name: "Priya",

      messages: [
        {
          id: 1,
          side: "right",
          text: "Hey Maya, I just applied — here is my resume.",
        },
        { id: 2, side: "right", text: "Resume: Priya_SDE.pdf" },
        {
          id: 3,
          side: "left",
          text: "Thanks Priya — I received your resume. There's a founder looking for SDEs right now.",
        },
        { id: 4, side: "left", text: "I'll share your profile." },
      ],
    },
    {
      id: "conv-3",
      name: "Rohan",

      messages: [
        { id: 1, side: "right", text: "Hi — Is there any remote role?" },
        { id: 2, side: "right", text: "I have 3 years Node.js experience." },
        {
          id: 3,
          side: "left",
          text: "Nice — remote roles exist. There's a backend opening in Gurgaon, 15-20 LPA.",
        },
      ],
    },
    {
      id: "conv-4",
      name: "Sana",

      messages: [
        {
          id: 1,
          side: "right",
          text: "Maya, can you shortlist people for ML roles?",
        },
        {
          id: 2,
          side: "left",
          text: "Yes — share the JD and I'll scan my network.",
        },
      ],
    },
  ];

  const resolversRef = useRef<Array<() => void>>([]);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;
    const conv = conversations[currentConvIdx];
    setVisibleCount(0);

    const sleep = (ms: number) =>
      new Promise((res) => {
        const t = setTimeout(() => res(undefined), ms);
      });

    (async () => {
      for (let i = 0; i < conv.messages.length; i++) {
        if (cancelledRef.current) break;

        setTypingSide(conv.messages[i].side === "right" ? "right" : "left");
        setShowTyping(true);

        const len = conv.messages[i].text?.length || 20;
        await sleep(80 + Math.min(1200, len * 20));
        if (cancelledRef.current) break;

        setShowTyping(false);

        await new Promise<void>((resolve) => {
          resolversRef.current[i] = resolve;
          setVisibleCount((v) => v + 1);
        });

        await sleep(160);
      }

      setShowTyping(false);

      if (!cancelledRef.current) {
        await sleep(1200);
        setCurrentConvIdx((s) => (s + 1) % conversations.length);
      }
    })();

    return () => {
      cancelledRef.current = true;
      resolversRef.current = [];
    };
  }, [currentConvIdx]);

  const msgVariants = {
    hidden: (side: Side) => ({
      opacity: 0,
      y: 18,
      scale: 0.985,
      x: side === "right" ? 8 : -8,
    }),
    visible: { opacity: 1, y: 0, x: 0, scale: 1 },
  };

  const conv = conversations[currentConvIdx];

  return (
    <div className=" flex items-center justify-center p-1 bg-white rounded-3xl">
      <div className="w-[380px] h-[650px] rounded-3xl border-2 border-black/60 overflow-hidden shadow-2xl bg-[#0b0b0b]">
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

        <div className="relative h-full bg-[url('https://content.puch.ai/features/wtsp-bg.png')] bg-center bg-cover">
          <div className="absolute inset-0 flex flex-col">
            <div
              ref={wrapRef}
              className="flex-1 overflow-auto p-4 flex flex-col gap-3"
              style={{ paddingBottom: 12 }}
            >
              {conv.messages.map((m, idx) => {
                const isVisible = idx < visibleCount;
                return (
                  <motion.div
                    key={`${conv.id}-${m.id}`}
                    data-side={m.side}
                    data-id={m.id}
                    custom={m.side}
                    variants={msgVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                    onAnimationComplete={() => {
                      if (
                        isVisible &&
                        typeof resolversRef.current[idx] === "function"
                      ) {
                        resolversRef.current[idx]();
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

              {showTyping && typingSide === "left" && (
                <LoadingBubble ref={typingRef as any} side={typingSide} />
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .self-end {
          align-self: flex-end;
        }
        .self-start {
          align-self: flex-start;
        }

        .typing-wrapper {
          margin-top: 6px;
        }

        .typing-bubble {
          will-change: transform, opacity;
        }

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
