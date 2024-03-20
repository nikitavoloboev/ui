import clsx from "clsx"
import { For, Show, createEffect, createSignal, onCleanup } from "solid-js"
import { Motion, Presence } from "solid-motionone"

interface Props {
  Links: string[]
}

export function Reorder(props: Props) {
  const [items, setItems] = createSignal(props.Links)
  const [draggedItem, setDraggedItem] = createSignal("")
  const [hoveredItem, setHoveredItem] = createSignal<number | null>(null)
  const [cursorPosition, setCursorPosition] = createSignal({ x: 0, y: 0 })
  const [mouseDown, setMouseDown] = createSignal(false)
  let clickState = false

  const updateCursorPosition = (event: any) => {
    setCursorPosition({ x: event.clientX, y: event.clientY })
  }

  const handleClick = () => {
    if (clickState) {
      clickState = false
    }

    const draggedIndex = items().indexOf(draggedItem())
    const newItemArray = [...items()]
    if (draggedIndex !== -1 && hoveredItem() !== null) {
      const targetIndex = hoveredItem() === 0 ? 0 : hoveredItem() + 1
      newItemArray.splice(draggedIndex, 1)
      newItemArray.splice(targetIndex, 0, draggedItem())
      setItems(newItemArray)
    }
    setDraggedItem("")
  }

  onCleanup(() => {
    document.removeEventListener("mousemove", updateCursorPosition)
  })
  createEffect(() => {
    document.addEventListener("mousemove", updateCursorPosition)
    document.addEventListener("mouseup", () => {
      handleClick()
      setDraggedItem("")
      setMouseDown(false)
    })
  })

  return (
    <div id="ItemsList" class="">
      <For each={items()}>
        {(item, i) => {
          return (
            <div
              onmousedown={() => {
                setMouseDown(true)
                setTimeout(() => {
                  if (mouseDown()) {
                    setDraggedItem(item)
                  }
                }, 300)
              }}
              onMouseEnter={() => {
                if (draggedItem()) {
                  setHoveredItem(i())
                }
              }}
              onMouseLeave={() => {
                if (draggedItem()) {
                  setHoveredItem(null)
                }
              }}
              class={clsx(
                " border-b-2 border-blue-400/0 select-none transition-all",
                hoveredItem() === i() &&
                  draggedItem() !== item &&
                  draggedItem() &&
                  " !border-blue-400",
                i() === 0 && "border-t-2",
              )}
            >
              <div class="bg-neutral-800 rounded-md p-2">{item}</div>
            </div>
          )
        }}
      </For>
      <Presence exitBeforeEnter>
        <Show when={draggedItem()}>
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
            class="bg-neutral-800 p-1 px-3 rounded-md absolute opacity-100"
            style={{
              top: `${cursorPosition().y}px`,
              left: `${cursorPosition().x + 10}px`,
            }}
          >
            {draggedItem()}
          </Motion.div>
        </Show>
      </Presence>
    </div>
  )
}
