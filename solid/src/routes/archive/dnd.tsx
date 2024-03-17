import {
  DragDropProvider,
  DragDropSensors,
  useDragDropContext,
  createDraggable,
  createDroppable,
} from "@thisbeyond/solid-dnd"

const Draggable = (props: any) => {
  const draggable = createDraggable(props.id)
  return <div use:draggable>draggable</div>
}

const Droppable = (props: any) => {
  const droppable = createDroppable(props.id)
  return <div use:droppable>droppable</div>
}

const Sandbox = () => {
  const [, { onDragEnd }] = useDragDropContext()

  onDragEnd(({ draggable, droppable }) => {
    if (droppable) {
      console.log(droppable, "dropped")
      // Handle the drop. Note that solid-dnd doesn't move a draggable into a
      // droppable on drop. It leaves it up to you how you want to handle the
      // drop.
    }
  })

  return (
    <div>
      <Draggable id="draggable-1" />
      <Droppable id="droppable-1" />
    </div>
  )
}

const App = () => {
  return (
    <DragDropProvider>
      <DragDropSensors>
        <Sandbox />
      </DragDropSensors>
    </DragDropProvider>
  )
}

export default App
