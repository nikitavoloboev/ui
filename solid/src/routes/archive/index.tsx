import Card from "~/components/Card"

export default function Home() {
  return (
    <main class="bg-neutral-900 h-screen w-screen">
      <div
        class="text-white h-full"
        style={{ "padding-left": "20vw", "padding-right": "20vw" }}
      >
        <nav class=" py-4 flex items-center justify-between">
          <div>title</div>
          <div class="flex items-center justify-center gap-5">
            <div>twitter</div>
            <div>github</div>
          </div>
        </nav>
        <div class=" h-full flex flex-col">
          <div class=" h-1/3 flex flex-col gap-5 justify-center items-center text-center">
            <h1 class="font-bold text-4xl">UI components</h1>
            <div class="font-semibol">
              <span class="opacity-70">Crafted with</span>
              <span class="font-bold"> Solid and Tailwind CSS</span>
            </div>
          </div>
          <div class=" flex flex-col items-center justify-center gap-5 w-full">
            <div class=" flex gap-5 justify-center items-center w-full h-full">
              <Card title="TextGradient" />
              <Card title="Text Animated Gradient" />
              <Card title="Text Shine" />
            </div>
            <div class="flex gap-5 h-full w-full justify-center items-center">
              <Card title="Button Background Shine" />
              <Card title="Button Gradient" />
              <Card title="Button Hover Gradient" />
            </div>
            <div class="flex gap-5 h-full w-full justify-center items-center">
              <Card title="" />
              <Card title="" />
              <Card title="" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
