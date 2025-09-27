import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteConfig = {
  name: "Hypotheca",
  description:
    "Simulateur de prêt immobilier gratuit pour calculer vos mensualités, votre taux d'endettement et estimer votre capacité d'emprunt en quelques secondes.",
  url: "https://www.hypotheca.fr",
  ogImage: "https://www.hypotheca.fr/og/hypotheca-1200x630.png",
  author: "T....R",
  twitterHandle: "@hypotheca",
  keywords: [
    "simulateur prêt immobilier",
    "calculette crédit immobilier",
    "mensualité prêt immobilier",
    "simulation emprunt immobilier",
    "calcul taux d'endettement",
    "simulation capacité d'emprunt",
    "calcul mensualité crédit",
    "simulateur crédit maison",
    "outil gratuit prêt immobilier",
    "estimation crédit bancaire",
    "simulation prêt immobilier en ligne",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `Image de ${siteConfig.name}`,
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.twitterHandle.replace(/^@/, ""),
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot:
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const base = siteConfig.url;

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: base,
    logo: siteConfig.ogImage,
  };

  const siteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: base,
    potentialAction: {
      "@type": "SearchAction",
      target: `${base}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }}
        />
      </body>
    </html>
  );
}
