import React from "react";

/**
 * Type-safe React + Tailwind version of your component.
 * Save as New2.tsx
 */

/* Color variables based on the image */
const primaryOrange = "rgb(249, 115, 22)"; // deep vibrant orange
const lightBackground = "rgb(255, 240, 220)"; // soft background
const darkText = "rgb(30, 30, 30)"; // near-black for text/icons

/* ----------------------- Reusable Icon Components ------------------------ */

type IconProps = {
  className?: string;
};

/** Checkmark Icon - typed and accepts a color string */
const CheckIcon: React.FC<{ color?: string; className?: string }> = ({
  color = primaryOrange,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={color}
    className={`w-3 h-3 md:w-4 md:h-4 mr-1 inline-block ${className}`}
    aria-hidden
    role="img"
  >
    <circle cx="12" cy="12" r="12" fill={color} />
    <path
      d="M9.828 17.657l-4.242-4.243 1.414-1.414 2.828 2.828 6.364-6.364 1.414 1.414z"
      fill="white"
    />
  </svg>
);

/** ProfileCardIcon - simplified silhouette / card visual */
const ProfileCardIcon: React.FC<IconProps> = ({ className = "" }) => {
  return (
    <div
      className={`relative w-12 h-16 md:w-16 md:h-24 bg-white border border-gray-300 rounded-lg shadow-lg ${className}`}
      aria-hidden
    >
      {/* Header line */}
      <div className="absolute top-2 left-3 w-6 h-1 md:w-8 md:h-1.5 bg-gray-700 rounded-full" />
      {/* Body lines */}
      <div className="absolute top-5 left-3 w-10 h-1 md:w-12 md:h-1 bg-gray-300 rounded-full" />
      <div className="absolute top-7 left-3 w-8 h-1 md:w-10 md:h-1 bg-gray-300 rounded-full" />
      <div className="absolute top-9 left-3 w-10 h-1 md:w-12 md:h-1 bg-gray-300 rounded-full" />
      <div className="absolute top-12 left-3 w-10 h-1 md:w-12 md:h-1 bg-gray-300 rounded-full" />
    </div>
  );
};

/* ----------------------------- Profile Block ---------------------------- */

type ProfileProps = {
  /** Criteria items to show. Default keeps original items. */
  criteria?: string[];
};

const Profile: React.FC<ProfileProps> = ({ criteria = ["budget", "notice", "experience", "skills"] }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Icon and orange checkmark badge */}
      <div className="relative">
        <ProfileCardIcon />
        <div
          className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center"
          style={{ backgroundColor: primaryOrange }}
          aria-hidden
        >
          <svg className="w-3 h-3" fill="white" viewBox="0 0 24 24" aria-hidden>
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
          </svg>
        </div>
      </div>

      {/* Criteria list */}
      <div className="mt-2 text-xs md:text-sm text-center" style={{ color: darkText }}>
        {criteria.map((item) => (
          <div key={item} className="flex items-center justify-start text-left ml-2">
            <CheckIcon color={primaryOrange} />
            <span className="text-[10px] md:text-xs tracking-tighter">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ------------------------------ Main Component --------------------------- */

const New2: React.FC = () => {
  return (
    <div
      className="min-h-screen p-4 md:p-10"
      style={{ backgroundColor: lightBackground, fontFamily: "Arial, sans-serif" }}
    >
      {/* Placeholder for content ABOVE "Sends to..." */}
      <div className="flex justify-center">
        <div
          className="w-48 h-16 border-b-4 border-gray-700"
          aria-hidden
          /* This mimics the bottom line of the box above */
        />
      </div>

      {/* Large Down Arrow */}
      <div className="flex justify-center my-4 md:my-6 relative">
        {/* vertical bar */}
        <div className="w-0 h-12 md:h-16" style={{ borderLeft: `4px solid ${primaryOrange}` }} />
        {/* arrow head positioned absolutely relative to wrapper */}
        <div
          className="absolute"
          style={{
            marginTop: "3rem",
            width: 0,
            height: 0,
            borderTop: "10px solid " + primaryOrange,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
          }}
          aria-hidden
        />
      </div>

      {/* Heading */}
      <div className="text-center my-8 md:my-10">
        <h2 className="text-lg md:text-2xl font-semibold leading-tight" style={{ color: darkText }}>
          Sends to the perfect
          <br />
          high intent profiles only
        </h2>
      </div>

      {/* Horizontal line with arrows leading to profiles */}
      <div className="flex justify-center">
        <div className="w-full max-w-5xl h-0 border-t-2 border-gray-700 relative">
          <div className="flex justify-between absolute top-0 w-full transform -translate-y-full pt-10">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Vertical connector */}
                <div className="w-0 h-8 md:h-12" style={{ borderLeft: "2px solid rgb(55 65 81)" }} />
                {/* small down arrow head (rotated) */}
                <div className="w-0 h-0 border-t-[6px] border-l-[6px] border-r-[6px] border-gray-700 transform rotate-180 mb-2" />
                <Profile />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default New2;
