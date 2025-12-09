"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { IoMdHelp } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";
import gsap from "gsap";

const UserProfile = () => (
  <Link href="/" className="flex items-center space-x-3 focus:outline-none" aria-label="Home">
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
      style={{ fontFamily: "Fontspring" }}
      className="text-xl md:text-3xl text-orange-400 font-semibold"
      aria-label="User name"
    >
      Maya
    </span>
  </Link>
);

const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
  <div
    className={
      `flex ${isMobile ? "flex-col space-y-4" : "items-center space-x-8"} text-md font-medium`
    }
  >
    <button
      type="button"
      className="flex items-center gap-1 cursor-pointer"
      aria-label="Need a freelancer?"
    >
      <span className="text-[#25170D]">Need A Freelancer</span>
      <IoMdHelp className="text-orange-400" aria-hidden="true" />
    </button>

    <button
      type="button"
      className="flex items-center gap-1 cursor-pointer"
      aria-label="Are you hiring?"
    >
      <span className="text-[#25170D]">Are You Hiring</span>
      <IoMdHelp className="text-orange-400" aria-hidden="true" />
    </button>
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
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out" }
    );

    tlRef.current.fromTo(
      profileEl,
      { x: -18, y: -6, opacity: 0, filter: "blur(10px)" },
      { x: 0, y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power2.out" },
      "<0.06"
    );

    const linkChildren = Array.from(linksEl.children) as HTMLElement[];
    tlRef.current.fromTo(
      linkChildren,
      { y: -28, opacity: 0, filter: "blur(8px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.55, stagger: 0.08, ease: "power2.out" },
      "<0.08"
    );

    tlRef.current.fromTo(
      ctaEl,
      { scale: 0.96, opacity: 0, filter: "blur(6px)" },
      { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.7, ease: "back.out(1.1)" },
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


  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const menu = mobileMenuRef.current;
    if (!menu) return;

    if (prefersReduced) {
      menu.style.display = menuOpen ? "block" : "none";
      return;
    }

    if (menuOpen) {
      gsap.killTweensOf(menu);
      gsap.set(menu, { display: "block" });
      gsap.fromTo(
        menu,
        { y: -12, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.28, ease: "power2.out" }
      );
    } else {
      gsap.to(menu, {
        y: -8,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.22,
        ease: "power2.in",
        onComplete: () => {
          if (mobileMenuRef.current) mobileMenuRef.current.style.display = "none";
        },
      });
    }
  }, [menuOpen]);


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
      <div className="max-w-3xl mx-auto py-4 px-4 md:px-0">
        <div
          ref={containerRef}
          className="flex items-center justify-between p-2 pl-4 bg-[#FFF4EC] border border-b-4 border-[#25170D] rounded-2xl relative"
        >
          <div ref={profileWrapRef} className="shrink-0">
            <UserProfile />
          </div>

       
          <div
            ref={linksWrapRef}
            className="hidden md:flex md:items-center md:justify-center md:flex-1"
            aria-hidden={menuOpen}
          >
            <NavLinks />
          </div>

          <div className="flex items-center gap-2">
    
            <div ref={ctaWrapRef} className="hidden md:block">
              <button
                className="py-2 px-3 pr-5 gap-2 hover:scale-[1.03] flex justify-center items-center bg-green-500 text-white text-lg rounded-2xl shadow-inner shadow-green-200 border border-b-4 border-green-600 hover:bg-green-600/90 cursor-pointer transition duration-300"
                aria-label="Try now"
              >
                <span className="text-[#EDE3D8] p-px rounded-md">
                  <FaWhatsapp size={22} />
                </span>
                <span className="hidden sm:inline">Try now</span>
              </button>
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMenuOpen((s) => !s)}
                aria-controls="mobile-menu"
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className="md:hidden mt-3 p-4 bg-[#FFF4EC] border border-[#E6D9C9] rounded-2xl"
          style={{ display: "none" }}
        >
          <NavLinks isMobile />

          <div className="mt-4">
            <button
              className="w-full py-3 flex items-center justify-center gap-2 bg-green-500 text-white rounded-2xl border border-b-4 border-green-600 shadow-inner shadow-green-200"
              aria-label="Try now mobile"
            >
              <FaWhatsapp />
              <span>Try now</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
