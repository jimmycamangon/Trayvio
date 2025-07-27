import type { Metadata } from "next";
import { Inter, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trayvio",
  description: "Your Event. Their Food. Our Platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Clean up any lingering dark theme classes on main site
                if (!window.location.pathname.startsWith('/cater')) {
                  document.documentElement.classList.remove('light', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${nunitoSans.variable} font-sans antialiased`}
        suppressHydrationWarning={true}
      >
        <AuthProvider>
        {children}
        <Toaster position="top-right" />
        {/* <Footer /> */}
        </AuthProvider>
      </body>
    </html>
  );
}
