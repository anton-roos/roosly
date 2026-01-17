import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roosly - Digital Services",
  description: "Your Partner in Digital Transformation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
