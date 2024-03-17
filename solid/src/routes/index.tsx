import Nav from "~/components/Nav"
import Page from "~/components/Page"
import Topbar from "~/components/TopBar"

export default function Home() {
  return (
    <div class="w-screen h-screen">
      <Topbar />
      <div class="w-full h-full flex">
        <Nav />
        <Page />
      </div>
    </div>
  )
}
