type Props = {
  title: string
  numberOfBoards: number
}

export const SidebarHeader = ({ title, numberOfBoards }: Props) => {
  return (
    <h3 className="uppercase text-2xs text-custom-medium-grey tracking-[.15em] pl-8">
      {title} ({numberOfBoards})
    </h3>
  )
}
