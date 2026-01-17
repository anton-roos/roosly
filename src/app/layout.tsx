import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FF033E',
};

export const metadata: Metadata = {
  title: {
    default: "Roosly - AI-Driven Digital Transformation",
    template: "%s | Roosly",
  },
  description: "Transform your business with AI-powered solutions. Expert consulting in AI strategy, intelligent software engineering, and digital transformation.",
  keywords: ['AI consulting', 'digital transformation', 'AI strategy', 'software engineering', 'web development', 'mobile apps', 'business advisory'],
  authors: [{ name: 'Roosly' }],
  creator: 'Roosly',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://roosly.com',
    title: 'Roosly - AI-Driven Digital Transformation',
    description: 'Transform your business with AI-powered solutions',
    siteName: 'Roosly',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roosly - AI-Driven Digital Transformation',
    description: 'Transform your business with AI-powered solutions',
    creator: '@antonieroos',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <head>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
