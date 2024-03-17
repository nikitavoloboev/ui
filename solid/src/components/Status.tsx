import { Show } from "solid-js"

interface Props {
  complete: boolean
}

export default function Status(props: Props) {
  return (
    <Show
      when={props.complete}
      fallback={
        <div class="bg-[#FFA740] bg-opacity-5 text-[#D29752] rounded-[10px] h-[34px] flex-center px-[14px]">
          In progress
        </div>
      }
    >
      <div class="bg-[#708F51] bg-opacity-[0.08] text-[#708F51] rounded-[10px] h-[34px] flex-center px-[14px]">
        Complete
      </div>
    </Show>
  )
}
