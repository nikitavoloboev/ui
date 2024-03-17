import { Match, Switch } from "solid-js"
import TextGradient from "./TextGradient"
import TextAnimate from "./TextAnimate"
import ButtonShine from "./ButtonShine"
import ButtonGradient from "./ButtonGradient"
import SpotLightCard from "./SpotLightCard"
import ButtonHover from "./ButtonHover"
import CodeLines from "./CodeLines"

interface Props {
  title: string
}
const span = () => {
  return (
    <div>
      <span>
        &lt;<span class="text-green-300">span</span>
      </span>
    </div>
  )
}
const Class = () => {
  return (
    <div>
      <span class="text-purple-500">class</span>
      <span class="text-red-500">=</span>
    </div>
  )
}

export default function Modal(props: Props) {
  return (
    <>
      <style></style>
      <div
        class="flex flex-col gap-10 items-center justify-center w-full h-3/4"
        style={{ "padding-left": "20vw", "padding-right": "20vw" }}
      >
        <div class="w-full">
          <div class="opacity-70 text-bold text-lg pb-2">{props.title}</div>
          <div class="w-full py-[80px] border border-gray-200 rounded-lg">
            <Switch>
              <Match when={props.title === "TextGradient"}>
                <TextGradient />
              </Match>
              <Match when={props.title === "Text Animated Gradient"}>
                <TextAnimate />
              </Match>
              <Match when={props.title === "Text Shine"}>
                <div></div>
              </Match>
              <Match when={props.title === "Button Background Shine"}>
                <ButtonShine />
              </Match>
              <Match when={props.title === "Button Gradient"}>
                <ButtonGradient />
              </Match>
              <Match when={props.title === "Button Hover Gradient"}>
                <ButtonHover />
              </Match>
              <Match when={props.title === "SpotLightCard"}>
                <SpotLightCard />
              </Match>
            </Switch>
          </div>
        </div>
        <div class="w-full border py-[50px] border-gray-200 rounded-lg">
          <Switch>
            <Match when={props.title === "TextGradient"}>
              <div>
                <div>
                  <div class="flex">
                    {span()}

                    {Class()}
                  </div>
                </div>
                <div></div>
                <div></div>
              </div>
            </Match>
            <Match when={props.title === "Text Animated Gradient"}>
              <TextAnimate />
            </Match>
            <Match when={props.title === "Text Shine"}>
              <div>{span()} hiiiii</div>
            </Match>
            <Match when={props.title === "Button Background Shine"}>
              <ButtonShine />
            </Match>
            <Match when={props.title === "Button Gradient"}>
              <ButtonGradient />
            </Match>
            <Match when={props.title === "Button Hover Gradient"}>
              <ButtonHover />
            </Match>
            <Match when={props.title === "SpotLightCard"}>
              <SpotLightCard />
            </Match>
          </Switch>
        </div>
      </div>
    </>
  )
}
