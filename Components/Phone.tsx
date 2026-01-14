import React, { useEffect, useRef, useState } from "react";
import { FaSignal, FaWifi, FaPhoneAlt } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { IoBatteryFull } from "react-icons/io5";

type Candidate = {
  name: string;
  ctc: string;
  phone: string;
};

type Msg = {
  type: "outgoing" | "incoming";
  text?: string;
  rich?: Candidate[];
};

type Scenario = {
  from: string;
  messages: Msg[];
};

type DisplayMsg = {
  id: string;
  from: string;
  type: "outgoing" | "incoming";
  text?: string;
  rich?: Candidate[];
};

const Phone: React.FC = () => {
  const scenarios: Scenario[] = [
    {
      from: "Raj",
      messages: [
        { type: "outgoing", text: "hey Maya 👋" },
        {
          type: "outgoing",
          text: "We urgently need a Senior Backend (Node/Express). 15-20 LPA — can interview this week?",
        },
        {
          type: "incoming",
          text: "On it — lemme pull a couple of profiles who fit the bill.",
        },
        {
          type: "incoming",
          rich: [
            {
              name: "Vishnu — Backend (2+ yrs)",
              ctc: "CTC: 16 LPA",
              phone: "+91-89208 39800",
            },
            {
              name: "Neeraj — Backend (3+ yrs)",
              ctc: "CTC: 18 LPA",
              phone: "+91-98765 43291",
            },
          ],
        },
      ],
    },
    {
      from: "Kavya",
      messages: [
        { type: "outgoing", text: "hey Maya — quick q:" },
        {
          type: "outgoing",
          text: "Need a Frontend dev (React + Typescript). Mid-senior. Remote ok. Budget 10-14L.",
        },
        {
          type: "incoming",
          text: "Gotcha — I’ll check folks who love clean UI and performance.",
        },
        {
          type: "incoming",
          rich: [
            {
              name: "Ravi — Frontend (2 yrs)",
              ctc: "CTC: 12 LPA",
              phone: "+91-90000 12345",
            },
            {
              name: "Shreya — Frontend (4 yrs)",
              ctc: "CTC: 14 LPA",
              phone: "+91-90001 54321",
            },
          ],
        },
      ],
    },
    {
      from: "Aman",
      messages: [
        {
          type: "outgoing",
          text: "Mayayy — need a UX/UI designer who can do end-to-end. Remote ok.",
        },
        {
          type: "outgoing",
          text: "Prefer someone with Figma + some motion design. 8-12L",
        },
        {
          type: "incoming",
          text: "Nice brief — I know a couple designers who do product-focused work.",
        },
        {
          type: "incoming",
          rich: [
            {
              name: "Pooja — Designer (3 yrs)",
              ctc: "CTC: 9 LPA",
              phone: "+91-91000 22233",
            },
            {
              name: "Sameer — Product Designer (5 yrs)",
              ctc: "CTC: 12 LPA",
              phone: "+91-91001 44455",
            },
          ],
        },
      ],
    },
    {
      from: "Priya",
      messages: [
        {
          type: "outgoing",
          text: "hi Maya — any DevOps folks? Need k8s + terraform experience.",
        },
        {
          type: "outgoing",
          text: "Production infra, must be comfortable with CI/CD. 18L bracket.",
        },
        {
          type: "incoming",
          text: "I’ll surface folks who run infra at scale — give me a sec.",
        },
        {
          type: "incoming",
          rich: [
            {
              name: "Ankit — DevOps (4 yrs)",
              ctc: "CTC: 17 LPA",
              phone: "+91-92000 33344",
            },
            {
              name: "Nidhi — SRE/DevOps (5 yrs)",
              ctc: "CTC: 19 LPA",
              phone: "+91-92001 55566",
            },
          ],
        },
      ],
    },
    {
      from: "Sameer",
      messages: [
        {
          type: "outgoing",
          text: "hey Maya — looking for a growth/marketing person (performance).",
        },
        {
          type: "outgoing",
          text: "Budget 10L, must know paid acquisition + analytics.",
        },
        {
          type: "incoming",
          text: "Cool — I’ll share marketers who have scaled paid funnels before.",
        },
        {
          type: "incoming",
          rich: [
            {
              name: "Isha — Growth (3 yrs)",
              ctc: "CTC: 10 LPA",
              phone: "+91-93000 66677",
            },
            {
              name: "Rohit — Performance (4 yrs)",
              ctc: "CTC: 11 LPA",
              phone: "+91-93001 88899",
            },
          ],
        },
      ],
    },
  ];

  const [displayed, setDisplayed] = useState<DisplayMsg[]>([]);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: number | null = null;

    const runScenario = (scenarioIndex = 0, messageIndex = 0) => {
      if (cancelled) return;
      const scenario = scenarios[scenarioIndex];
      if (!scenario) return;

      if (messageIndex < scenario.messages.length) {
        const msg = scenario.messages[messageIndex];
        const instance: DisplayMsg = {
          id: `${scenarioIndex}-${messageIndex}-${Date.now()}`,
          from: scenario.from,
          type: msg.type,
          text: msg.text,
          rich: msg.rich,
        };

        setDisplayed((prev) => [...prev, instance]);

        timeoutId = window.setTimeout(
          () => runScenario(scenarioIndex, messageIndex + 1),
          1000
        );
        return;
      }

      // scenario finished
      timeoutId = window.setTimeout(() => {
        if (cancelled) return;
        const nextScenario = (scenarioIndex + 1) % scenarios.length;
        setDisplayed([]);
        timeoutId = window.setTimeout(() => runScenario(nextScenario, 0), 600);
      }, 1000);
    };

    timeoutId = window.setTimeout(() => runScenario(0, 0), 600);

    return () => {
      cancelled = true;
      if (timeoutId !== null) window.clearTimeout(timeoutId);
    };
  }, []); // run once on mount

  return (
    <div className="rounded-4xl flex items-center justify-center">
      <div className="relative mx-auto border-neutral-800 border-6 bg-white rounded-[50px] h-[700px] w-[350px] shadow-xl overflow-clip">
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-[100px] h-[28px] bg-neutral-900 rounded-2xl z-20" />

        <div className="h-full w-full bg-[#E4DCD3]/10 rounded-3xl overflow-hidden flex flex-col relative">
          <div className="h-8 bg-white flex items-center justify-between px-6 z-10 text-black">
            <span className="text-sm font-semibold ml-2">9:41</span>
            <div className="flex gap-1.5 items-center mr-1">
              <FaSignal className="text-xs" />
              <FaWifi className="text-xs" />
              <IoBatteryFull className="text-lg" />
            </div>
          </div>

          {/* header*/}
          <div className="bg-white px-4 py-2 flex items-center justify-between shadow-sm z-10 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/avtar2.jpg"
                  alt="Maya"
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-gray-800 text-lg">Maya</span>
                  <MdVerified className="text-blue-500 text-base" />
                </div>
              </div>
            </div>
            <button aria-hidden />
          </div>

          {/* messages area */}
          <div
            ref={listRef}
            className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 relative z-10 pb-10"
          >
            {displayed.map((m) => (
              <div
                key={m.id}
                className={
                  m.type === "outgoing"
                    ? "self-end max-w-[80%]"
                    : "self-start max-w-[85%]"
                }
              >
                {/* text bubble */}
                {m.text && (
                  <div
                    className={
                      m.type === "outgoing"
                        ? "bg-[#C8F6A8] p-3 rounded-2xl rounded-tr-none shadow-sm text-gray-800 text-sm font-medium"
                        : "bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-gray-800 text-sm font-medium"
                    }
                  >
                    {m.text}
                  </div>
                )}

                {/* rich payload candidate cards */}
                {m.rich && (
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-gray-800 text-sm mt-2">
                    {m.rich.map((c, i) => (
                      <div key={i} className="mb-3">
                        <p className="font-bold text-base text-gray-800">
                          {i + 1}. {c.name}
                        </p>
                        <p className="font-medium text-gray-700 mt-0.5">
                          {c.ctc}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-blue-500 font-medium cursor-pointer hover:underline">
                          <FaPhoneAlt className="text-xs transform scale-x-[-1]" />
                          <span>{c.phone}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phone;
