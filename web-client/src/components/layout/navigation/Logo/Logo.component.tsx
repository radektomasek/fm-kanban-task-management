import { NavLink } from "react-router-dom"
import LogoWide from "@/assets/logo-wide.svg"
import LogoCompact from "@/assets/logo-compact.svg"

export const Logo = () => {
  return (
    <div className="w-[3.5rem] md:w-[18.65rem] dark:bg-custom-dark-grey dark:text-custom-white flex flex-col justify-center flex-none bg-custom-white md:border-r md:dark:border-custom-dark-lines">
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
