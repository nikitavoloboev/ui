import { createEffect, onCleanup } from "solid-js"

export default function SkewCard() {
  createEffect(() => {
    const handleMouseMove = (event) => {
      const cardElement = event.currentTarget
      const rect = cardElement.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const x = event.offsetX - centerX
      const y = event.offsetY - centerY

      const tiltX = (y / centerY) * 20
      const tiltY = (x / centerX) * 20

      cardElement.style.transform = `perspective(1000px) rotateX(${-tiltX}deg) rotateY(${tiltY}deg)`
    }
    const handleMouseLeave = (event) => {
      const cardElement = event.currentTarget
      cardElement.style.transform = "none"
    }

    const cardElement = document.querySelector(".card")
    if (!cardElement) {
      return
    }
    setTimeout(() => {
      cardElement.addEventListener("mousemove", handleMouseMove)
      cardElement.addEventListener("mouseleave", handleMouseLeave)
    }, 200)

    onCleanup(() => {
      cardElement.removeEventListener("mousemove", handleMouseMove)
      cardElement.removeEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      cardElement.removeEventListener("mousemove", handleMouseMove)
      cardElement.removeEventListener("mouseleave", handleMouseLeave)
    }
  })
  return (
    <div class="hover:scale-[1.3] transition-transform">
      {/* im using another div to add transition to scale without affecting the other transform types */}
      <div
        class="card h-[200px] w-[150px] bg-neutral-600 drop-shadow-xl border-neutral-500 border rounded-lg flex-center text-black"
        style={{ transition: "all 0.2s ease-out" }}
      >
        card
      </div>
    </div>
  )
}
