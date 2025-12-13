import HowThisWorks from "./Components/howthiswork";
import HRHeroSection from "./Components/HRHeroSection";
import HrNavbar from "./Components/HrNavbar";

import FlowDiagramSection from "./Components/New1";
import New3 from "./New3";
import NewCTA from "./NewCTA";

export default function page() {
  return (
    <div className="bg-[#FFF4EC] w-full h-full overflow-hidden">
      <HrNavbar />
      <HRHeroSection />
      <HowThisWorks />
      <FlowDiagramSection />
      <New3 />
    
    </div>
  );
}
