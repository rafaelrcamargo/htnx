"use server"

export const random = async (
  { throttle }: { throttle?: boolean } = { throttle: false }
) => {
  const color = `#${[...Array(6)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("")}`

  // Add a delay to throttle the function
  if (throttle)
    await new Promise(resolve =>
      setTimeout(resolve, Math.floor(Math.random() * 3000))
    )

  return (
    <span className="flex items-center justify-center gap-2">
      <span className="h-5 w-5 rounded-sm" style={{ background: color }} />
      {color}
    </span>
  )
}

export const like = async () => {
  // Add a delay to the form "validation"
  await new Promise(resolve =>
    setTimeout(resolve, Math.floor(Math.random() * 1000))
  )

  return (
    <svg viewBox="0 0 256 256" className="animate-fade-in h-12 w-12">
      <path
        fill="#ef4444"
        d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z"
      />
    </svg>
  )
}

export const save = async (data: FormData) => {
  // Add a delay to the form "validation"
  await new Promise(resolve =>
    setTimeout(resolve, Math.floor(Math.random() * 2000))
  )

  return (
    <span className="[&_span]:font-black [&_span]:italic">
      Oh, what a coincidence! I use <span>{data.get("pass")?.toString()}</span>{" "}
      too...
    </span>
  )
}
