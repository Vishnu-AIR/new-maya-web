"use client";

import { useState, useEffect, useRef } from "react";
import AnimatedChat from "@/Components/AnimatedChat";
import HeroSection from "@/Components/HeroSection";
import Image from "@/Components/Image";
import Navbar from "@/Components/Navbar";
import Need1000Section from "@/Components/Need1000Section";
import Video from "@/Components/Video";

const ASSETS_TO_PRELOAD = ["/her0.png", "/black.png", "/avtar2.jpg"];

interface WindowWithAudio extends Window {
  webkitAudioContext?: typeof AudioContext;
}

export default function Page() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const audioUnlockedRef = useRef(false);

  // Preload assets
  useEffect(() => {
    let loaded = 0;
    const total = ASSETS_TO_PRELOAD.length;

    ASSETS_TO_PRELOAD.forEach((src) => {
      const img = new window.Image();
      img.onload = img.onerror = () => {
        loaded++;
        setLoadingProgress(Math.round((loaded / total) * 100));
        if (loaded === total) {
          setAssetsLoaded(true);
        }
      };
      img.src = src;
    });
  }, []);

  // Unlock audio on first user interaction
  useEffect(() => {
    const unlockAudio = () => {
      if (audioUnlockedRef.current) return;

      const extendedWindow = window as WindowWithAudio;
      const AudioContextClass =
        window.AudioContext || extendedWindow.webkitAudioContext;

      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        ctx.resume();
      }

      audioUnlockedRef.current = true;
      document.removeEventListener("click", unlockAudio);
      document.removeEventListener("touchstart", unlockAudio);
      document.removeEventListener("scroll", unlockAudio);
    };

    document.addEventListener("click", unlockAudio);
    document.addEventListener("touchstart", unlockAudio);
    document.addEventListener("scroll", unlockAudio);

    return () => {
      document.removeEventListener("click", unlockAudio);
      document.removeEventListener("touchstart", unlockAudio);
      document.removeEventListener("scroll", unlockAudio);
    };
  }, []);

  return (
    <div className="bg-[#FFF4EC]  w-full h-full overflow-hidden">
      <Navbar />
      <HeroSection
        loadingProgress={loadingProgress}
        isLoading={!assetsLoaded}
      />
      {assetsLoaded && <AnimatedChat />}
      <Need1000Section />
      <Video />
      <Image />
    </div>
  );
}
