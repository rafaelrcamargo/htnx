import { FC, PropsWithChildren } from "react"

import { Analytics } from "@vercel/analytics/react"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

import { cn } from "@/lib/utils"

import "@/styles/globals.css"

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
