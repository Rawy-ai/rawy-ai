import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rawy - AI-Powered Arabic Storytelling",
  description: "Create personalized Arabic stories with AI. Engaging, culturally authentic content for the Arab world.",
  keywords: ["Arabic stories", "AI storytelling", "Rawy", "interactive fiction", "Arab culture"],
  openGraph: {
    title: "Rawy - AI-Powered Arabic Storytelling",
    description: "Create personalized Arabic stories with AI. Engaging, culturally authentic content.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rawy - AI-Powered Arabic Storytelling",
    description: "Create personalized Arabic stories with AI.",
  },
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="antialiased bg-white text-slate-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
