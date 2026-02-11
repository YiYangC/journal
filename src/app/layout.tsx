import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Yi Yang | yangyi.io",
  description:
    "Exploring intersection between tech and design. Architecture, travel, and media.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://use.typekit.net" />
        <link
          rel="stylesheet"
          href="https://use.typekit.net/rmd7deq.css"
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <Navigation />
          <main className="min-h-screen overflow-hidden">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
