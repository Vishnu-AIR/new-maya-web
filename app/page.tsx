import CTA from "@/Components/CTA";
import Footer from "@/Components/Footer";
import HeroSection from "@/Components/HeroSection";
import Image from "@/Components/Image";
import Navbar from "@/Components/Navbar";
import Need1000Section from "@/Components/Need1000Section";
import Video from "@/Components/Video";

export default function page() {
  return (
    <div className="bg-[#FFF4EC]  w-full overflow-hidden">
      <Navbar />
      <HeroSection />
      <Need1000Section />
      <Video />
      <Image />
      <CTA />
      <Footer />
    </div>
  );
}
