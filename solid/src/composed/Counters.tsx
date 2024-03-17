// TODO: make generic `Counter` component

export default function Counters() {
  return (
    <div class="flex-center gap-4 [&>*]:bg-white [&>*]:bg-opacity-[0.02] text-[14px] [&>*]:p-[36px] [&>*]:w-[150px] [&>*]:h-[150px] [&>*]:px-[46px] ">
      <div
        class="flex flex-col  items-center justify-center"
        style={{ "border-radius": "30px 10px 10px 30px" }}
      >
        <div class="text-[46px] font-bold">12</div>
        <div class="opacity-70 text-light">To Learn</div>
      </div>
      <div
        class="flex flex-col items-center justify-center"
        style={{ "border-radius": "10px 10px 10px 10px" }}
      >
        <div class="text-[46px] font-bold">12</div>
        <div class="opacity-70 text-light">Learning</div>
      </div>
      <div
        class="flex flex-col items-center justify-center"
        style={{ "border-radius": "10px 30px 30px 10px" }}
      >
        <div class="text-[46px] font-bold">12</div>
        <div class="opacity-70 text-light">Learnt</div>
      </div>
    </div>
  )
}
