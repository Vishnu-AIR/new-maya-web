import { Highlighter } from "@/Components/ui/highlighter";

export default function FreeHowThisWork() {
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
              <div className="flex justify-start items-start h-[30vh] rounded-lg border border-r-3 border-b-3 border-[#1f1f1f]  relative bg-[#FFEADA]">
                <img
                  className="w-[3cm] mt-8 lg:mt-0 lg:w-[5cm] h-full object-contain  "
                  src="/Images/maya2.png"
                  alt="cv pile"
                />
                <div className=" p-6">
                  <h3 className="text-xl lg:text-2xl font-semibold text-[#151515] text-left ">
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
                    <div className="lg:flex gap-10">
                      <h1 className="flex gap-3">
                        <img
                          className="w-6 h-6 "
                          src="/Images/streamline-freehand-color_money-bag.png"
                          alt="Timeline"
                        />{" "}
                        Budget
                      </h1>
                      <h1 className="flex gap-3 mt-3 lg:mt-0">
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
        <div className="lg:mt-[1cm] lg:mb-[1cm] w-full flex justify-center items-center">
          <img className="h-[3cm] lg:h-[5cm]" src="/SVG/arrow.svg" alt="" />
        </div>
      </div>
    </section>
  );
}
