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

export default function FreeNew1({}: {
  cvPileSrc?: string;
  mayaAvatarSrc?: string;
}) {
  return (
    <section className="w-full flex justify-center  ">
      <div className="w-full max-w-4xl text-center">
        {/* brush underline */}

        <div className=" flex items-center justify-center">
          <div className="flex items-center w-full lg:max-w-[18cm]  lg:ml-36">
            <div className="lg:flex justify-start items-start  rounded-lg w-full ">
              <h3 className="text-2xl lg:text-4xl font-semibold text-[#151515] text-start w-[50%]  ml-16 lg:mx-0">
                <h1 className="text-start  text-[#948E89] italic mt-8">
                  then ,
                </h1>
                <h1
                  className="mt-8  w-[8cm] lg:w-auto
                "
                >
                  Maya will <span className="text-[#F54A00] italic">find</span>{" "}
                  the right folks{" "}
                  <span className="text-[#F54A00] italic">& talk</span> to them
                  on your behalf
                </h1>
              </h3>

              <div className="">
                <img
                  className="w-[8cm] h-[8cm] object-contain ml-10  "
                  src="/SVG/Group 1171276868.svg"
                  alt="cv pile"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[1cm] w-full flex justify-center items-center">
          <img src="/SVG/arrow.svg" alt="" />
        </div>

        {/* Bottom block (avatar left + card right but reversed layout like image) */}
        <div className=" flex items-center justify-center">
          <div className="flex items-center w-full lg:max-w-[19cm]  lg:ml-44">
            <div className="lg:flex justify-start items-start  rounded-lg w-full ">
              <h3 className="text-2xl lg:text-4xl font-semibold text-[#151515] text-start w-[50%]  ml-16 lg:mx-0">
                <h1 className="mt-20 w-[8cm] lg:w-auto">
                  <span className="text-[#F54A00] italic"> Confirms </span>
                  the budget, timeline, availability, past exp & intent
                </h1>
              </h3>

              <div className="">
                <img
                  className="w-[8cm] h-[8cm] object-contain ml-10  "
                  src="/SVG/Screenshot 2025-12-22 at 10.55.17 PM 1 (1).svg"
                  alt="cv pile"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
