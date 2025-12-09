// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import React from "react";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://your-domain.com"; // <- replace with your real domain
const SITE_NAME = "Maya AI";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`; // <- replace with your MayaImage
const AUTHOR_NAME = "Meshly Technologies Pvt. Ltd.";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Your Profile, pitched to thousands of Founders & HRs`,
    template: "%s | Maya AI",
  },
  description:
    "Maya — a super AI that pitches your profile on WhatsApp to thousands of founders, HRs, and paying clients. Get discovered, faster.",
  applicationName: SITE_NAME,
  keywords: [
    "Maya AI",
    "AI hiring",
    "WhatsApp pitch",
    "profile pitching",
    "find jobs",
    "get clients",
  ],
  authors: [{ name: AUTHOR_NAME }],
  creator: AUTHOR_NAME,
  openGraph: {
    title: `${SITE_NAME} — Your Profile, pitched to 1000s`,
    description:
      "Maya pitches your profile on WhatsApp to thousands of founders, HRs & paying clients so you get discovered quickly.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_IMAGE,
        width: 1200,
        height: 630,
        alt: "Maya AI — Profile pitching on WhatsApp",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Profile pitching on WhatsApp`,
    description:
      "Maya pitches your profile on WhatsApp to thousands of founders, HRs & paying clients.",
    images: [DEFAULT_IMAGE],
    creator: "@your_twitter_handle", // <- replace your_twitter_handle
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico", // replace your favicon
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: DEFAULT_IMAGE,
      },
      sameAs: [
        "https://www.linkedin.com/in/your-profile", // replace your-profile
        "https://twitter.com/your_twitter_handle", // replace your_twitter_handle
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        <link rel="canonical" href={SITE_URL} />

        <meta name="theme-color" content="#ffffff" />

        <meta name="robots" content="index, follow" />
        {/* Add any verification meta tags here after you verify the domain */}
        <meta name="google-site-verification" content="YOUR_TOKEN_HERE" />
      </head>

      <body
        className={`${manrope.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
