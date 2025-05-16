import Sidebar from "../components/sidebar"
import Main from "../components/main"

export default function page() {
  return (
    <div className="w-full py-4 px-2 flex flex-row h-screen bg-[#0f0f0f]">
      <Sidebar />
      {/* <div className="w-full h-full bg-[#161616] border border-white/10 rounded-xl p-4">
        <Main />
      </div> */}
    </div>
  )
}
