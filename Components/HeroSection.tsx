"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Marqueue from "./Marqueue";
import { Highlighter } from "./ui/highlighter";
import { FaWhatsapp } from "react-icons/fa";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const marqRef = useRef<HTMLDivElement | null>(null);
  const bgCirclesRef = useRef<HTMLDivElement | null>(null);

  function splitTextToWords(root: Node) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    const textNodes: Node[] = [];
    let node = walker.nextNode();
    while (node) {
      if (node.nodeValue && node.nodeValue.trim() !== "") {
        textNodes.push(node);
      }
      node = walker.nextNode();
    }

    textNodes.forEach((textNode) => {
      const parent = textNode.parentNode;
      if (!parent) return;
      const text = textNode.nodeValue || "";
      const fragment = document.createDocumentFragment();

      const tokens = text.split(/(\s+)/);

      tokens.forEach((tok) => {
        if (tok.trim() === "") {
          const span = document.createElement("span");
          span.className = "space";
          span.style.display = "inline-block";
          span.style.width = ".45rem";

          span.textContent = " ";
          fragment.appendChild(span);
        } else {
          const span = document.createElement("span");
          span.className = "word";
          span.setAttribute("aria-hidden", "true");
          span.style.display = "inline-block";
          span.style.whiteSpace = "pre";
          span.style.willChange = "transform, opacity, filter";
          span.style.backfaceVisibility = "hidden";
          span.style.textRendering = "geometricPrecision";
          span.textContent = tok;
          fragment.appendChild(span);
        }
      });

      parent.replaceChild(fragment, textNode);
    });
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) splitTextToWords(headingRef.current);

      const words = headingRef.current
        ? gsap.utils.toArray<HTMLElement>(
            headingRef.current.querySelectorAll(".word")
          )
        : [];

      gsap.set(words, { transformOrigin: "50% 50%" });

      const tl = gsap.timeline({
        defaults: { ease: "cubic-bezier(0.22,1,0.36,1)" },
      });

      if (headingRef.current) {
        gsap.set(headingRef.current, {
          opacity: 0,
          scale: 0.95,
          filter: "blur(10px)",
        });

        tl.to(
          headingRef.current,
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
          },
          0
        );
      }

      if (words.length) {
        tl.fromTo(
          words,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: { each: 0.08, from: "start" },
            onComplete: () => {
              words.forEach((w) => w.removeAttribute("aria-hidden"));
            },
          },
          "-=0.8"
        );
      }

      if (marqRef.current) {
        tl.fromTo(
          marqRef.current,
          { y: 40, scale: 0.98, opacity: 0, filter: "blur(6px)" },
          { y: 0, scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.7 },
          "-=0.45"
        );
      }

      const circles = bgCirclesRef.current
        ? Array.from(bgCirclesRef.current.querySelectorAll(".hero-circle"))
        : [];
      if (circles.length) {
        tl.fromTo(
          circles,
          { y: -20, scale: 0.72, opacity: 0, filter: "blur(6px)" },
          {
            y: 0,
            scale: 1,
            opacity: 0.45,
            filter: "blur(0px)",
            stagger: 0.06,
            duration: 0.85,
            ease: "power2.out",
          },
          "-=0.7"
        );
      }

      const whatsappLabel =
        headingRef.current?.querySelector(".whatsapp-label");
      if (whatsappLabel) {
        tl.fromTo(
          whatsappLabel,
          { scale: 0.86, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.36 },
          "-=0.55"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[45vh] sm:min-h-[75vh] lg:min-h-[80vh] flex items-start justify-center overflow-hidden "
    >
      <div
        ref={bgCirclesRef}
        className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="hero-circle absolute top-[-23%] rounded-full border-2 border-dashed border-[#25170D]/50 opacity-50 animate-pulse w-[220px] h-[220px] sm:w-[420px] sm:h-[420px] md:w-[700px] md:h-[700px] lg:w-[900px] lg:h-[900px] xl:w-[1300px] xl:h-[1300px]" />
        <div className="hero-circle absolute top-[9%] rounded-full border-2 border-dashed border-[#25170D]/50 opacity-40 animate-pulse w-[180px] h-[180px] sm:w-[360px] sm:h-[360px] md:w-[600px] md:h-[600px] lg:w-[750px] lg:h-[750px] xl:w-[800px] xl:h-[800px]" />
        <div className="hero-circle absolute top-[50%] rounded-full border-2 border-dashed border-[#25170D]/50 opacity-30 animate-pulse w-[110px] h-[110px] sm:w-60 sm:h-60 md:w-[420px] md:h-[420px] lg:w-[540px] lg:h-[540px] xl:w-[350px] xl:h-[350px]" />
      </div>

      <div
        style={{ fontFamily: "DavidLibre" }}
        className="relative z-10 w-full max-w-4xl mx-auto text-center pt-24 sm:pt-28 md:pt-32 lg:pt-32"
      >
        <style>{`.word{display:inline-block;will-change:transform,opacity,filter;backface-visibility:hidden;text-rendering:geometricPrecision}.space{display:inline-block;width:.45rem}`}</style>

        <h1
          ref={headingRef}
          className="text-2xl sm:text-3xl md:text-5xl max-w-2xl mx-auto "
        >
          <span>
            <Highlighter action="highlight" color="#FFE5C0">
              <span className="text-orange-600">Your Profile</span>
            </Highlighter>{" "}
          </span>{" "}
          <span className="ml-1">pitched to</span>{" "}
          <span className="text-orange-600">1000's</span> <span>of</span>
          <br />
          <span className="text-xl lg:text-[42px]">
            Founders, HRs & Paying Clients
          </span>
          <span className="flex justify-center items-center gap-2 w-full text-[#25170D]">
            <br />
            <span>on</span>
            <span className="flex items-center font-medium text-green-600 text-xl lg:text-[42px] whatsapp-label">
              WhatsApp <FaWhatsapp className="lg:size-9  lg:ml-2" />
            </span>
          </span>
        </h1>
      </div>

      <div
        ref={marqRef}
        className="absolute top-[60%] lg:bottom-0 left-0 w-full flex flex-col justify-center items-center h-[3cm]"
      >
        <h1 className="text-[#FF5100] font-semibold text-xl">I GOT YOU !!</h1>
        <Marqueue />
      </div>
    </section>
  );
}
