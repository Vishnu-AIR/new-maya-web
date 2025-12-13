"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type BarRef = HTMLDivElement | null;

const baseHeights = [
  40, 60, 30, 80, 50, 90,  40, 60, 30, 80, 50, 90,  40, 60, 30, 80, 50, 90, 40, 60, 100, 50, 70, 30, 60, 80, 40, 70, 50, 90, 30, 60, 40, 80, 50, 30, 40, 40, 60, 30, 80, 50, 90, 40, 60, 100, 50, 70, 30, 60, 80, 40, 70, 50, 90,
];

const HrMusic: React.FC = () => {
  const [playing, setPlaying] = useState<boolean>(true);
  const barRefs = useRef<BarRef[]>(Array(baseHeights.length).fill(null));
  const tweensRef = useRef<gsap.core.Tween[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const setBarRef = (el: HTMLDivElement | null, idx: number) => {
    barRefs.current[idx] = el;
  };

  useEffect(() => {
    // Respect prefers-reduced-motion
    const reduceMotion = typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ensure initial styles
    barRefs.current.forEach((b) => {
      if (!b) return;
      b.style.transformOrigin = "center bottom";
      b.style.transform = "scaleY(1)";
      b.style.opacity = "0.95";
    });

    // kill any previous tweens
    tweensRef.current.forEach((t) => t && t.kill && t.kill());
    tweensRef.current = [];

    // build tweens if allowed
    if (!reduceMotion) {
      for (let i = 0; i < baseHeights.length; i++) {
        const el = barRefs.current[i];
        if (!el) continue;

        const amplitude = 0.5 + Math.random() * 1.2; // 0.5 .. 1.7
        const minScale = 0.25;
        const targetScale = Math.max(minScale, amplitude);
        const dur = 0.6 + Math.random() * 0.9; // 0.6 .. 1.5s
        const delay = Math.random() * 0.25;

        const t = gsap.to(el, {
          scaleY: targetScale,
          duration: dur,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay,
          paused: true,
        });

        tweensRef.current.push(t);
      }
    }

    // opening animation timeline
    tlRef.current = gsap.timeline({ defaults: { ease: "power3.out" } });
    tlRef.current.from(containerRef.current, { autoAlpha: 0, y: 8, scale: 0.995, duration: 0.45 });

    // stagger bars from scaleY 0 to 1 for a nice entrance
    const bars = barRefs.current.filter(Boolean) as HTMLDivElement[];
    if (bars.length) {
      tlRef.current.from(
        bars,
        {
          scaleY: 0,
          duration: 0.5,
          ease: "sine.out",
          transformOrigin: "center bottom",
          stagger: 0.01,
        },
        "-=0.25"
      );
    }

    // on unmount cleanup
    return () => {
      tweensRef.current.forEach((t) => t && t.kill && t.kill());
      tweensRef.current = [];
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
    };
    // run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Play/pause control
  useEffect(() => {
    const reduceMotion = typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      // set static heights and skip animation calls
      barRefs.current.forEach((b, i) => {
        if (!b) return;
        b.style.transition = "height 200ms linear, opacity 120ms";
        b.style.transform = "scaleY(1)";
        b.style.height = `${baseHeights[i]}%`;
      });
      return;
    }

    if (playing) {
      tweensRef.current.forEach((t) => t && t.play && t.play());
      barRefs.current.forEach((b) => {
        if (!b) return;
        b.style.opacity = "1";
      });
    } else {
      tweensRef.current.forEach((t) => t && t.pause && t.pause());
      barRefs.current.forEach((b) => {
        if (!b) return;
        gsap.to(b, { scaleY: 1, duration: 0.28, ease: "power2.out" });
        b.style.opacity = "0.9";
      });
    }
  }, [playing]);

  return (
    <div ref={containerRef} className="flex items-center w-full">
      <button
        aria-pressed={playing}
        onClick={() => setPlaying((p) => !p)}
        className="w-9 h-9  rounded-full bg-neutral-800 flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform focus:outline-none"
        title={playing ? "Pause" : "Play"}
      >
        {!playing ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FF6B35" className="block">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#FF6B35" className="block">
            <rect x="6" y="4" width="4" height="16" rx="1"></rect>
            <rect x="14" y="4" width="4" height="16" rx="1"></rect>
          </svg>
        )}
      </button>

      {/* Waveform container: responsive heights and bar widths */}
      <div className="flex items-end gap-[3px] h-6 sm:h-8 md:h-10  xl:h-10 flex-1 mx-3 sm:mx-4 opacity-90 overflow-hidden bg-red-400">
        {baseHeights.map((h, i) => (
          <div
            key={i}
            ref={(el) => setBarRef(el, i)}
            style={{
              height: `${h}%`,
              transition: "height 100ms linear",
              transformOrigin: "center bottom",
              transform: "scaleY(1)",
            }}
            className={`bg-black rounded-full ${i % 8 === 0 ? "w-[1px] sm:w-[1px] md:w-[2px]" : "w-[1px] sm:w-[2px] md:w-[2px]"}`}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
};

export default HrMusic;
