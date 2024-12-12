import LogoWide from "@/assets/logo-wide.svg"

/**
 * @TODO: Replace the link with a React Router MenuLink
 */
export const Logo = () => {
  return (
    <div className="flex flex-col justify-center w-75 bg-custom-white pl-8 border-r-[1px] dark:bg-custom-dark-grey dark:text-custom-white dark:border-[#3E3F4E]">
      <a href="/">
        <LogoWide />
      </a>
    </div>
  )
}
