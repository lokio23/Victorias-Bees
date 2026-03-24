import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Victoria's Bees | Honeybee Science for Young Melittologists",
  description:
    "A hands-on honeybee beekeeping curriculum for kids ages 9-12. Visit real hives, learn bee science, and become a young melittologist!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-cream">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
