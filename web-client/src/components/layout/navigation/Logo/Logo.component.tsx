import { NavLink } from "react-router-dom"
import LogoWide from "@/assets/logo-wide.svg"
import LogoCompact from "@/assets/logo-compact.svg"

export const Logo = () => {
  return (
    <div className="w-[3.5rem] md:w-[18.71rem] flex flex-col justify-center flex-none md:border-r-[1px] md:dark:border-[#3E3F4E]">
      <NavLink to="/">
        <div className="block md:hidden justify-self-center">
          <LogoCompact />
        </div>
        <div className="hidden md:block pl-8">
          <LogoWide />
        </div>
      </NavLink>
    </div>
  )
}
