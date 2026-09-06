import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

// Montserrat es la tipografia de la marca MBC. Variable font: un solo archivo
// cubre de 300 a 900, asi que no hay que enumerar pesos.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MBC | Onboarding",
  description: "Plataforma de onboarding para nuevos consultores de MBC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <Script
          src="https://umami-mbc.vercel.app/script.js"
          data-website-id="61faf387-0f73-4b45-92e7-1e9a4f31d566"
          strategy="afterInteractive"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
