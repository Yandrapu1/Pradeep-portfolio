import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { Providers } from "@/components/Providers";
import { GITHUB_URL, LINKEDIN_URL, EMAIL, SITE_URL, PERSON } from "@/data/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const DESCRIPTION =
  "Pradeep Yandrapu is a Full Stack Developer building modern web applications across frontend, backend, databases, APIs and production infrastructure.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pradeep Yandrapu | Full Stack Developer",
    template: "%s | Pradeep Yandrapu",
  },
  description: DESCRIPTION,
  keywords: [
    "Pradeep Yandrapu",
    "Full Stack Developer",
    "Software Engineer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "MySQL",
  ],
  authors: [{ name: PERSON.name }],
  creator: PERSON.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Pradeep Yandrapu | Full Stack Developer",
    description: DESCRIPTION,
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Pradeep Yandrapu",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Pradeep Yandrapu — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pradeep Yandrapu | Full Stack Developer",
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = stored ? stored === 'dark' : systemDark;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON.name,
    jobTitle: "Full Stack Developer",
    email: EMAIL,
    url: SITE_URL,
    sameAs: [GITHUB_URL, LINKEDIN_URL],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Dr. Lankapalli Bullayya College of Engineering",
    },
    knowsAbout: [
      "Full Stack Web Development",
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "TypeScript",
      "MySQL",
      "PostgreSQL",
      "REST APIs",
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans relative">
        <Providers>
          <ScrollProgressBar />
          <Navigation />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
