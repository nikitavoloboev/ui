import * as prettier from "prettier"
import babel from "prettier/plugins/babel"
import esTree from "prettier/plugins/estree"
import { getHighlighter } from "shikiji"
import { JSXElement, Show, createEffect, createSignal } from "solid-js"
import { render } from "solid-js/web"
import Counters from "~/composed/Counters"
import { useGlobal } from "~/stores/global"
import Button from "./Button"
import DragAndDrop, { DragAndDropJs } from "./DragAndDrop"
import SkewCard from "./SkewCard"
import Status from "./Status"

export default function Page() {
  const global = useGlobal()
  const [componentCode, setComponentCode] = createSignal<string>()
  const [toggleCode, setToggleCode] = createSignal("html")
  const [currentComponent, setCurrentComponent] = createSignal<JSXElement>()
  const [HTMLCode, setHTMLCode] = createSignal<any>()
  const [rawHTMLCode, setRawHTMLCode] = createSignal<any>()
  const [JsCode, setJsCode] = createSignal<any>()
  const [rawJsCode, setRawJsCode] = createSignal<any>()

  const jsxToString = (jsxElement: any) => {
    const container = document.createElement("div")
    render(jsxElement, container)
    return container.outerHTML
  }
  createEffect(() => {
    if (global.global.component) {
      setToggleCode("html")
    }
  })
  //Effect to show HTML
  createEffect(() => {
    //switch depending on current component is shown
    const ElementSwitch = () => {
      switch (global.global.component) {
        case "Button":
          return <Button />
        case "Status":
          return <Status complete={true} />
        case "Counters":
          return <Counters />
        case "SkewCard":
          return <SkewCard />
        case "DragAndDrop":
          return <DragAndDrop />
        default:
          return <div>null</div>
      }
    }
    setCurrentComponent(() => <ElementSwitch />)
    setRawHTMLCode(
      jsxToString(() => {
        return ElementSwitch
      }),
    )

    global.global.component
    if (toggleCode() === "html" && HTMLCode()) {
      setComponentCode(HTMLCode())
      console.log(HTMLCode(), "hiiiiiiii", rawHTMLCode())
    }
  })
  createEffect(async () => {
    //gets hightlighter for code
    if (rawHTMLCode()) {
      const highlighter = await getHighlighter({
        themes: ["nord"],
        langs: ["javascript"],
      })

      await highlighter.loadTheme("dark-plus")
      await highlighter.loadLanguage("jsx")

      setHTMLCode(
        await prettier.format(rawHTMLCode(), {
          parser: "babel",
          plugins: [babel, esTree],
        }),
      )

      setHTMLCode(
        highlighter.codeToHtml(HTMLCode(), {
          lang: "jsx",
          theme: "dark-plus",
        }),
      )
    }
  })

  //Effect to show Javascript
  createEffect(() => {
    switch (global.global.component) {
      case "DragAndDrop":
        setRawJsCode(DragAndDropJs)
        break
      default:
        setRawJsCode("")
    }

    if (toggleCode() === "js" && JsCode()) {
      setComponentCode(JsCode())
      console.log("js", toggleCode())
    }
  })
  createEffect(async () => {
    if (rawJsCode() && toggleCode() === "js") {
      const highlighter = await getHighlighter({
        themes: ["nord"],
        langs: ["javascript"],
      })

      await highlighter.loadTheme("dark-plus")
      await highlighter.loadLanguage("jsx")

      //this breaks because of prettier

      // setJsCode(
      //   await prettier.format(rawJsCode(), {
      //     parser: "babel",
      //     plugins: [babel, esTree],
      //   }),
      // )

      setJsCode(
        highlighter.codeToHtml(rawJsCode(), {
          lang: "jsx",
          theme: "dark-plus",
        }),
      )
    }
  })

  return (
    <div class="w-full h-full p-[50px] pt-[70px] overflow-auto col-gap-[12px]">
      <div class="bg-[#1e1e1e] rounded-lg w-full flex-center border-2 border-neutral-800 p-[60px]">
        {currentComponent()}
      </div>
      <Show when={componentCode()}>
        <div class="relative text-[12px] font-bold">
          <div
            class="p-[20px]  rounded-lg text-[14px] border-2 border-neutral-800 bg-[#1e1e1e] overflow-auto"
            innerHTML={componentCode()}
          />
          <div class="absolute top-2 flex gap-1 p-1 rounded-md right-2 bg-neutral-800 text-white">
            <Show when={rawJsCode()}>
              <div
                class="hover:bg-neutral-700 rounded-md cursor-pointer px-2 p-1"
                onClick={() => {
                  setToggleCode("js")
                }}
              >
                js
              </div>
            </Show>
            <div
              class="hover:bg-neutral-700 rounded-md cursor-pointer px-2 p-1"
              onClick={() => {
                setToggleCode("html")
              }}
            >
              HTML
            </div>
          </div>
        </div>
      </Show>
    </div>
  )
}
