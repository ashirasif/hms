import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { SeshProvider } from "../components/providers";
import { Toaster } from "~/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "HMS - Hospital Management System",
  description: "Hospital Management System",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} bg-black h-screen text-white`}>
        <SeshProvider>
        <TRPCReactProvider>
            {children}
          </TRPCReactProvider>
        </SeshProvider>
        <Toaster />
      </body>
    </html>
  );
}
