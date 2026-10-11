import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Fitness Freak - India's Best Bodybuilding & Sports Nutrition Brand",
  description:
    "Fitness Freak is India's trusted sports nutrition & bodybuilding supplements brand. Shop 100% authentic Biozyme whey protein, CreAMP creatine, mass gainers & fit foods.",
  keywords: [
    "Fitness Freak",
    "Whey Protein",
    "Biozyme Whey",
    "Creatine Monohydrate",
    "Mass Gainer",
    "Sports Nutrition",
    "Supplements India",
    "Gym Supplements",
  ],
  authors: [{ name: "Fitness Freak" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0c0c0e] text-[#f4f4f5] antialiased flex flex-col selection:bg-[#ff5c00] selection:text-white">
        <Providers>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
