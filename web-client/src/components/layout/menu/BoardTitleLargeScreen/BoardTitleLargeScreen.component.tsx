type Props = {
  boardName: string
}

export const BoardTitleLargeScreen = ({ boardName }: Props) => {
  return <h1 className="hidden md:block text-xl pl-0 md:pl-6">{boardName}</h1>
}
