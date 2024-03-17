import { For } from "solid-js"
import { useGlobal } from "~/stores/global"

export default function Nav() {
  const global = useGlobal()
  return (
    <div class="h-full w-1/4 mt-[50px] p-[20px] pr-0">
      <For each={global.global.components}>
        {(page) => {
          return (
            <div
              class="font-light hover:bg-neutral-800 opacity-60 rounded-md text-[14px] p-2 px-4 cursor-pointer"
              onClick={() => {
                global.setComponent(page)
              }}
            >
              {page}
            </div>
          )
        }}
      </For>
    </div>
  )
}
