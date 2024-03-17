import { createContext, useContext } from "solid-js"
import { createStore } from "solid-js/store"

type Global = {
  component: Component
  components: Component[]
}

export type Component =
  | "Button"
  | "Status"
  | "Counters"
  | "SkewCard"
  | "DragAndDrop"

export function createGlobalState() {
  const [global, setGlobal] = createStore<Global>({
    component: "Button",
    components: ["Button", "Status", "Counters", "SkewCard", "DragAndDrop"],
  })

  return {
    global,

    setComponent: (state: Component) => {
      return setGlobal({ component: state })
    },
  } as const
}

const GlobalCtx = createContext<ReturnType<typeof createGlobalState>>()

export const GlobalProvider = GlobalCtx.Provider

export const useGlobal = () => {
  const ctx = useContext(GlobalCtx)
  if (!ctx) throw new Error("useGlobal must be used within UserProvider")
  return ctx
}
