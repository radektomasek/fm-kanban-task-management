import LogoWide from "@/assets/logo-wide.svg"

/* Replace the link with a React Router Link */

export const Logo = () => {
  return (
    <div className="flex flex-col justify-center w-75 h-24 bg-custom-white pl-8">
      <a href="/">
        <LogoWide />
      </a>
    </div>
  )
}
