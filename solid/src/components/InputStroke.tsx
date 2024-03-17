import { createSignal } from "solid-js"
import { css } from "solid-styled"

// https://twitter.com/jh3yy/status/1723070853837922582 https://codepen.io/jh3y/pen/WNPjPQy
export function InputStroke() {
  const [email, setEmail] = createSignal("")

  css``
  return (
    <>
      <style>
        {`
          @font-face {
            font-family: "Geist Sans";
            src: url("https://assets.codepen.io/605876/GeistVF.ttf")
              format("truetype");
          }

          :root {
            --valid: hsl(140 80% 40%);
            // --invalid: hsl(10 80% 40%);
            --input: hsl(0 0% 0%);
          }

          * {
            box-sizing: border-box;
          }

          body {
            min-height: 100vh;
            display: grid;
            place-items: center;
            font-family: "Geist Sans", "SF Pro", sans-serif;
            font-weight: 100;
            background-color: hsl(0 0% 6%);
            color: hsl(0 0% 98%);
          }

          .form-group {
            --active: 0;
            container-type: inline-size;
            flex: 1;
          }

          form {
            width: 40ch;
            display: flex;
          }

          input {
            --is-valid: 0;
            --is-invalid: 0;
            border: 0;
            background:
      linear-gradient(var(--input), var(--input)) padding-box, linear-gradient(
                  var(--invalid),
                  var(--invalid)
                )
                calc((1 - var(--is-invalid)) * -100cqi) 0 / 100% 100% border-box,
              linear-gradient(var(--valid), var(--valid))
                calc((1 - var(--is-valid)) * 100cqi) 0 / 100% 100% border-box,
              var(--input);
            border: 2px solid transparent;
            font-size: 2rem;
            padding: 1rem 2rem;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            /*   background-position:
            0 0,
            calc((1 - var(--is-invalid)) * -100cqi) 0,
            calc((1 - var(--is-valid)) * 100cqi) 0,
            0 0; */
            max-width: 100%;
            width: 100cqi;
            color: hsl(0 0% 80%);
            font-family: "Geist Sans", "SF Pro", sans-serif;
            font-weight: 40;
            border-radius: 12px;
            outline: none;
            box-shadow: 0 1px hsl(0 0% 100% / 0.35) inset,
              0 -1px hsl(0 0% 0% / 1) inset, 0 10px 20px -5px hsl(0 0% 0% / 1);
          }

          label {
            margin-bottom: 0.5rem;
            display: inline-block;
            padding-left: 2rem;
            opacity: calc(var(--active) + 0.45);
            transition: opacity 0.5s;
          }

          .form-group:focus-within {
            --active: 1;
          }

          input:invalid:not(:placeholder-shown):not(:focus-visible) {
            --is-invalid: 1;
          }

          input:valid {
            --is-valid: 1;
          }

          input::placeholder {
            color: transparent;
          }

          @media (prefers-reduced-motion: no-preference) {
            input {
              transition: background-position 0.5s;
            }
          }
      `}
      </style>
      <div>
        <form action="">
          <div class="form-group dark:text-white">
            <label for="email">Email</label>
            <input type="email" id="email" required placeholder="Email" />
          </div>
        </form>
      </div>
    </>
  )
}
