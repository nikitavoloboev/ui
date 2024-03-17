import { Show, createEffect, createSignal, onCleanup } from "solid-js"
import { Motion, Presence } from "solid-motionone"

export default function DragAndDrop() {
  const [draggedElement, setDraggedElement] = createSignal("")
  const [bookmarked, setBookmarked] = createSignal(0)
  const [cursorPosition, setCursorPosition] = createSignal({ x: 0, y: 0 })
  let clickState = false

  const updateCursorPosition = (event: any) => {
    setCursorPosition({ x: event.clientX, y: event.clientY })
  }

  const handleClick = () => {
    if (clickState) {
      clickState = false
    }
    setDraggedElement("")
  }

  onCleanup(() => {
    document.removeEventListener("mousemove", updateCursorPosition)
    document.removeEventListener("click", handleClick)
  })
  createEffect(() => {
    if (draggedElement()) {
      document.addEventListener("click", handleClick)
    } else {
      document.removeEventListener("click", handleClick)
    }
    document.addEventListener("mousemove", updateCursorPosition)
  })

  return (
    <div class="col-gap-[10px] text-white/60">
      <div class="col-gap-[8px] [&>*]:rounded-md [&>*]:flex-center [&>*]:cursor-pointer [&>*]:p-2 [&>*]:px-4 [&>*]:bg-neutral-800 [&>*]:transition-all">
        <div
          class="active:scale-[0.9]"
          onClick={() => {
            setDraggedElement("Button")
          }}
        >
          Button
        </div>
        <div
          class="active:scale-[0.9]"
          onClick={() => {
            setDraggedElement("Status")
          }}
        >
          Status
        </div>
      </div>
      <Presence exitBeforeEnter>
        <Show when={draggedElement()}>
          <Motion.div
            animate={{
              opacity: [0, 1],
              transform: [
                "translateX(-10px) scale(0.6)",
                " scale(1.2)",
                "translateX(0) scale(1)",
              ],
            }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.4 }}
            class="bg-neutral-800 p-2 rounded-md absolute opacity-100"
            style={{
              top: `${cursorPosition().y}px`,
              left: `${cursorPosition().x + 10}px`,
            }}
          >
            {draggedElement()}
          </Motion.div>
        </Show>
      </Presence>

      <div
        class="bg-neutral-800 cursor-pointer rounded-md flex-center p-3 text-[14px] active:scale-[0.8] transition-all"
        onClick={() => {
          if (draggedElement()) {
            setBookmarked(bookmarked() + 1)
          }
        }}
      >
        Bookmark {bookmarked()}
      </div>
    </div>
  )
}

export const DragAndDropJs = `  const [draggedElement, setDraggedElement] = createSignal("")
const [bookmarked, setBookmarked] = createSignal(0)
const [cursorPosition, setCursorPosition] = createSignal({ x: 0, y: 0 })
let clickState = false

const updateCursorPosition = (event: any) => {
  setCursorPosition({ x: event.clientX, y: event.clientY })
}

const handleClick = () => {
  if (clickState) {
    clickState = false
  }
  setDraggedElement("")
}

onCleanup(() => {
  document.removeEventListener("mousemove", updateCursorPosition)
  document.removeEventListener("click", handleClick)
})
createEffect(() => {
  if (draggedElement()) {
    document.addEventListener("click", handleClick)
  } else {
    document.removeEventListener("click", handleClick)
  }
  document.addEventListener("mousemove", updateCursorPosition)
})`
