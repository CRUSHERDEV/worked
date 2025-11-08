import type { Metadata } from "next";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Body font (Inter Regular - from design system)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Display font (Poppins SemiBold - from design system)
const poppins = Poppins({
  weight: ["400", "500", "600", "700"], // SemiBold (600) for headings
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

// Mono font (JetBrains Mono - from design system)
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Linked All - Connect, Trade, Grow",
  description:
    "A pan-African, multi-vertical digital ecosystem connecting consumers, vendors, and producers",
  keywords: ["marketplace", "africa", "e-commerce", "digital payments", "logistics"],
  authors: [{ name: "Linked All Team" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#0066FF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
