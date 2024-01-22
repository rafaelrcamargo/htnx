import { FC, PropsWithChildren } from "react"

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
          "min-w-screen min-h-dvh bg-slate-50 font-sans text-slate-500 antialiased"
        )}>
        {children}
      </body>
    </html>
  )
}

export default Layout
