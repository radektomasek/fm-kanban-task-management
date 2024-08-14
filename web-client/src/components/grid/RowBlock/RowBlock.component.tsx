import { type ReactNode } from "react"

type Props = {
  children: ReactNode
}

export const RowBlock = (props: Props) => {
  return <div className={"flex"}>{props.children}</div>
}
