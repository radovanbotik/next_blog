import type { Metadata } from "next";
import "./globals.css";
import Layout from "./ui/Layout";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: {
    template: "%s | Rado Blog",
    default: "Rado blog.",
  },
  description: "By Rado for Rado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  );
}
