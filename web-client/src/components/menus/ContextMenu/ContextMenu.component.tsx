import { boardContextMenuItems } from "@/utils/mocks/menus.mocks"
import { ContextMenuItem } from "@/components/menus"

export const ContextMenu = () => {
  return (
    <ul className="absolute flex flex-col justify-evenly px-4 w-48 min-h-24 top-14 right-4 bg-custom-white z-1 rounded-lg">
      {boardContextMenuItems.map((element) => (
        <ContextMenuItem key={element.id} {...element} />
      ))}
    </ul>
  )
}
