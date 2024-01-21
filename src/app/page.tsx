"use client"

import {
  ComponentProps,
  FC,
  PropsWithChildren,
  RefObject,
  useRef,
  useState,
  useTransition
} from "react"

import { renderToStaticMarkup } from "react-dom/server"
import { toast } from "sonner"

import { random } from "@/app/server"

const BASE_BUTTON =
  "h-16 w-64 rounded-xl border-2 border-slate-300 py-4 shadow-[inset_0_-3px_0px_rgba(203,213,225,.3),0_2px_2px_rgba(203,213,225,0.2)] duration-75 hover:shadow-[inset_0_-3px_0_rgba(203,213,225,.4),0_0_8px_rgba(203,213,225,0.5)] active:enabled:bg-[#F5F8FB] bg-slate-50 active:enabled:shadow-[inset_2px_3px_0_rgba(203,213,225,.3),inset_-1px_-1px_2px_rgba(203,213,225,.5)] disabled:cursor-wait disabled:opacity-50"

export default function Home() {
  const innerRef = useRef(null)
  const outerRef = useRef(null)

  return (
    <main className="flex h-full flex-col items-center justify-center px-4 py-32 text-2xl font-medium md:px-16">
      <h1 className="pb-32 text-4xl font-black text-slate-700">
        HTNX: <i className="font-medium">Why not?</i>
      </h1>

      <section className="grid-cols-footer grid w-full gap-16">
        <Section title="Swap outerHTML">
          <HTNX.Button
            action={random}
            trigger={"click"}
            swap="outerHTML"
            className={BASE_BUTTON}>
            Click me!
          </HTNX.Button>
        </Section>

        <Section title="Swap innerHTML">
          <HTNX.Button
            action={random}
            trigger={"click"}
            swap="innerHTML"
            className={BASE_BUTTON}>
            Click me!
          </HTNX.Button>
        </Section>

        <Section title="Target from Ref + swap innerHTML">
          <HTNX.Button
            action={random}
            trigger={"click"}
            target={innerRef}
            swap="innerHTML"
            className={BASE_BUTTON}>
            Click me!
          </HTNX.Button>

          <h2
            className="w-64 rounded-xl border-4 border-dashed border-slate-300 py-[0.88rem] text-center text-xl"
            ref={innerRef}>
            And I&apos;ll change!
          </h2>
        </Section>

        <Section title="Target from Ref + swap outerHTML">
          <HTNX.Button
            action={random}
            trigger={"click"}
            target={outerRef}
            swap="outerHTML"
            className={BASE_BUTTON}>
            Click me!
          </HTNX.Button>

          <h2
            className="w-64 rounded-xl border-4 border-dashed border-slate-300 py-[0.88rem] text-center text-xl"
            ref={outerRef}>
            And I&apos;ll change!
          </h2>
        </Section>

        <Section title="Swap innerHTML + basic indicator">
          <HTNX.Button
            action={async () => await random(true)}
            trigger={"click"}
            swap="innerHTML"
            indicator={"Loading..."}
            className={BASE_BUTTON}>
            Click me!
          </HTNX.Button>
        </Section>

        <Section title="Swap innerHTML + custom indicator">
          <HTNX.Button
            action={async () => await random(true)}
            trigger={"click"}
            swap="innerHTML"
            indicator={<Spinner />}
            className={`relative ${BASE_BUTTON}`}>
            Click me!
          </HTNX.Button>
        </Section>
      </section>
    </main>
  )
}

const Section: FC<PropsWithChildren<{ title?: string }>> = ({
  children,
  title
}) => (
  <section className="relative flex h-full min-h-64 flex-col items-center justify-center gap-8 rounded-xl border-2 border-slate-200 shadow-[0px_4px_8px_rgba(203,213,225,.2)] duration-75 hover:scale-[1.005] hover:shadow-[0px_4px_16px_rgba(203,213,225,.4)] md:flex-row">
    <h2 className="border-slate200 absolute left-4 top-0 -translate-y-1/2 rounded-lg border-2 bg-slate-50 p-1 px-2 text-lg text-slate-500 shadow-[0px_2px_4px_rgba(203,213,225,.2)]">
      {title}
    </h2>
    {children}

    <div className="pointer-events-none absolute -z-10 h-full w-full bg-[radial-gradient(rgba(203,213,225,.8)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
  </section>
)

// --- HTNX ---

type Swap = "outerHTML" | "innerHTML"
type Trigger = "click" | "hover"

type Props = FC<
  ComponentProps<"button"> & {
    action?: () => Promise<JSX.Element>
    trigger?: Trigger
    target?: RefObject<HTMLElement>
    swap?: Swap
    indicator?: string | JSX.Element
  }
>

const Button: Props = ({
  children: CHILDREN,
  trigger = "click",
  swap,
  target,
  action,
  indicator,
  ...props
}) => {
  const [children, setChildren] = useState<JSX.Element>()
  const [isPending, startTransition] = useTransition()

  if (isPending && indicator)
    return (
      <button disabled {...props}>
        {indicator}
      </button>
    )

  if (!action) return <button {...props}>{CHILDREN}</button>

  const actionFn = async () =>
    startTransition(async () => setChildren(await action()))

  const actionOn = {
    click: { onClick: async () => await actionFn() },
    hover: { onMouseEnter: async () => await actionFn() }
  }[trigger]

  if (target && swap) {
    const doIt = async () => {
      try {
        return (target.current![swap] = renderToStaticMarkup(await action()))
      } catch (error) {
        toast.error("Target element not found!")
      }
    }

    const actionOn = {
      click: { onClick: doIt },
      hover: { onMouseEnter: doIt }
    }[trigger]

    return (
      <button {...actionOn} {...props}>
        {CHILDREN}
      </button>
    )
  }

  if (!swap)
    return (
      <button {...actionOn} {...props}>
        {CHILDREN}
      </button>
    )

  if (swap === "outerHTML")
    return (
      children || (
        <button {...actionOn} {...props}>
          {CHILDREN}
        </button>
      )
    )

  return (
    <button {...actionOn} {...props}>
      {children || CHILDREN}
    </button>
  )
}

const HTNX = {
  Button
}

const Spinner = () => (
  <svg
    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
    width="44"
    height="44"
    viewBox="0 0 44 44"
    stroke="rgb(51, 65, 85)">
    <g fill="none" fill-rule="evenodd" stroke-width="2">
      <circle cx="22" cy="22" r="1">
        <animate
          attributeName="r"
          begin="0s"
          dur="1.8s"
          values="1; 20"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.165, 0.84, 0.44, 1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          begin="0s"
          dur="1.8s"
          values="1; 0"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.3, 0.61, 0.355, 1"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="22" cy="22" r="1">
        <animate
          attributeName="r"
          begin="-0.9s"
          dur="1.8s"
          values="1; 20"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.165, 0.84, 0.44, 1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          begin="-0.9s"
          dur="1.8s"
          values="1; 0"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.3, 0.61, 0.355, 1"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  </svg>
)
