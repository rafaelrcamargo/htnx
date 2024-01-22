"use client"

import {
  ComponentProps,
  ReactHTML,
  RefObject,
  SyntheticEvent,
  createElement,
  useState,
  useTransition
} from "react"

import { renderToStaticMarkup } from "react-dom/server"

type Swap = "outerHTML" | "innerHTML"

type TriggerBase = "click" | "mouseenter"
type Trigger<T> = T extends "form" ? "submit" | TriggerBase : TriggerBase

type Event<T> = T extends "form" ? FormData : SyntheticEvent

/**
 * TODO: Think about a prefix for the props, so they wont conflict with the HTML props
 * - Could be something like `HnAction` or `HNAction`
 */
type Props<T extends keyof ReactHTML> = Omit<
  ComponentProps<T>,
  "action" | "target"
> & {
  element: T
  action?: (e: Event<T>, ...props: any) => Promise<JSX.Element>
  trigger?: Trigger<T>
  target?: RefObject<HTMLElement>
  swap?: Swap
  indicator?: string | JSX.Element
}

export const HTNX = <T extends keyof ReactHTML>({
  element,
  children: CHILDREN,
  trigger = "click",
  swap,
  target,
  action,
  indicator,
  ...props
}: Props<T>) => {
  const [children, setChildren] = useState<JSX.Element>()
  const [isPending, startTransition] = useTransition()

  if (isPending && indicator)
    return createElement(element, { disabled: true, ...props }, indicator)

  if (!action) return createElement(element, props, CHILDREN)

  if (target && swap) {
    const doIt = async (e: Event<T>) => {
      try {
        return (target.current![swap] = renderToStaticMarkup(await action(e)))
      } catch (error) {
        alert("Target element not found!")
      }
    }

    const actionOn = {
      click: { onClick: doIt },
      mouseenter: { onMouseEnter: doIt },
      submit: { action: doIt }
    }[trigger]

    return createElement(element, { ...actionOn, ...props }, CHILDREN)
  }

  const actionFn = async (e: Event<T>) =>
    startTransition(async () => setChildren(await action(e)))

  const actionOn = {
    click: { onClick: actionFn },
    mouseenter: { onMouseEnter: actionFn },
    submit: { action: actionFn }
  }[trigger]

  if (!swap) return createElement(element, { ...actionOn, ...props }, CHILDREN)

  if (swap === "outerHTML")
    return (
      children || createElement(element, { ...actionOn, ...props }, CHILDREN)
    )

  return createElement(element, { ...actionOn, ...props }, children || CHILDREN)
}
