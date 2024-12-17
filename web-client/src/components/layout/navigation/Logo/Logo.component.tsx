import { NavLink } from "react-router-dom"
import LogoWide from "@/assets/logo-wide.svg"
import LogoCompact from "@/assets/logo-compact.svg"

export const Logo = () => {
  return (
    <div className="flex flex-col justify-center w-75 bg-custom-white pl-8 dark:bg-custom-dark-grey dark:text-custom-white md:border-r-[1px] md:dark:border-[#3E3F4E] ">
      <NavLink to="/">
        <div className="block md:hidden">
          <LogoCompact />
        </div>
        <div className="hidden md:block">
          <LogoWide />
        </div>
      </NavLink>
    </div>
  )
}
