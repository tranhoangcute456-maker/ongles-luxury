import type { Metadata } from "next";
import "./globals.css";
import { SITE_NAME, TAGLINE, LOCATION, ADDRESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} · Nail Artist · ${LOCATION}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: `${TAGLINE} — ${SITE_NAME} is a luxury nail artist based in ${LOCATION}. Custom gel, 3D, ombré, bridal and nail art designs. Contact to book your appointment.`,
  keywords: ["nail artist", "luxury nails", "nail design", "gel nails", "bridal nails", "nail art Canada", "ongles luxury"],
  openGraph: {
    title: `${SITE_NAME} · Nail Artist · ${LOCATION}`,
    description: `${TAGLINE} — Custom luxury nail designs by ${SITE_NAME}`,
    type: "website",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} · ${LOCATION}`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
