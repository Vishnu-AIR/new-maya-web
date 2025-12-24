import React from "react";
import FreeLancerNavbar from "./Components/FreeLancerNavbar";
import FreeLancerHeroSection from "./Components/FreeLancerHeroSection";
import FreeHowThisWork from "./Components/FreeHowThisWork";
import FreeNew1 from "./Components/FreeNew1";
import FreeNew3 from "./Components/FreeNew3";

export default function page() {
  return (
    <div className="bg-[#FFF4EC] w-full h-full overflow-hidden">
      <FreeLancerNavbar />
      <FreeLancerHeroSection />
      <FreeHowThisWork />
      <FreeNew1 />
      <FreeNew3 />
    </div>
  );
}
