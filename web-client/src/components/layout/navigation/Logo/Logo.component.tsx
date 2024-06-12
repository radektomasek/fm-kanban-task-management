import LogoWide from "@/assets/logo-wide.svg"

/**
 * @TODO: Replace the link with a React Router Link
 */
export const Logo = () => {
  return (
    <div className="flex flex-col justify-center w-75 bg-custom-white pl-8 border-r-2">
      <a href="/web-client/public">
        <LogoWide />
      </a>
    </div>
  )
}
