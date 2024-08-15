import { useEffect, useRef } from "react"
import { useInView, useMotionValue, useSpring } from "framer-motion"

/**
 *
 * @param root0
 * @param root0.value
 */
export default function Counter({
  value,
  direction = "up",
}: {
  value: number | undefined
  direction?: "up" | "down"
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === "down" ? value || 0 : 0)
  const springValue = useSpring(motionValue, {
    damping: 100,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === "down" ? 0 : value || 0)
    }
  }, [motionValue, isInView, value])

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US").format(
            latest.toFixed(0)
          )
        }
      }),
    [springValue]
  )

  return <span className="font-[750]" ref={ref || 0} />
}
