import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Navbar } from "@/components/global/Navbar";
import { Footer } from "@/components/global/Footer";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Palette Dex",
  description: "A Pokedex for all your favorite Pokemon palettes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased bg-primary`}>
        {/* Google Tag Manager */}
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || ""} />

        {/* Google Analytics */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ""} />

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5C6VFTCQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
