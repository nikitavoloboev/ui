import { Match, Show, Switch, createSignal } from "solid-js"
import TextGradient from "./TextGradient"
import ButtonShine from "./ButtonShine"
import ButtonHover from "./ButtonHover"
import ButtonGradient from "./ButtonGradient"
import TextAnimate from "./TextAnimate"
import SpotLightCard from "./SpotLightCard"
import Modal from "./Modal"
interface Props {
  title: string
}
export default function Card(props: Props) {
  const [showModal, setShowModal] = createSignal(false)
  return (
    <>
      <style>
        {`
      #CardBorder {
        animation: backgroundShine 4s infinite forwards linear
      }
      @keyframes backgroundShine {
        0% {
          background-position: 0% 0%;
        }
        100% {
          background-position: -200% 0%
        }
      }
    `}
      </style>
      <div
        id="CardBorder"
        class="bg-[linear-gradient(110deg,#404040,40%,#262626,60%,#404040)] bg-[length:200%_100%] rounded-xl flex items-center justify-center"
        style={{
          "max-width": "200px",
          "max-height": "200px",
          "min-width": "200px",
          "min-height": "200px",
          height: "200px",
        }}
      >
        <Show when={showModal()}>
          <div class=" z-10 absolute w-screen h-screen top-0 left-0 bg-neutral-900">
            <Modal title={props.title}></Modal>
          </div>
        </Show>
        <div
          class="relative bg-neutral-800 rounded-xl"
          style={{
            "max-width": "195px",
            "max-height": "195px",
            "min-width": "195px",
            "min-height": "195px",
            height: "195px",
          }}
        >
          <div
            class="absolute top-1 right-3"
            onClick={() => {
              setShowModal(true)
            }}
          >
            Go
          </div>
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
    </>
  )
}
