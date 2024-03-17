export default function Button() {
  return (
    <div
      class=" rounded-[10px] border border-white text-black"
      style={{
        background: "linear-gradient(#ffffff,#D2D2D2)",
        filter: "drop-shadow(0px 4px 6px #000000)",
      }}
    >
      <div
        class="w-full h-full p-[8px] px-[14px]"
        style={{ background: "linear-gradient(#ffffff00,#2358E020)" }}
      >
        Click me!
      </div>
    </div>
  )
}
