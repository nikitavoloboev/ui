import { Reorder } from "~/components/Reorder"
import { Reorder2 } from "~/components/Reorder2"

export default function test() {
  return (
    <div class="w-screen h-screen text-white/50 bg-neutral-900 flex-center">
      {/* <Reorder Links={["minecraft", "GTA", "Valorant", "CSGO", "fortnite"]} /> */}
      <Reorder2 Links={["minecraft", "GTA", "Valorant", "CSGO", "fortnite"]} />
    </div>
  )
}
