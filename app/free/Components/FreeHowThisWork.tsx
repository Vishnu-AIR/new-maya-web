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

export default function FreeHowThisWork({
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

        <div className="mt-[2cm] flex items-center justify-center">
          <div className="w-full  max-w-[13cm]">
            <div className="flex items-center gap-6 md:gap-8">
              {/* Card with shadow and border */}
              <div className="flex justify-start items-start h-[30vh] rounded-lg border-[2px] border-[#1f1f1f]  relative">
                <img
                  className="w-[5cm] h-full object-contain "
                  src="/Images/maya2.png"
                  alt="cv pile"
                />
                <div className=" p-6">
                  <h3 className="text-lg lg:text-2xl font-semibold text-[#151515] text-left ">
                    Just tell
                    <span
                      style={{ fontFamily: "DavidLibre" }}
                      className="text-[#F54A00] ml-1 mr-1"
                    >
                      Maya
                    </span>
                    your
                    <br />
                    project requirements
                  </h3>

                  <p className="mt-4 text-sm md:text-base text-black text-left">
                    <div className="flex gap-10">
                      <h1 className="flex gap-3">
                        <img
                          className="w-6 h-6 "
                          src="/Images/streamline-freehand-color_money-bag.png"
                          alt="Timeline"
                        />{" "}
                        Budget
                      </h1>
                      <h1 className="flex gap-3">
                        <img
                          className="w-6 h-6 "
                          src="/Images/game-icons_sands-of-time.png"
                          alt="Budget"
                        />{" "}
                        Timeline
                      </h1>
                    </div>
                    <h1 className="flex gap-3 mt-2 mb-2">
                      {" "}
                      <img
                        className="w-6 h-6 "
                        src="/Images/solar_telescope-broken.png"
                        alt="Budget"
                      />{" "}
                      Scope of work
                    </h1>
                    <h1 className="flex gap-3 mt-2 mb-2">
                      {" "}
                      <img
                        className="w-6 h-6 "
                        src="/Images/carbon_term-reference.png"
                        alt="Budget"
                      />{" "}
                      Refrence work
                    </h1>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[1cm] mb-[1cm] w-full flex justify-center items-center">
          <img src="/SVG/arrow.svg" alt="" />
        </div>

       

      </div>
    </section>
  );
}
