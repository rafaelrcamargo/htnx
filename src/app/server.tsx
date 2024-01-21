"use server"

export const random = async (throttle = false) => {
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
