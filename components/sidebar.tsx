import { Logo, Notification, Search } from "./icons"
import { DropdownMenuCheckboxes } from "./drop-menu.client"

export default function Sidebar() {
  return (
    <div className="w-1/6 flex flex-col p-2 bg-inherit">
      <div className="flex flex-row justify-between items-center gap-2">
        <Logo
          size={18}
          className="text-white hover:cursor-pointer hover:opacity-70 transition-all duration-300 ease-in-out"
        />
        <div className="flex flex-row items-center gap-2">
          <Notification
            size={20}
            className="hover:cursor-pointer hover:opacity-70 transition-all duration-300 ease-in-out"
          />
          <Search
            size={20}
            className="hover:cursor-pointer hover:opacity-70 transition-all duration-300 ease-in-out"
          />
        </div>
      </div>
      <DropdownMenuCheckboxes />
    </div>
  )
}
