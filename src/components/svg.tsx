import { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export const Spinner = ({ className, ...props }: ComponentProps<"svg">) => (
  <svg
    width={44}
    height={44}
    stroke="rgb(51, 65, 85)"
    className={cn(
      "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform",
      className
    )}
    {...props}>
    <g fill="none" fillRule="evenodd" strokeWidth={2}>
      <circle cx={22} cy={22} r={1}>
        <animate
          attributeName="r"
          begin="0s"
          calcMode="spline"
          dur="1.8s"
          keySplines="0.165, 0.84, 0.44, 1"
          keyTimes="0; 1"
          repeatCount="indefinite"
          values="1; 20"
        />
        <animate
          attributeName="stroke-opacity"
          begin="0s"
          calcMode="spline"
          dur="1.8s"
          keySplines="0.3, 0.61, 0.355, 1"
          keyTimes="0; 1"
          repeatCount="indefinite"
          values="1; 0"
        />
      </circle>
      <circle cx={22} cy={22} r={1}>
        <animate
          attributeName="r"
          begin="-0.9s"
          calcMode="spline"
          dur="1.8s"
          keySplines="0.165, 0.84, 0.44, 1"
          keyTimes="0; 1"
          repeatCount="indefinite"
          values="1; 20"
        />
        <animate
          attributeName="stroke-opacity"
          begin="-0.9s"
          calcMode="spline"
          dur="1.8s"
          keySplines="0.3, 0.61, 0.355, 1"
          keyTimes="0; 1"
          repeatCount="indefinite"
          values="1; 0"
        />
      </circle>
    </g>
  </svg>
)

export const NextLogo = (props: ComponentProps<"svg">) => (
  <svg
    aria-label="Next.js logomark"
    className="next-mark_root__iLw9v"
    data-theme="light"
    viewBox="0 0 180 180"
    {...props}>
    <mask
      id="a"
      width={180}
      height={180}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha"
      }}>
      <circle cx={90} cy={90} r={90} />
    </mask>
    <g mask="url(#a)">
      <circle cx={90} cy={90} r={90} data-circle="true" />
      <path
        fill="url(#b)"
        d="M149.508 157.52 69.142 54H54v71.97h12.114V69.384l73.885 95.461a90.304 90.304 0 0 0 9.509-7.325Z"
      />
      <path fill="url(#c)" d="M115 54h12v72h-12z" />
    </g>
    <defs>
      <linearGradient
        id="b"
        x1={109}
        x2={144.5}
        y1={116.5}
        y2={160.5}
        gradientUnits="userSpaceOnUse">
        <stop stopColor="#fff" />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="c"
        x1={121}
        x2={120.799}
        y1={54}
        y2={106.875}
        gradientUnits="userSpaceOnUse">
        <stop stopColor="#fff" />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </linearGradient>
    </defs>
  </svg>
)
