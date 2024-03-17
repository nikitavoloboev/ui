import { Match, Show, Switch, createEffect, createSignal } from "solid-js"

export default function TextGradient() {
  const [color, setColor] = createSignal("Default")
  const [showColor, setShowColor] = createSignal(false)

  return (
    <>
      <style>
        {`
          #arrow:hover {
            animation: bump 0.5s normal forwards linear
          }
          @keyframes bump {
            0% {
              transform: translateY(0px)
            }
            50% {
              transform: translateY(4px)
            }
            100% {
              transform: translateY(0px)
            }
          }
          #ColorPicker {
            animation: heightchange 0.2s normal forwards linear
          }
          @keyframes heightchange {
            0% {
              height: 0px
            }
            100% {
              height: 120px
            }
          }

        `}
      </style>
      <div class="h-full w-full flex items-center justify-center">
        <div class="flex items-center justify-center gap-2">
          <Switch>
            <Match when={color() === "Mint"}>
              <span
                class={`bg-gradient-to-t from-[#c7d2fe] to-[#6496d3] bg-clip-text text-xl text-transparent`}
                // >
                // class={`bg-gradient-to-t from-[#ffffff] to-[#6496d3] bg-clip-text text-xl text-transparent`}
              >
                Sample Text
              </span>
            </Match>
            <Match when={color() === "Default"}>
              <span
                id="Color"
                class={`bg-gradient-to-t from-[#6c6c6c] to-[#ffffff] bg-clip-text text-xl text-transparent`}
                // >
                // class={`bg-gradient-to-t from-[#ffffff] to-[#6496d3] bg-clip-text text-xl text-transparent`}
              >
                Sample Text
              </span>
            </Match>
            <Match when={color() === "CottonCandy"}>
              <span
                id="Color"
                class={`bg-gradient-to-t from-[#e2b7ff] to-[#7c60b9] bg-clip-text text-xl text-transparent`}
                // >
                // class={`bg-gradient-to-t from-[#ffffff] to-[#6496d3] bg-clip-text text-xl text-transparent`}
              >
                Sample Text
              </span>
            </Match>
            <Match when={color() === "Chocolate"}>
              <span
                id="Color"
                class={`bg-gradient-to-t from-[#92400e] to-[#de7b3e] bg-clip-text text-xl text-transparent`}
                // >
                // class={`bg-gradient-to-t from-[#ffffff] to-[#6496d3] bg-clip-text text-xl text-transparent`}
              >
                Sample Text
              </span>
            </Match>
          </Switch>
          <div
            class="relative"
            onClick={() => {
              setShowColor(!showColor())
            }}
          >
            <svg
              id="arrow"
              class="opacity-60"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 15.25L16.25 9.75H7.75L12 15.25Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <Show when={showColor()}>
              <div
                id="ColorPicker"
                class="absolute  overflow-auto top-7 text-sm p-1 gap-1 flex flex-col right-0 bg-neutral-800 border-neutral-900 border-2 border-opacity-60 rounded-lg"
                style={{ width: "120px" }}
              >
                <div
                  class="text-gray-100 bg-gradient-to-t from-[#6c6c6c] hover:opacity-60 to-[#ffffff] bg-opacity-40 rounded p-0.5"
                  onClick={() => {
                    setColor("Default")
                  }}
                >
                  <div class="bg-neutral-800 w-full h-full px-1 rounded">
                    Default
                  </div>
                </div>
                <div
                  class="text-cyan-600 bg-gradient-to-t from-[#c7d2fe] hover:opacity-60 to-[#6496d3] bg-opacity-20 rounded p-0.5"
                  onClick={() => {
                    setColor("Mint")
                  }}
                >
                  <div class="bg-neutral-800 text-[#c7d2fe] w-full h-full px-1 rounded">
                    Mint
                  </div>
                </div>
                <div
                  class="bg-gradient-to-t hover:opacity-60 from-[#92400e] to-[#de7b3e] bg-opacity-20 rounded p-0.5"
                  onclick={() => {
                    setColor("Chocolate")
                  }}
                >
                  <div class="bg-neutral-800 text-[#92400e] w-full h-full px-1 rounded">
                    chocolate
                  </div>
                </div>
                <div
                  class="text-[#e2b7ff] bg-gradient-to-t hover:opacity-60 transition-all from-[#e2b7ff] to-[#7c60b9] bg-opacity-10 rounded p-0.5"
                  onclick={() => {
                    setColor("CottonCandy")
                  }}
                >
                  <div class="bg-neutral-800 w-full h-full px-1 rounded">
                    Cotton Candy
                  </div>
                </div>
              </div>
            </Show>
          </div>
        </div>
      </div>
    </>
  )
}
