import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import ClientProviders from "../components/commons/ClientProviders";
import ServiceWorkerRegister from "../components/commons/ServiceWorkerRegister";
import RootMain from "@/components/root/RootMain";
import RootHeadMeta from "@/components/root/RootHeadMeta";
import { RootThemeScript } from "@/components/root/RootThemeScript";
import { RootSchemaScript } from "@/components/root/RootSchemaScript";
import { RootSkipLink } from "@/components/root/RootSkipLink";
import { RootBackdrops } from "@/components/root/RootBackdrops";
import { RootPortals } from "@/components/root/RootPortals";
import { getRootMetadata } from "@/lib/layout/rootMetadata";
import { rootViewport } from "@/lib/layout/rootViewport";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  adjustFontFallback: true,
  weight: ["400", "500", "700"],
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});

export const metadata: Metadata = getRootMetadata();
export const viewport = rootViewport;
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const bodyClasses = `${inter.className} antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50
    selection:bg-violet-500/20 dark:selection:bg-violet-400/30 selection:text-violet-900 dark:selection:text-violet-100`;

  return (
    <html lang="fr" className={inter.variable} suppressHydrationWarning>
      <head>
        <RootHeadMeta fontVariable={inter.variable} />
        <RootThemeScript />
        <RootSchemaScript />
      </head>
      <body className={bodyClasses} suppressHydrationWarning>
       
        <RootSkipLink />

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          storageKey="monetoile-theme"
        >
          <ClientProviders>
            <RootBackdrops />
            <RootMain>
              {children}
            </RootMain>
          </ClientProviders>
          <ServiceWorkerRegister />
        </ThemeProvider>

        <RootPortals />
      </body>
    </html>
  );
}