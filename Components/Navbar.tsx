"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { IoMdHelp } from "react-icons/io";
import { ArrowRight, X } from "lucide-react";

import gsap from "gsap";
import { GoArrowRight } from "react-icons/go";
import { WordRotate } from "./ui/word-rotate";
import { BiRightArrow } from "react-icons/bi";

const UserProfile = () => (
  <Link
    href="/"
    className="flex items-center space-x-3 focus:outline-none"
    aria-label="Home"
  >
    <div className="w-12 h-12 relative overflow-hidden rounded-full">
      <Image
        src="/Images/maya.png"
        alt="Description of the image"
        width={48}
        height={48}
        priority={true}
        className="object-cover"
      />
    </div>

    <span
      style={{ fontFamily: "DavidLibre" }}
      className="text-xl md:text-3xl text-[#F54A00] "
      aria-label="User name"
    >
      Maya
    </span>
  </Link>
);

const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
  <div
    className={`flex ${
      isMobile ? "flex-col space-y-4" : "items-center space-x-8"
    } text-md font-medium`}
  >
    <Link href="/free">
      <button
        type="button"
        className="flex items-center gap-1 cursor-pointer"
        aria-label="Need a freelancer?"
      >
        <span className="text-[#25170D]">Need A Freelancer</span>
        <IoMdHelp className="text-[#F54A00]" aria-hidden="true" />
      </button>
    </Link>
    <Link href="/hr">
      <button
        type="button"
        className="flex items-center gap-1 cursor-pointer"
        aria-label="Are you hiring?"
      >
        <span className="text-[#25170D]">Are You Hiring</span>
        <IoMdHelp className="text-[#F54A00]" aria-hidden="true" />
      </button>
    </Link>
  </div>
);

const Navbar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const profileWrapRef = useRef<HTMLDivElement | null>(null);
  const linksWrapRef = useRef<HTMLDivElement | null>(null);
  const ctaWrapRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const container = containerRef.current;
    const profileEl = profileWrapRef.current;
    const linksEl = linksWrapRef.current;
    const ctaEl = ctaWrapRef.current;

    if (!container || !profileEl || !linksEl || !ctaEl) return;

    if (prefersReduced) {
      container.style.opacity = "1";
      container.style.transform = "translateY(0px)";
      container.style.filter = "blur(0px)";
      profileEl.style.opacity = "1";
      linksEl.style.opacity = "1";
      ctaEl.style.opacity = "1";
      return;
    }

    gsap.set([container, profileEl, linksEl, ctaEl], {
      clearProps: "none",
      willChange: "transform, opacity, filter",
    });

    tlRef.current = gsap.timeline();

    tlRef.current.fromTo(
      container,
      { y: -100, opacity: 0, filter: "blur(18px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
      }
    );

    tlRef.current.fromTo(
      profileEl,
      { x: -18, y: -6, opacity: 0, filter: "blur(10px)" },
      {
        x: 0,
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power2.out",
      },
      "<0.06"
    );

    const linkChildren = Array.from(linksEl.children) as HTMLElement[];
    tlRef.current.fromTo(
      linkChildren,
      { y: -28, opacity: 0, filter: "blur(8px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.55,
        stagger: 0.08,
        ease: "power2.out",
      },
      "<0.08"
    );

    tlRef.current.fromTo(
      ctaEl,
      { scale: 0.96, opacity: 0, filter: "blur(6px)" },
      {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.7,
        ease: "back.out(1.1)",
      },
      "<0.06"
    );

    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
      gsap.killTweensOf([container, profileEl, linksEl, ctaEl]);
      gsap.set([container, profileEl, linksEl, ctaEl], { willChange: "" });
    };
  }, []);

  // Escape key and menu handling
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    if (typeof document !== "undefined") {
      document.body.style.overflow = menuOpen ? "hidden" : "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      if (typeof document !== "undefined") document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Subtle overlay when menu is open */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <nav className="w-full relative z-50" role="navigation" aria-label="Main navigation">
        <div className="max-w-xl mx-auto py-4 px-4 md:px-0">
          <div
            ref={containerRef}
            className={`w-full bg-[#FFF4EC] border border-b-4 border-[#25170D] rounded-2xl relative transition-all duration-300 ${
              menuOpen ? "p-4" : "p-2"
            }`}
          >
            {/* Header row */}
            <div className="flex items-center justify-between">
              <div ref={profileWrapRef} className="shrink-0">
                <UserProfile />
              </div>

              <div
                ref={linksWrapRef}
                className="hidden md:flex md:items-end md:justify-end"
                aria-hidden={menuOpen}
              >
                <NavLinks />
              </div>

              {/* Mobile menu trigger */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-1 cursor-pointer"
                  aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                >
                  {menuOpen ? (
                    <span className="flex items-center gap-1 text-[#25170D] font-medium">
                      Close <X size={18} className="text-[#F54A00]" />
                    </span>
                  ) : (
                    <>
                      <WordRotate
                        words={["Are You ", "Need A "]}
                        duration={2000}
                        className="text-[#25170D] text-base font-normal"
                      />
                      <WordRotate
                        words={["Hiring?", "Freelancer?"]}
                        duration={2000}
                        className="text-[#F54A00] text-md font-normal"
                      />
                      <ArrowRight aria-hidden="true" size={18} className="mr-2" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Expanded menu content */}
            <div
              className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
                menuOpen ? "opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
              }`}
            >
              <div className="flex flex-col gap-4 mt-2">
                {/* Button 1: Are You Hiring? */}
                <Link href="/hr" onClick={() => setMenuOpen(false)}>
                  <button
                    className="w-full py-3 px-4 text-left font-medium border-2 border-[#25170D] rounded-lg hover:bg-[#25170D]/5 transition-all duration-200 flex items-center justify-between group"
                    style={{ borderWidth: '1px 3px 4px 1px', transform: 'rotate(0deg)' }}
                  >
                    <span>
                      Are You <span className="text-[#F54A00] font-semibold">Hiring?</span>
                    </span>
                    <ArrowRight
                      size={18}
                      className="text-[#F54A00] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                    />
                  </button>
                </Link>

                {/* Button 2: Need A Freelancer? */}
                <Link href="/free" onClick={() => setMenuOpen(false)}>
                  <button
                    className="w-full py-3 px-4 text-left font-medium border-2 border-[#25170D] rounded-lg hover:bg-[#25170D]/5 transition-all duration-200 flex items-center justify-between group"
                    style={{ borderWidth: '1px 3px 4px 1px', transform: 'rotate(0deg)' }}
                  >
                    <span>
                      Need A <span className="text-[#F54A00] font-semibold">Freelancer?</span>
                    </span>
                    <ArrowRight
                      size={18}
                      className="text-[#F54A00] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                    />
                  </button>
                </Link>

                {/* Button 3: CTA - Try Now */}
                <Link
                  href="https://wa.me/919205812098?text=hey%20maya"
                  target="_blank"
                  onClick={() => setMenuOpen(false)}
                >
                  <button
                    className="w-full py-3 px-4 text-center rounded-full text-white font-semibold bg-[#F54A00] border-2 border-[#010101] hover:bg-[#FF6900] hover:border-[#FF6900] transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                    style={{ borderWidth: '1px 1px 5px 1px', transform: 'rotate(0.0deg)' }}
                  >
                    Try Now <ArrowRight aria-hidden="true" size={20} className="inline-block -rotate-45" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
