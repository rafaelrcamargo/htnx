import { FC, PropsWithChildren } from "react"

import { GeistMono } from "geist/font/mono"
import { Toaster } from "sonner"

import "./globals.css"

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={`${GeistMono.variable} min-w-screen min-h-dvh bg-slate-50 font-mono text-slate-500`}>
        <Toaster richColors closeButton />
        {children}
      </body>
    </html>
  )
}

export default Layout
