import { Highlighter } from "@/Components/ui/highlighter";
import React from "react";

/**
 * Pixel‑perfect "How Maya Works" component built with TailwindCSS.
 * Replace the placeholder images in the <img> tags with your own assets
 * (e.g. put them in /public/images and use `/images/your-file.png`).
 *
 * Notes:
 * - Uses Tailwind utility classes for layout and spacing.
 * - Colors and spacing have been tuned to match the provided image.
 * - If you want exact font matching, add the font to your project and
 *   adjust the classNames accordingly.
 */

export default function New1({
  cvPileSrc = "/images/cv-pile.png",
  mayaAvatarSrc = "/images/maya-avatar.png",
}: {
  cvPileSrc?: string;
  mayaAvatarSrc?: string;
}) {
  return (
    <section className="w-full flex justify-center  ">
      <div className="w-full max-w-4xl text-center">
        {/* brush underline */}

        {/* Top block (CV pile on left, text card on right) */}
        <div className=" flex items-center justify-center">
          <div className="flex items-center w-full max-w-[12cm] ">
            {/* Text card (right) */}
            <div
              className="flex justify-start items-start h-[20vh] rounded-lg border-[2px] border-[#1f1f1f] relative "
              style={{ boxShadow: "0 2px 0 rgba(0,0,0,0.02)" }}
            >
              <img
                className="w-[8cm] h-[8cm] object-contain  absolute top-[-120%] left-[-20%]"
                src="/Images/Illustration - List Is Empty.png"
                alt="cv pile"
              />

              <div className=" p-6 pt-16 ">
                <h3 className="text-lg lg:text-2xl font-semibold text-[#151515] text-left">
                  Maya will find the right folks & talk to them on your behalf
                </h3>
              </div>
            </div>
          </div>
        </div>
           <div className="mt-[1cm] w-full flex justify-center items-center">
          <img src="/SVG/arrow.svg" alt="" />
        </div>

        {/* Bottom block (avatar left + card right but reversed layout like image) */}
        <div className="mt-6 flex items-center justify-center">
          <div className="w-full  max-w-[12cm]">
            <div className="flex items-center gap-6 md:gap-8">
              {/* Card with shadow and border */}
              <div className="flex justify-start items-start h-[20vh] rounded-lg border-[2px] border-[#1f1f1f]  relative">
             <img
                className="w-[8cm] h-[8cm] object-contain  absolute top-[-120%] left-[-20%]"
                src="/Images/Illustration - Social Distancing.png"
                alt="cv pile"
              />
                <div className=" p-6 pt-16">
                  <h3 className="text-lg lg:text-2xl font-semibold text-[#151515] text-left ">
                    Confirms budget, timeline, availability, past exp & intent
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
