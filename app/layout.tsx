import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Punti Furbi - Risparmia fino al 90% sui voli",
  description:
    "Scopri le migliori offerte di volo e risparmia fino al 90% sui tuoi viaggi. Notifiche in tempo reale per tariffe errore e offerte esclusive.",
  keywords: "voli economici, offerte volo, tariffe errore, viaggi low cost, punti furbi",
  authors: [{ name: "Punti Furbi" }],
  creator: "Punti Furbi",
  publisher: "Punti Furbi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://puntifurbi.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Punti Furbi - Risparmia fino al 90% sui voli",
    description:
      "Scopri le migliori offerte di volo e risparmia fino al 90% sui tuoi viaggi. Notifiche in tempo reale per tariffe errore e offerte esclusive.",
    url: "https://puntifurbi.com",
    siteName: "Punti Furbi",
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Punti Furbi - Risparmia fino al 90% sui voli",
    description:
      "Scopri le migliori offerte di volo e risparmia fino al 90% sui tuoi viaggi. Notifiche in tempo reale per tariffe errore e offerte esclusive.",
    creator: "@puntifurbi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
