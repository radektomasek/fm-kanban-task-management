import { type ReactNode } from "react"

type Props = {
  children: ReactNode
}

export const RowBlock = (props: Props) => {
  return (
    <div className={"flex mb-3 gap-x-4 justify-between"}>{props.children}</div>
  )
}
