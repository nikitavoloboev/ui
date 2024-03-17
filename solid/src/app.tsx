import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { Suspense } from "solid-js"
import Nav from "~/components/Nav"
import "./app.css"
import { GlobalProvider, createGlobalState } from "./stores/global"

export default function App() {
  const global = createGlobalState()
  return (
    <GlobalProvider value={global}>
      <Router
        root={(props) => (
          <>
            <Suspense>{props.children}</Suspense>
          </>
        )}
      >
        <FileRoutes />
      </Router>
    </GlobalProvider>
  )
}
