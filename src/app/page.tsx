"use client"

import { FC, PropsWithChildren, useRef } from "react"

import Link from "next/link"

import { cn } from "@/lib/utils"
import { HTNX } from "@/components/htnx"
import { NextLogo, Spinner } from "@/components/svg"
import { like, random, save } from "@/app/actions"

const BASE_BUTTON = cn(
  "h-16 w-64 rounded-xl border-2 py-4 duration-75 disabled:cursor-wait disabled:opacity-50",
  "dark:border-zinc-950 active:dark:text-zinc-400 active:enabled:dark:bg-zinc-500 dark:from-zinc-900 dark:to-zinc-800 hover:dark:to-zinc-900 dark:bg-gradient-to-b",
  "border-slate-300 active:text-slate-400 active:enabled:bg-[#F5F8FB] bg-slate-50",
  "dark:shadow-[inset_0_3px_0px_rgba(60,60,60,.5),inset_0_-3px_0px_rgba(20,20,20,1),0_4px_8px_rgba(2,2,2,0.5)] hover:dark:shadow-[inset_0_3px_0px_rgba(60,60,60,.5),inset_0_-3px_0px_rgba(20,20,20,1),0_4px_8px_rgba(2,2,2,0.4)] active:enabled:dark:shadow-[inset_0_4px_0px_rgba(6,6,6,.5),inset_0_-2px_8px_rgba(60,60,60,.25)]",
  "shadow-[inset_0_-3px_0px_rgba(203,213,225,.3),0_2px_2px_rgba(203,213,225,0.2)] hover:light:shadow-[inset_0_-3px_0_rgba(203,213,225,.4),0_0_8px_rgba(203,213,225,0.5)] active:enabled:shadow-[inset_2px_3px_0_rgba(203,213,225,.3),inset_-1px_-1px_2px_rgba(203,213,225,.5)]"
)

export default function Home() {
  const innerRef = useRef(null)

  return (
    <main className="relative flex h-full flex-col items-center justify-center px-4 py-20 text-2xl font-medium lg:px-16 lg:py-32">
      <Link target="_blank" href="https://github.com/rafaelrcamargo/htnx">
        <h1 className="inline-flex items-center pb-24 text-5xl font-extrabold text-zinc-500 drop-shadow-md duration-150 lg:pb-36 lg:text-8xl dark:text-zinc-50 dark:[filter:drop-shadow(0_0_64px_#6666)] hover:dark:dark:[filter:drop-shadow(0_0_128px_#666)]">
          <span className="mr-4 text-4xl lg:mr-8 lg:text-7xl">
            {"<"}
            <span className="text-black dark:text-zinc-700">{"/"}</span>
            {">"}
          </span>
          ht
          <NextLogo className="-z-10 -mx-2 mt-1 h-14 w-14 lg:-mx-4 lg:mt-4 lg:h-28 lg:w-28" />
          x
        </h1>
      </Link>

      <section className="flex w-full flex-col gap-16 font-mono lg:grid lg:grid-cols-display">
        {/* First Line */}
        <Section title="Swap outerHTML" className="col-span-2">
          <HTNX
            element="button"
            action={async () => await random()}
            trigger="click"
            swap="outerHTML"
            className={BASE_BUTTON}>
            Click me!
          </HTNX>
        </Section>
        <Section title="Swap innerHTML">
          <HTNX
            element="button"
            action={async () => await like()}
            trigger="click"
            swap="innerHTML"
            indicator={<Heart className="animate-fade-out" />}
            className={cn(
              BASE_BUTTON,
              "grid h-16 w-16 place-content-center overflow-hidden p-0 [&_svg]:duration-150 active:[&_svg]:grayscale"
            )}>
            <Heart />
          </HTNX>
        </Section>

        {/* Second Line */}
        <Section title="Swap outerHTML on mouseenter">
          <HTNX
            element="button"
            action={async () => await random()}
            swap="outerHTML"
            trigger="mouseenter"
            className="w-64 rounded-xl border-2 border-dashed border-slate-300 py-[0.88rem] text-center text-xl dark:border-zinc-600">
            I&apos;ll change once!
          </HTNX>
        </Section>

        <Section
          title="Swap innerHTML from target"
          className="col-span-2 flex-wrap">
          <HTNX
            element="button"
            action={async () => await random()}
            trigger="click"
            target={innerRef}
            swap="innerHTML"
            className={BASE_BUTTON}>
            Click me!
          </HTNX>

          <h2
            className="w-64 rounded-xl border-2 border-dashed border-slate-300 py-[0.88rem] text-center text-xl dark:border-zinc-600"
            ref={innerRef}>
            And I&apos;ll change!
          </h2>
        </Section>

        {/* Third Line */}
        <Section title="Swap innerHTML + indicator">
          <HTNX
            element="button"
            action={async () => await random({ throttle: true })}
            trigger="click"
            swap="innerHTML"
            indicator="Loading..."
            className={BASE_BUTTON}>
            Click me!
          </HTNX>
        </Section>
        <Section title="Swap innerHTML + loader">
          <HTNX
            element="button"
            trigger="click"
            swap="innerHTML"
            indicator={<Spinner />}
            action={async () => await random({ throttle: true })}
            className={cn(BASE_BUTTON, "relative")}>
            Click me!
          </HTNX>
        </Section>
        <Section title="Swap innerHTML on mouseenter">
          <HTNX
            element="button"
            action={async () => await random()}
            swap="innerHTML"
            trigger="mouseenter"
            className="w-64 rounded-xl border-2 border-dashed border-slate-300 py-[0.88rem] text-center text-xl dark:border-zinc-600">
            I&apos;ll keep changing!
          </HTNX>
        </Section>

        {/* Fourth Line */}
        <Section title="Form and indicator" className="col-span-full">
          <HTNX
            element="form"
            className="flex flex-wrap items-center justify-center gap-4"
            trigger="submit"
            swap="innerHTML"
            indicator={<Spinner />}
            action={async e => await save(e)}>
            <input
              name="pass"
              type="password"
              placeholder={`Your "real" password:`}
              className="lg:text-md h-16 w-64 rounded-xl border-2 border-slate-300 bg-slate-50 px-4 text-base lg:w-96 lg:text-xl dark:border-zinc-700 dark:bg-zinc-800"
            />

            <button type="submit" className={BASE_BUTTON}>
              Send
            </button>
          </HTNX>
        </Section>
      </section>

      <Footer />
    </main>
  )
}

const Section: FC<
  PropsWithChildren<{ title?: string; className?: string }>
> = ({ children, title, className }) => (
  <section
    className={cn(
      "group relative flex h-full min-h-64 flex-col items-center justify-center gap-8 rounded-xl border-2 border-slate-200 bg-inherit p-8 shadow-[0px_4px_8px_rgba(203,213,225,.2)] duration-150 hover:shadow-[0px_4px_16px_rgba(203,213,225,.4)] md:flex-row dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-lg dark:hover:border-zinc-700 dark:hover:shadow-[0_4px_64px_#6663]",
      className
    )}>
    <h2 className="absolute left-4 top-0 z-20 -translate-y-1/2 rounded-lg border-2 border-slate-200 bg-slate-50 p-1 px-3 text-sm duration-75 lg:text-lg dark:border-zinc-800 dark:bg-zinc-900 group-hover:dark:border-zinc-700">
      {title}
    </h2>
    <div className="z-10 flex flex-wrap items-center justify-center gap-4 lg:gap-8">
      {children}
    </div>

    <div className="pointer-events-none absolute z-0 h-full w-full bg-[radial-gradient(rgba(203,213,225,.8)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,transparent_50%,#000_100%)] dark:bg-[radial-gradient(rgba(63,63,70,.5)_1px,transparent_1px)]" />
  </section>
)

const Heart = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 256 256" className={cn("h-12 w-12", className)}>
    <path
      d="M128,216S24,160,24,94A54,54,0,0,1,78,40c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,160,128,216,128,216Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="18"
    />
  </svg>
)

const Footer = () => (
  <footer className="mt-20 flex flex-col items-center justify-center gap-4 px-4 text-sm text-slate-500 lg:mt-32 dark:text-zinc-500">
    <div className="inline text-center">
      <a
        href="https://github.com/rafaelrcamargo/htnx"
        target="_blank"
        className="font-extrabold hover:underline">
        htnx
      </a>{" "}
      a questionable project by{" "}
      <a
        href="https://twitter.com/rafaelrcamargo"
        target="_blank"
        className="font-extrabold hover:underline">
        @rafaelrcamargo
      </a>
    </div>

    <div className="[&_svg]:fill-primary flex flex-row items-center justify-start [&_svg]:h-5 [&_svg]:w-5">
      <Link
        target="_blank"
        title="GitHub"
        href="https://github.com/rafaelrcamargo"
        className="px-2 duration-150 first:pl-0 last:pr-0 hover:scale-110 hover:drop-shadow-md">
        <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256">
          <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
        </svg>
      </Link>
      <Link
        target="_blank"
        title="Instagram"
        href="https://instagram.com/rafaelrcmrg"
        className="px-2 duration-150 first:pl-0 last:pr-0 hover:scale-110 hover:drop-shadow-md">
        <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256">
          <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
        </svg>
      </Link>
      <Link
        target="_blank"
        title="LinkedIn"
        href="https://linkedin.com/in/rafaelrcamargo"
        className="px-2 duration-150 first:pl-0 last:pr-0 hover:scale-110 hover:drop-shadow-md">
        <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256">
          <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
        </svg>
      </Link>
      <Link
        target="_blank"
        title="Email"
        href="mailto:rafaelrakochinski@gmail.com"
        className="px-2 duration-150 first:pl-0 last:pr-0 hover:scale-110 hover:drop-shadow-md">
        <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256">
          <path d="M128,24a104,104,0,0,0,0,208c21.51,0,44.1-6.48,60.43-17.33a8,8,0,0,0-8.86-13.33C166,210.38,146.21,216,128,216a88,88,0,1,1,88-88c0,26.45-10.88,32-20,32s-20-5.55-20-32V88a8,8,0,0,0-16,0v4.26a48,48,0,1,0,5.93,65.1c6,12,16.35,18.64,30.07,18.64,22.54,0,36-17.94,36-48A104.11,104.11,0,0,0,128,24Zm0,136a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>
        </svg>
      </Link>
    </div>
  </footer>
)
