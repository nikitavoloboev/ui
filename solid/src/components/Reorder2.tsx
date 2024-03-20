import clsx from "clsx"
import { createSignal, createEffect, For, Show } from "solid-js"
import { Motion, Presence } from "solid-motionone"

interface Props {
  Links: string[]
}

export function Reorder2(props: Props) {
  const [draggedIndex, setDraggedIndex] = createSignal(null)
  const [hoveredIndex, setHoveredIndex] = createSignal(null)
  const [items, setItems] = createSignal(props.Links)
  const [cursorPosition, setCursorPosition] = createSignal({ x: 0, y: 0 })
  const [mouseDown, setMouseDown] = createSignal(false)
  const [addedIndex, setAddedIndex] = createSignal<number>()

  const handleMouseDown = (index) => {
    setDraggedIndex(index)
  }

  const handleMouseUp = () => {
    if (draggedIndex() !== null && hoveredIndex() !== null) {
      //@ts-ignore
      const draggedItem = items()[draggedIndex()]
      const newItems = [...items()]
      newItems.splice(draggedIndex(), 1)
      newItems.splice(hoveredIndex(), 0, draggedItem)
      setAddedIndex(hoveredIndex())

      setHoveredIndex(null)
      setDraggedIndex(null)
      setItems(newItems)
    }
    setDraggedIndex(null)
  }

  const handleMouseMove = (event) => {
    setCursorPosition({
      x: event.clientX,
      y: event.clientY,
    })
  }

  createEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", () => {
      handleMouseUp()
      setMouseDown(false)
    })
  })

  return (
    <div class="">
      <For each={items()}>
        {(item, index) => (
          <div
            class={clsx(
              "w-[200px] m-1 h-[40px]",
              hoveredIndex() !== null &&
                hoveredIndex() === index() &&
                hoveredIndex() === draggedIndex() &&
                "bg-blue-400/20 rounded-md",
            )}
            onMouseDown={() => {
              setMouseDown(true)

              setTimeout(() => {
                if (mouseDown()) {
                  handleMouseDown(index())
                }
              }, 300)
            }}
            onMouseEnter={() => setHoveredIndex(index())}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{
                opacity:
                  hoveredIndex() === index() && draggedIndex() !== index()
                    ? 0.6
                    : draggedIndex() === index()
                      ? [0, 1]
                      : 1,

                scale:
                  addedIndex() === index() && draggedIndex() === null
                    ? [1, 1.2, 1]
                    : draggedIndex() === index()
                      ? [0.8, 1]
                      : 1,
              }}
              transition={{ duration: 0.3 }}
              class={clsx(
                " h-full flex-center bg-neutral-800 select-none cursor-pointer rounded-md shadow-md",
                draggedIndex() === index() &&
                  "absolute z-[100] w-[200px] h-fit p-2",
              )}
              style={{
                top: `${draggedIndex() === index() ? cursorPosition().y : 0}px`,
                left: `${draggedIndex() === index() ? cursorPosition().x : 0}px`,
              }}
            >
              {item}
            </Motion.div>
          </div>
        )}
      </For>
    </div>
  )
}
