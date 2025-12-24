"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { IoMdHelp } from "react-icons/io";

import gsap from "gsap";
import { GoArrowRight } from "react-icons/go";

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

  // NEW: refs for mobile swap elements
  const mobileWrapRef = useRef<HTMLDivElement | null>(null);
  const hireRef = useRef<HTMLDivElement | null>(null);
  const freeRef = useRef<HTMLDivElement | null>(null);
  const toggleIntervalRef = useRef<number | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showHiring, setShowHiring] = useState(true);

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

  // GSAP-powered mobile toggle (every 2 seconds)
  useEffect(
    () => {
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const hireEl = hireRef.current;
      const freeEl = freeRef.current;
      if (!hireEl || !freeEl) return;

      // initial styles
      gsap.set([hireEl, freeEl], { position: "absolute", left: 0, top: 0 });
      if (showHiring) {
        gsap.set(hireEl, { autoAlpha: 1, y: 0, pointerEvents: "auto" });
        gsap.set(freeEl, { autoAlpha: 0, y: 6, pointerEvents: "none" });
      } else {
        gsap.set(hireEl, { autoAlpha: 0, y: -6, pointerEvents: "none" });
        gsap.set(freeEl, { autoAlpha: 1, y: 0, pointerEvents: "auto" });
      }

      // If reduced motion, don't animate — just toggle visibility every 2s
      if (prefersReduced) {
        toggleIntervalRef.current = window.setInterval(() => {
          setShowHiring((s) => !s);
        }, 2000);
        return () => {
          if (toggleIntervalRef.current) {
            clearInterval(toggleIntervalRef.current);
            toggleIntervalRef.current = null;
          }
        };
      }

      // animation function
      const animateTo = (showHiringNow: boolean) => {
        if (showHiringNow) {
          // show hiring, hide free
          gsap.killTweensOf([hireEl, freeEl]);
          gsap.to(freeEl, {
            autoAlpha: 0,
            y: 6,
            duration: 0.22,
            ease: "power2.in",
            pointerEvents: "none",
          });
          gsap.fromTo(
            hireEl,
            { autoAlpha: 0, y: -6 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
              pointerEvents: "auto",
            }
          );
        } else {
          // show free, hide hiring
          gsap.killTweensOf([hireEl, freeEl]);
          gsap.to(hireEl, {
            autoAlpha: 0,
            y: -6,
            duration: 0.22,
            ease: "power2.in",
            pointerEvents: "none",
          });
          gsap.fromTo(
            freeEl,
            { autoAlpha: 0, y: 6 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
              pointerEvents: "auto",
            }
          );
        }
      };

      // start interval
      toggleIntervalRef.current = window.setInterval(() => {
        setShowHiring((s) => {
          const next = !s;
          animateTo(!s);
          return next;
        });
      }, 2000);

      // cleanup
      return () => {
        if (toggleIntervalRef.current) {
          clearInterval(toggleIntervalRef.current);
          toggleIntervalRef.current = null;
        }
        gsap.killTweensOf([hireEl, freeEl]);
      };
    },
    [
      /* run once on mount */
    ]
  );

  // keep escape/menu handling (unchanged)
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
    <nav className="w-full" role="navigation" aria-label="Main navigation">
      <div className="max-w-xl mx-auto py-4 px-4 md:px-0">
        <div
          ref={containerRef}
          className="  w-full  flex items-center justify-between p-2 bg-[#FFF4EC] border border-b-4 border-[#25170D] rounded-2xl relative"
        >
          <div ref={profileWrapRef} className="shrink-0">
            <UserProfile />
          </div>

          <div
            ref={linksWrapRef}
            className="hidden md:flex md:items-end md:justify-end "
            aria-hidden={menuOpen}
          >
            <NavLinks />
          </div>

          {/* --- mobile toggle block --- */}
          <div className=" md:hidden flex items-center ">
            <div
              ref={mobileWrapRef}
              className="relative w-[160px] h-[28px] flex-shrink-0"
              aria-live="polite"
            >
              {/* Hiring link */}
              <div ref={hireRef} className="w-full">
                <Link href="/hr">
                  <button
                    type="button"
                    className="flex items-center gap-1 cursor-pointer"
                    aria-label="Are you hiring?"
                  >
                    <span className="text-[#25170D] underline">
                      Are You Hiring
                    </span>
                    <IoMdHelp className="text-[#F54A00] " aria-hidden="true" />
                  </button>
                </Link>
              </div>

              {/* Freelancer link */}
              <div ref={freeRef} className="w-full">
                <Link href="/free">
                  <button
                    type="button"
                    className="flex items-center gap-1 cursor-pointer"
                    aria-label="Need a freelancer?"
                  >
                    <span className="text-[#25170D] underline">
                      Need A Freelancer
                    </span>
                    <IoMdHelp className="text-[#F54A00]" aria-hidden="true" />
                  </button>
                </Link>
              </div>
            </div>

            <GoArrowRight className="" aria-hidden="true" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
