import Icon from "./Icon"

export default function ButtonShine() {
  return (
    <>
      <style>
        {`
        #ButtonShine {
          background-image:
          linear-gradient(
            249deg in hsl,
            hsl(0 0% 14%) 36% 36%, hsl(224 0% 49%) 50%, hsl(0 0% 14%) 64% 64%
          )
        ;
          background-size: 200% 100%;
          background-position: 100% 0%;

        }
        #ButtonShine:hover {
          background-position: 0% 0%;
          background-repeat: no-repeat;
        };
        #ButtonNoise {
          background-image:
    linear-gradient(
      180deg in hsl,
      hsl(253 0% 41%) 29% 29%, hsl(0 0% 24%) 75% 75%
    )
  ;
    }
  #buttonText {
    background-image:
    linear-gradient(
      169deg in hsl,
      hsl(253 0% 100%) 49% 49%, hsl(0 0% 61%) 96% 96%
    )
  ;
    -webkit-text-fill-color: transparent;

    -webkit-background-clip: text;
  }

        `}
      </style>
      <div class="">
        <div
          class="rounded-full w-full transition-all h-full p-0.5 text-white relative overflow-hidden cursor-pointer"
          id="ButtonShine"
        >
          <div
            id="ButtonNoise"
            class="z-10 bg-center w-full h-full absolute top-0 left-0"
          >
            <div class="opacity-10">
              <Icon name="Noise"></Icon>
            </div>
          </div>
          <div class="px-8 p-5 z-20 flex items-center justify-center w-full h-full  bg-neutral-900 rounded-full transition-all font-bold">
            <div id="buttonText">Click</div>
          </div>
        </div>
      </div>
    </>
  )
}
