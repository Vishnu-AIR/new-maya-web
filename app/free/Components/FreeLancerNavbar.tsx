"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdHelp } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";
import gsap from "gsap";

type NavLinksProps = { isMobile?: boolean; onNavigate?: () => void };

const scrollOrNavigate = (id: string) => {
  if (typeof window === "undefined") return;

  const cleanId = id.startsWith("#") ? id.slice(1) : id;
  const isHome =
    window.location.pathname === "/" || window.location.pathname === "";

  if (isHome) {
    const el = document.getElementById(cleanId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    history.replaceState(null, "", `#${cleanId}`);
    setTimeout(() => {
      const e = document.getElementById(cleanId);
      e?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  } else {
    window.location.href = `/free/#${cleanId}`;
  }
};

const NavLinks = ({ isMobile = false, onNavigate }: NavLinksProps) => {
  const containerClass = `flex px-6 ${
    isMobile ? "flex-col space-y-4" : "items-center space-x-8"
  } text-md font-medium`;

  const handleClick = (id: string) => {
    scrollOrNavigate(id);
    if (onNavigate) onNavigate();
  };

  return (
    <div className={containerClass}>
      <Link
        href="/"
        className="flex items-center gap-1 cursor-pointer"
        aria-label="Home"
      >
        <span className="text-[#25170D]">Home</span>
      </Link>

      <button
        type="button"
        onClick={() => handleClick("how-it-works")}
        className="flex items-center gap-1 cursor-pointer"
        aria-label="How it works"
      >
        <span className="text-[#25170D]">How it's works</span>
        <IoMdHelp className="text-[#F54A00]" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={() => handleClick("faqs")}
        className="flex items-center gap-1 cursor-pointer"
        aria-label="FAQs"
      >
        <span className="text-[#25170D]">FAQ's</span>
      </button>
    </div>
  );
};

const UserProfile = () => (
  <Link
    href="/"
    className="flex items-center space-x-3 focus:outline-none"
    aria-label="Home"
  >
    <div className="w-12 h-12 relative overflow-hidden rounded-full">
      <Image
        src="/Images/maya.png"
        alt="Maya avatar"
        width={48}
        height={48}
        priority
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

const HrNavbar: React.FC = () => {
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
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.28,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(menu, {
        y: -8,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.22,
        ease: "power2.in",
        onComplete: () => {
          if (mobileMenuRef.current)
            mobileMenuRef.current.style.display = "none";
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
      <div className="max-w-xl mx-auto py-4 px-4 md:px-0">
        <div
          ref={containerRef}
          className="w-full flex items-center justify-between p-2 bg-[#FFF4EC] border border-b-4 border-[#25170D] rounded-lg relative"
        >
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

          <div className="md:hidden flex items-center gap-2">
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

        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className="md:hidden mt-3 p-4 bg-[#FFF4EC] border border-[#E6D9C9] rounded-2xl"
          style={{ display: "none" }}
        >
          <NavLinks isMobile onNavigate={() => setMenuOpen(false)} />
        </div>
      </div>
    </nav>
  );
};

export default HrNavbar;
