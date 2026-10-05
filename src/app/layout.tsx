import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTAs from "@/components/FloatingCTAs";
import { hospitalData } from "@/lib/data";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#0E7490",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Trinethra Multi Speciality & Critical Care Center | 24/7 Hospital in Jangareddygudem",
    template: "%s | Trinethra Multispeciality Hospital",
  },
  description:
    "Trinethra Multi Speciality & Critical Care Center offers 24/7 emergency & trauma care, advanced ICU, multi-specialty doctors, diagnostic pathology, and round-the-clock pharmacy in Jangareddygudem, Andhra Pradesh.",
  keywords: [
    "multispeciality hospital in Jangareddygudem",
    "best hospital in Jangareddygudem",
    "best doctors in Jangareddygudem",
    "critical care hospital Jangareddygudem",
    "24/7 emergency hospital Jangareddygudem",
    "ICU hospital Jangareddygudem",
    "Trinethra Hospital Jangareddygudem",
    "Trinethra Multi Speciality and Critical Care Center",
    "pediatrician Jangareddygudem",
    "orthopedic doctor Jangareddygudem",
    "gynecologist Jangareddygudem"
  ],
  authors: [{ name: "Trinethra Multi Speciality & Critical Care Center" }],
  creator: "Trinethra Multispeciality Hospital",
  publisher: "Trinethra Multispeciality Hospital",
  metadataBase: new URL("https://trinethrahospital.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Trinethra Multi Speciality & Critical Care Center | 24/7 Emergency & ICU Jangareddygudem",
    description:
      "Premier 24/7 healthcare facility in Jangareddygudem with state-of-the-art ICU, emergency casualty, experienced specialist doctors, and diagnostic services.",
    url: "https://trinethrahospital.in",
    siteName: "Trinethra Multispeciality Hospital",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/assets/logo/logo.svg",
        width: 1200,
        height: 630,
        alt: "Trinethra Multi Speciality & Critical Care Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trinethra Multi Speciality & Critical Care Center - Jangareddygudem",
    description: "24/7 Emergency, ICU & Multispeciality hospital in Jangareddygudem, Andhra Pradesh.",
    images: ["/assets/logo/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Hospital", "MedicalOrganization", "EmergencyService"],
    "name": hospitalData.hospital.name,
    "alternateName": hospitalData.hospital.shortName,
    "url": "https://trinethrahospital.in",
    "logo": "https://trinethrahospital.in/assets/logo/logo.svg",
    "image": "https://trinethrahospital.in/assets/logo/logo.svg",
    "telephone": hospitalData.contact.primaryPhone,
    "emergencyTelephone": hospitalData.contact.emergencyPhone,
    "priceRange": "$$",
    "isAcceptingNewPatients": true,
    "medicalSpecialty": [
      "Critical Care Medicine",
      "Emergency Medicine",
      "General Practice",
      "Pediatrics",
      "Obstetrics and Gynecology",
      "Orthopedics",
      "Otolaryngology"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": hospitalData.contact.address.street,
      "addressLocality": hospitalData.contact.address.locality,
      "addressRegion": hospitalData.contact.address.state,
      "postalCode": hospitalData.contact.address.postalCode,
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.1264,
      "longitude": 81.2917
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": hospitalData.reviewsSummary.averageRating.toString(),
      "reviewCount": hospitalData.reviewsSummary.totalReviews.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      hospitalData.socialLinks.instagram,
      hospitalData.contact.directionsUrl
    ]
  };

  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-cyan-100 selection:text-cyan-900">
        <Header />
        <main className="flex-grow pb-16 sm:pb-0">{children}</main>
        <Footer />
        <FloatingCTAs />
      </body>
    </html>
  );
}
