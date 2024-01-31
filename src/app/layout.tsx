import { FC, PropsWithChildren } from "react"

import { Analytics } from "@vercel/analytics/react"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

import { cn } from "@/lib/utils"

import "@/styles/globals.css"
import { Metadata } from "next"

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          "min-w-screen min-h-dvh bg-slate-50 font-sans text-slate-500 antialiased dark:bg-zinc-900 dark:text-zinc-200"
        )}>
        {children}

        <div className="overlay pointer-events-none z-20" />

        <Analytics />
      </body>
    </html>
  )
}

export default Layout

const base = {
  url: "https://htnx.cmrg.me",
  title: "htnx - a htmx-like experience in Next.js (seriously)",
  description:
    "a htmx-like experience in Next.js with React Server Actions and quite a bit of questionable code."
}

export const metadata: Metadata = {
  title: base.title,
  description: base.description,
  metadataBase: new URL(base.url),
  icons: { shortcut: "/favicon.ico" },
  robots: { index: true, follow: true },
  authors: [
    { name: "Rafael R. Camargo", url: "https://github.com/rafaelrcamargo" }
  ],
  openGraph: {
    url: base.url,
    locale: "en_US",
    title: base.title,
    siteName: base.title,
    description: base.description,
    images: [{ url: "/og.webp" }],
    type: "website"
  },
  twitter: {
    site: base.url,
    title: base.title,
    images: [{ url: "/og.webp" }],
    description: base.description,
    card: "summary_large_image",
    creator: "@rafaelrcamargo"
  }
}
