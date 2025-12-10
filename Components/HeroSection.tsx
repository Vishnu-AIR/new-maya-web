"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Marqueue from "./Marqueue";

export default function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  const easeOutCubic: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const easeString = `cubic-bezier(${easeOutCubic.join(",")})`;

  function splitTextNodesToWordSpans(el: HTMLElement) {
    if (el.dataset.split === "true") return;

    const originalNodes = Array.from(el.childNodes);
    const frag = document.createDocumentFragment();

    originalNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";

        const parts = text.match(/(\S+|\s+)/g) || [];
        parts.forEach((part) => {
          if (/\s+/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else {
            const span = document.createElement("span");
            span.className = "word inline-block";
            span.textContent = part;
            frag.appendChild(span);
          }
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const elementNode = node as HTMLElement;
        const clone = elementNode.cloneNode(false) as HTMLElement;
        const childNodes = Array.from(elementNode.childNodes);

        if (childNodes.length === 0) {
          frag.appendChild(clone);
        } else {
          childNodes.forEach((child) => {
            if (child.nodeType === Node.TEXT_NODE) {
              const txt = child.textContent || "";
              const parts = txt.match(/(\S+|\s+)/g) || [];
              parts.forEach((part) => {
                if (/\s+/.test(part)) {
                  clone.appendChild(document.createTextNode(part));
                } else {
                  const span = document.createElement("span");
                  span.className = "word inline-block";
                  span.textContent = part;
                  clone.appendChild(span);
                }
              });
            } else {
              clone.appendChild(child.cloneNode(true));
            }
          });
          frag.appendChild(clone);
        }
      } else {
        frag.appendChild(node.cloneNode(true));
      }
    });

    el.innerHTML = "";
    el.appendChild(frag);
    el.dataset.split = "true";
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = headingRef.current;
    if (!el) return;

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.filter = "none";

      const maybeWords = Array.from(
        el.querySelectorAll<HTMLElement>("span.word")
      );
      maybeWords.forEach((w) => {
        w.style.opacity = "1";
        w.style.transform = "none";
      });
      return;
    }

    splitTextNodesToWordSpans(el);
    const words = Array.from(el.querySelectorAll<HTMLElement>("span.word"));

    gsap.set(el, {
      opacity: 0,
      scale: 0.95,
      ...({ filter: "blur(10px)" } as any),
    });

    gsap.set(words, {
      opacity: 0,
      y: 10,
    });

    const tl = gsap.timeline();

    tl.to(el, {
      duration: 1.0,
      opacity: 1,
      scale: 1,
      ...({ filter: "blur(0px)" } as any),
      ease: easeString,
    });

    tl.to(
      words,
      {
        duration: 0.4,
        opacity: 1,
        y: 0,
        ease: easeString,
        stagger: 0.06,
      },
      "-=0.6"
    );

    return () => {
      tl.kill();
      gsap.set(el, { clearProps: "all" });
      gsap.set(words, { clearProps: "all" });
    };
  }, []);

  return (
    <section className="relative min-h-[40vh] sm:min-h-[75vh] lg:min-h-[80vh] flex items-start justify-center overflow-hidden ">
      <div
        className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute rounded-full border-2 border-dashed border-[#25170D]/50 opacity-50 animate-pulse w-[220px] h-[220px] sm:w-[420px] sm:h-[420px] md:w-[700px] md:h-[700px] lg:w-[900px] lg:h-[900px] xl:w-[1200px] xl:h-[1200px]" />
        <div className="absolute rounded-full border-2 border-dashed border-[#25170D]/50 opacity-40 animate-pulse w-[180px] h-[180px] sm:w-[360px] sm:h-[360px] md:w-[600px] md:h-[600px] lg:w-[750px] lg:h-[750px] xl:w-[1000px] xl:h-[1000px]" />
        <div className="absolute rounded-full border-2 border-dashed border-[#25170D]/50 opacity-30 animate-pulse w-[110px] h-[110px] sm:w-60 sm:h-60 md:w-[420px] md:h-[420px] lg:w-[540px] lg:h-[540px] xl:w-[700px] xl:h-[700px]" />
      </div>

      <div
        style={{ fontFamily: "EBGaramon" }}
        className="relative z-10 w-full max-w-4xl mx-auto text-center pt-24 sm:pt-28 md:pt-32 lg:pt-36"
      >
        <h1
          ref={headingRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight max-w-3xl mx-auto"
        >
          <span className="inline-block text-orange-600 px-3 py-1 rounded-xl bg-[#FFE5C0]">
            Your Profile
          </span>{" "}
          <span className="inline-block text-[#25170D] ml-1">Pitched To</span>{" "}
          <span className="inline-block text-orange-600">1000's</span>{" "}
          <span className="block sm:inline font-normal text-[#25170D] mt-3 sm:mt-0">
            Of Founders, HRs & Paying
          </span>{" "}
          <span className="flex justify-center items-center gap-2 w-full mt-2 text-[#25170D]">
            <span>Clients On</span>
            <span className="inline-flex items-center font-medium text-green-600">
              WhatsApp
            </span>
          </span>
        </h1>
      </div>

      <div className="absolute top-[60%] lg:bottom-0 left-0 w-full">
        <Marqueue />
      </div>
    </section>
  );
}
