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

export default function HowThisWorks({
  cvPileSrc = "/images/cv-pile.png",
  mayaAvatarSrc = "/images/maya-avatar.png",
}: {
  cvPileSrc?: string;
  mayaAvatarSrc?: string;
}) {
  return (
    <section className="w-full flex justify-center py-16 px-6 ">
      <div className="w-full max-w-4xl text-center">
        {/* Heading */}
        <h2
          style={{ fontFamily: "DavidLibre" }}
          className="text-3xl md:text-4xl font-semibold text-[#231915]"
        >
          <Highlighter action="underline" color="#FF6A2E">
            How Maya Works <span className="text-[#FF6A2E]">?</span>
          </Highlighter>
        </h2>

        {/* brush underline */}

        {/* Top block (CV pile on left, text card on right) */}
        <div className="mt-[2cm] flex items-center justify-center">
          <div className="flex items-center w-full max-w-[12cm] ">
            {/* Text card (right) */}
            <div
              className="flex justify-start items-start h-[20vh] rounded-lg border-[2px] border-[#1f1f1f] relative "
              style={{ boxShadow: "0 2px 0 rgba(0,0,0,0.02)" }}
            >
              <img
                className="w-[8cm] h-[8cm] object-contain  absolute top-[-30%] left-[-20%]"
                src="/Images/Gemini_Generated_Image_r608q8r608q8r608 1.png"
                alt="cv pile"
              />

              <div className="lg:pl-[5.5cm] p-6 ">
                <h3 className="text-lg lg:text-2xl font-semibold text-[#151515] text-left">
                  Too many CV's
                </h3>
                <p className="mt-2 text-sm md:text-base  text-[#6b6b6b]   text-left">
                  have too many CVs from many different platforms?
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[1cm] mb-[1cm] w-full flex justify-center items-center">
          <img src="/SVG/arrow.svg" alt="" />
        </div>

        {/* Bottom block (avatar left + card right but reversed layout like image) */}
        <div className="mt-6 flex items-center justify-center">
          <div className="w-full  max-w-[12cm]">
            <div className="flex items-center gap-6 md:gap-8">
              {/* Card with shadow and border */}
              <div className="flex justify-start items-start h-[25vh] rounded-lg border-[2px] border-[#1f1f1f]  relative">
                <img
                  className="w-[5cm] h-full object-contain "
                  src="/Images/maya2.png"
                  alt="cv pile"
                />
                <div className=" p-6">
                  <h3 className="text-lg lg:text-2xl font-semibold text-[#151515] text-left ">
                    Just hand them <span className="text-[#F54A00]">Maya</span>
                  </h3>

                  <p className="mt-2 text-sm md:text-base text-[#6b6b6b] text-left">
                    Send/Upload all your CV's from any where to maya
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[1cm] w-full flex justify-center items-center">
          <img src="/SVG/arrow.svg" alt="" />
        </div>
      </div>
    </section>
  );
}
